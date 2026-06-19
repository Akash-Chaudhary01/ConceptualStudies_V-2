"""Backend API tests for Conceptual Studies."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://commerce-mastery-8.preview.emergentagent.com").rstrip("/")
ADMIN_EMAIL = "admin@conceptualstudies.in"
ADMIN_PASSWORD = "ConceptAdmin@2025"

EXPECTED_SLUGS = {
    "how-to-score-95-plus-in-accountancy",
    "best-study-plan-for-class-12-commerce",
    "cuet-commerce-preparation-strategy",
    "common-mistakes-in-accountancy",
    "business-studies-preparation-guide",
    "economics-study-tips",
    "partnership-accounts-made-easy",
    "board-exam-preparation-strategy",
}


@pytest.fixture(scope="session")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="session")
def admin_session(session):
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    r = s.post(f"{BASE_URL}/api/auth/login",
               json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    assert r.status_code == 200, f"Admin login failed: {r.status_code} {r.text}"
    return s


# ---------- Health ----------
class TestHealth:
    def test_health(self, session):
        r = session.get(f"{BASE_URL}/api/health")
        assert r.status_code == 200
        assert r.json()["status"] == "healthy"


# ---------- Blog (seed) ----------
class TestBlog:
    def test_blog_list_8_posts(self, session):
        r = session.get(f"{BASE_URL}/api/blog")
        assert r.status_code == 200
        posts = r.json()
        assert len(posts) == 8, f"Expected 8 posts, got {len(posts)}"
        slugs = {p["slug"] for p in posts}
        assert slugs == EXPECTED_SLUGS, f"Missing slugs: {EXPECTED_SLUGS - slugs}"
        for p in posts:
            assert p["title"] and p["content"] and p["cover_image"]

    def test_blog_detail_full_content(self, session):
        r = session.get(f"{BASE_URL}/api/blog/how-to-score-95-plus-in-accountancy")
        assert r.status_code == 200
        post = r.json()
        assert len(post["content"]) > 500
        assert post["slug"] == "how-to-score-95-plus-in-accountancy"

    def test_blog_detail_404(self, session):
        r = session.get(f"{BASE_URL}/api/blog/non-existent-slug-xyz")
        assert r.status_code == 404


# ---------- Reviews ----------
class TestReviews:
    def test_reviews_3_seed(self, session):
        r = session.get(f"{BASE_URL}/api/reviews")
        assert r.status_code == 200
        reviews = r.json()
        assert len(reviews) >= 3
        names = {x["name"] for x in reviews}
        assert "Rohit Choudhary" in names
        assert "Gracy" in names
        assert "Monika Choudhury" in names


# ---------- Leads ----------
class TestLeads:
    @pytest.fixture(scope="class")
    def created_lead(self, session):
        payload = {
            "student_name": "TEST_Pytest Student",
            "student_class": "12",
            "board": "CBSE",
            "subject": "Accountancy",
            "phone": "9999999999",
            "city": "Delhi",
            "message": "test message",
        }
        r = session.post(f"{BASE_URL}/api/leads", json=payload)
        assert r.status_code == 201, f"{r.status_code} {r.text}"
        data = r.json()
        assert data["id"]
        assert data["status"] == "new"
        assert data["student_name"] == "TEST_Pytest Student"
        return data

    def test_lead_creation(self, created_lead):
        assert created_lead["id"]

    def test_leads_list_requires_auth(self, session):
        r = session.get(f"{BASE_URL}/api/leads")
        assert r.status_code == 401

    def test_leads_list_with_auth(self, admin_session, created_lead):
        r = admin_session.get(f"{BASE_URL}/api/leads")
        assert r.status_code == 200
        ids = [x["id"] for x in r.json()]
        assert created_lead["id"] in ids

    def test_lead_delete(self, admin_session, created_lead):
        r = admin_session.delete(f"{BASE_URL}/api/leads/{created_lead['id']}")
        assert r.status_code == 200
        # verify removed
        r2 = admin_session.get(f"{BASE_URL}/api/leads")
        ids = [x["id"] for x in r2.json()]
        assert created_lead["id"] not in ids


# ---------- Auth ----------
class TestAuth:
    def test_login_success_sets_cookie(self):
        s = requests.Session()
        r = s.post(f"{BASE_URL}/api/auth/login",
                   json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
        assert r.status_code == 200
        data = r.json()
        assert data["email"] == ADMIN_EMAIL
        assert data["role"] == "admin"
        cookie_names = {c.name for c in s.cookies}
        assert "access_token" in cookie_names
        assert "refresh_token" in cookie_names

    def test_login_wrong_password(self, session):
        r = session.post(f"{BASE_URL}/api/auth/login",
                         json={"email": ADMIN_EMAIL, "password": "WrongPassword!"})
        assert r.status_code == 401

    def test_me_without_cookie(self):
        s = requests.Session()
        r = s.get(f"{BASE_URL}/api/auth/me")
        assert r.status_code == 401

    def test_me_with_cookie(self, admin_session):
        r = admin_session.get(f"{BASE_URL}/api/auth/me")
        assert r.status_code == 200
        assert r.json()["email"] == ADMIN_EMAIL


# ---------- SEO ----------
class TestSEO:
    def test_sitemap(self, session):
        r = session.get(f"{BASE_URL}/sitemap.xml")
        assert r.status_code == 200
        body = r.text
        assert "<urlset" in body
        for route in ["/", "/about-mentor", "/accountancy", "/economics",
                      "/business-studies", "/crash-courses", "/cuet-preparation",
                      "/reviews", "/contact", "/blog"]:
            assert route in body, f"route missing: {route}"
        for slug in EXPECTED_SLUGS:
            assert slug in body, f"slug missing in sitemap: {slug}"

    def test_robots(self, session):
        r = session.get(f"{BASE_URL}/robots.txt")
        assert r.status_code == 200
        body = r.text
        assert "User-agent: *" in body
        assert "Sitemap:" in body
        assert "/sitemap.xml" in body
