export function CardSkeleton({ count = 6 }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="bg-white border border-[#0F2744]/8 rounded-sm overflow-hidden animate-pulse">
                    <div className="h-48 bg-[#0F2744]/5" />
                    <div className="p-6 space-y-3">
                        <div className="h-3 w-24 bg-[#0F2744]/10 rounded" />
                        <div className="h-5 w-3/4 bg-[#0F2744]/10 rounded" />
                        <div className="h-3 w-full bg-[#0F2744]/5 rounded" />
                        <div className="h-3 w-5/6 bg-[#0F2744]/5 rounded" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export function ReviewSkeleton({ count = 4 }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="bg-white border border-[#0F2744]/8 rounded-sm p-7 animate-pulse">
                    <div className="flex gap-1 mb-4">
                        {Array.from({ length: 5 }).map((_, j) => <div key={j} className="w-4 h-4 bg-[#0F2744]/10 rounded-sm" />)}
                    </div>
                    <div className="space-y-2 mb-4">
                        <div className="h-3 w-full bg-[#0F2744]/8 rounded" />
                        <div className="h-3 w-5/6 bg-[#0F2744]/8 rounded" />
                        <div className="h-3 w-4/6 bg-[#0F2744]/8 rounded" />
                    </div>
                    <div className="h-4 w-32 bg-[#0F2744]/10 rounded" />
                </div>
            ))}
        </div>
    );
}
