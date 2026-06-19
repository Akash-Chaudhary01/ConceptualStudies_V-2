from dotenv import load_dotenv
from pathlib import Path
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

import os
import logging
import uuid
import bcrypt
import jwt
from datetime import datetime, timezone, timedelta
from typing import List, Optional

from fastapi import FastAPI, APIRouter, HTTPException, Request, Response, Depends
from fastapi.responses import PlainTextResponse, Response as FastResponse
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, EmailStr

from seed_data import get_seeded_posts, SEED_REVIEWS

# ---------- Config ----------
mongo_url = os.environ['MONGO_URL']
db_name = os.environ['DB_NAME']
client = AsyncIOMotorClient(mongo_url)
db = client[db_name]

JWT_ALGORITHM = "HS256"
SITE_URL = os.environ.get("SITE_URL", "https://commerce-mastery-8.preview.emergentagent.com")

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# ---------- App ----------
app = FastAPI(title="Conceptual Studies API")
api_router = APIRouter(prefix="/api")


# ---------- Helpers ----------
def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))
    except Exception:
        return False


def get_jwt_secret() -> str:
    return os.environ["JWT_SECRET"]


def create_access_token(user_id: str, email: str) -> str:
    payload = {"sub": user_id, "email": email,
               "exp": datetime.now(timezone.utc) + timedelta(hours=8),
               "type": "access"}
    return jwt.encode(payload, get_jwt_secret(), algorithm=JWT_ALGORITHM)


def create_refresh_token(user_id: str) -> str:
    payload = {"sub": user_id,
               "exp": datetime.now(timezone.utc) + timedelta(days=7),
               "type": "refresh"}
    return jwt.encode(payload, get_jwt_secret(), algorithm=JWT_ALGORITHM)


def set_auth_cookies(response: Response, access: str, refresh: str):
    response.set_cookie("access_token", access, httponly=True, secure=True, samesite="none",
                        max_age=8 * 3600, path="/")
    response.set_cookie("refresh_token", refresh, httponly=True, secure=True, samesite="none",
                        max_age=7 * 24 * 3600, path="/")


async def get_current_user(request: Request) -> dict:
    token = request.cookies.get("access_token")
    if not token:
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            token = auth_header[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, get_jwt_secret(), algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Invalid token type")
        user = await db.users.find_one({"id": payload["sub"]})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        user.pop("password_hash", None)
        user.pop("_id", None)
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


# ---------- Models ----------
class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class LeadCreate(BaseModel):
    student_name: str
    student_class: str
    board: str
    subject: str
    phone: str
    city: str
    message: Optional[str] = ""
    email: Optional[str] = ""


class Lead(LeadCreate):
    id: str
    created_at: str
    status: str = "new"


class BlogPostBase(BaseModel):
    slug: str
    title: str
    excerpt: str
    content: str
    category: str
    cover_image: str
    read_time: str = "5 min read"
    meta_title: str = ""
    meta_description: str = ""
    published: bool = True
    author: str = "Komal Sejwal"


class BlogPostCreate(BlogPostBase):
    pass


class BlogPost(BlogPostBase):
    id: str
    created_at: str
    updated_at: str


class ReviewCreate(BaseModel):
    name: str
    rating: int = 5
    text: str
    role: Optional[str] = ""


class Review(ReviewCreate):
    id: str
    created_at: str


# ---------- Auth Endpoints ----------
@api_router.post("/auth/login")
async def login(payload: LoginRequest, response: Response):
    user = await db.users.find_one({"email": payload.email.lower()})
    if not user or not verify_password(payload.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    access = create_access_token(user["id"], user["email"])
    refresh = create_refresh_token(user["id"])
    set_auth_cookies(response, access, refresh)
    return {"id": user["id"], "email": user["email"], "name": user["name"], "role": user["role"]}


@api_router.post("/auth/logout")
async def logout(response: Response):
    response.delete_cookie("access_token", path="/")
    response.delete_cookie("refresh_token", path="/")
    return {"ok": True}


@api_router.get("/auth/me")
async def me(current_user: dict = Depends(get_current_user)):
    return current_user


# ---------- Leads (Demo Form) ----------
@api_router.post("/leads", response_model=Lead, status_code=201)
async def create_lead(payload: LeadCreate):
    lead = {
        **payload.model_dump(),
        "id": str(uuid.uuid4()),
        "created_at": datetime.now(timezone.utc).isoformat(),
        "status": "new",
    }
    await db.leads.insert_one(lead.copy())
    lead.pop("_id", None)
    return lead


@api_router.get("/leads", response_model=List[Lead])
async def list_leads(current_user: dict = Depends(get_current_user)):
    docs = await db.leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return docs


@api_router.delete("/leads/{lead_id}")
async def delete_lead(lead_id: str, current_user: dict = Depends(get_current_user)):
    res = await db.leads.delete_one({"id": lead_id})
    if res.deleted_count == 0:
        raise HTTPException(404, "Lead not found")
    return {"ok": True}


@api_router.patch("/leads/{lead_id}")
async def update_lead_status(lead_id: str, status: str, current_user: dict = Depends(get_current_user)):
    res = await db.leads.update_one({"id": lead_id}, {"$set": {"status": status}})
    if res.matched_count == 0:
        raise HTTPException(404, "Lead not found")
    return {"ok": True}


# ---------- Blog ----------
@api_router.get("/blog", response_model=List[BlogPost])
async def list_posts(published_only: bool = True):
    query = {"published": True} if published_only else {}
    docs = await db.blog_posts.find(query, {"_id": 0}).sort("created_at", -1).to_list(100)
    return docs


@api_router.get("/blog/{slug}", response_model=BlogPost)
async def get_post(slug: str):
    doc = await db.blog_posts.find_one({"slug": slug}, {"_id": 0})
    if not doc:
        raise HTTPException(404, "Post not found")
    return doc


@api_router.post("/blog", response_model=BlogPost, status_code=201)
async def create_post(payload: BlogPostCreate, current_user: dict = Depends(get_current_user)):
    existing = await db.blog_posts.find_one({"slug": payload.slug})
    if existing:
        raise HTTPException(400, "Slug already exists")
    now = datetime.now(timezone.utc).isoformat()
    doc = {**payload.model_dump(), "id": str(uuid.uuid4()), "created_at": now, "updated_at": now}
    await db.blog_posts.insert_one(doc.copy())
    doc.pop("_id", None)
    return doc


@api_router.put("/blog/{post_id}", response_model=BlogPost)
async def update_post(post_id: str, payload: BlogPostCreate, current_user: dict = Depends(get_current_user)):
    now = datetime.now(timezone.utc).isoformat()
    update_doc = {**payload.model_dump(), "updated_at": now}
    res = await db.blog_posts.update_one({"id": post_id}, {"$set": update_doc})
    if res.matched_count == 0:
        raise HTTPException(404, "Post not found")
    doc = await db.blog_posts.find_one({"id": post_id}, {"_id": 0})
    return doc


@api_router.delete("/blog/{post_id}")
async def delete_post(post_id: str, current_user: dict = Depends(get_current_user)):
    res = await db.blog_posts.delete_one({"id": post_id})
    if res.deleted_count == 0:
        raise HTTPException(404, "Post not found")
    return {"ok": True}


# ---------- Reviews ----------
@api_router.get("/reviews", response_model=List[Review])
async def list_reviews():
    docs = await db.reviews.find({}, {"_id": 0}).sort("created_at", -1).to_list(100)
    return docs


@api_router.post("/reviews", response_model=Review, status_code=201)
async def create_review(payload: ReviewCreate, current_user: dict = Depends(get_current_user)):
    doc = {**payload.model_dump(), "id": str(uuid.uuid4()),
           "created_at": datetime.now(timezone.utc).isoformat()}
    await db.reviews.insert_one(doc.copy())
    doc.pop("_id", None)
    return doc


@api_router.delete("/reviews/{review_id}")
async def delete_review(review_id: str, current_user: dict = Depends(get_current_user)):
    res = await db.reviews.delete_one({"id": review_id})
    if res.deleted_count == 0:
        raise HTTPException(404, "Review not found")
    return {"ok": True}


# ---------- Health ----------
@api_router.get("/")
async def root():
    return {"service": "Conceptual Studies API", "status": "ok"}


@api_router.get("/health")
async def health():
    return {"status": "healthy", "timestamp": datetime.now(timezone.utc).isoformat()}


# ---------- SEO: sitemap & robots ----------
ROUTES = [
    "/", "/about-mentor", "/accountancy", "/economics", "/business-studies",
    "/crash-courses", "/cuet-preparation", "/reviews", "/contact", "/blog",
]


async def _build_sitemap_xml() -> str:
    urls = [f"{SITE_URL}{r}" for r in ROUTES]
    posts = await db.blog_posts.find({"published": True}, {"slug": 1, "_id": 0}).to_list(200)
    urls += [f"{SITE_URL}/blog/{p['slug']}" for p in posts]
    body = ['<?xml version="1.0" encoding="UTF-8"?>',
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    today = datetime.now(timezone.utc).date().isoformat()
    for u in urls:
        body.append(f"<url><loc>{u}</loc><lastmod>{today}</lastmod><changefreq>weekly</changefreq></url>")
    body.append("</urlset>")
    return "\n".join(body)


@api_router.get("/sitemap.xml")
async def api_sitemap():
    return FastResponse(content=await _build_sitemap_xml(), media_type="application/xml")


@api_router.get("/robots.txt", response_class=PlainTextResponse)
async def api_robots():
    return f"User-agent: *\nAllow: /\nDisallow: /admin\nSitemap: {SITE_URL}/api/sitemap.xml\n"


@app.get("/sitemap.xml")
async def sitemap():
    return FastResponse(content=await _build_sitemap_xml(), media_type="application/xml")


@app.get("/robots.txt", response_class=PlainTextResponse)
async def robots():
    return f"User-agent: *\nAllow: /\nDisallow: /admin\nSitemap: {SITE_URL}/api/sitemap.xml\n"


# Include router
app.include_router(api_router)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("FRONTEND_URL", "http://localhost:3000"), "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------- Startup: indexes + seeding ----------
@app.on_event("startup")
async def startup_event():
    await db.users.create_index("email", unique=True)
    await db.users.create_index("id", unique=True)
    await db.blog_posts.create_index("slug", unique=True)
    await db.blog_posts.create_index("id", unique=True)
    await db.leads.create_index("id", unique=True)
    await db.reviews.create_index("id", unique=True)

    # Seed admin
    admin_email = os.environ.get("ADMIN_EMAIL", "admin@conceptualstudies.in").lower()
    admin_password = os.environ.get("ADMIN_PASSWORD", "admin123")
    existing = await db.users.find_one({"email": admin_email})
    if existing is None:
        await db.users.insert_one({
            "id": str(uuid.uuid4()),
            "email": admin_email,
            "password_hash": hash_password(admin_password),
            "name": "Admin",
            "role": "admin",
            "created_at": datetime.now(timezone.utc).isoformat(),
        })
        logger.info(f"Seeded admin user: {admin_email}")
    elif not verify_password(admin_password, existing["password_hash"]):
        await db.users.update_one({"email": admin_email},
                                  {"$set": {"password_hash": hash_password(admin_password)}})
        logger.info("Updated admin password to match .env")

    # Seed blog posts
    for post in get_seeded_posts():
        exists = await db.blog_posts.find_one({"slug": post["slug"]})
        if not exists:
            doc = {**post, "id": str(uuid.uuid4())}
            await db.blog_posts.insert_one(doc)
    logger.info("Blog posts seeded/verified")

    # Seed reviews
    for rev in SEED_REVIEWS:
        exists = await db.reviews.find_one({"name": rev["name"], "text": rev["text"]})
        if not exists:
            await db.reviews.insert_one({
                **rev,
                "id": str(uuid.uuid4()),
                "created_at": datetime.now(timezone.utc).isoformat(),
            })
    logger.info("Reviews seeded/verified")


@app.on_event("shutdown")
async def shutdown_event():
    client.close()
