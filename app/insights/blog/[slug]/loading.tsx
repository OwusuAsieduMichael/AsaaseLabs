export default function BlogArticleLoading() {
  return (
    <main className="min-h-screen bg-dark">
      <div className="h-20 border-b border-gray-800/80 bg-dark/95" aria-hidden />
      <div className="section-container max-w-3xl pt-32 pb-12 animate-pulse">
        <div className="h-4 w-40 bg-gray-800 rounded mb-8" />
        <div className="h-6 w-28 bg-gray-800 rounded-full mb-6" />
        <div className="h-12 w-full max-w-2xl bg-gray-800 rounded-lg mb-4" />
        <div className="h-12 w-4/5 max-w-xl bg-gray-800 rounded-lg mb-8" />
        <div className="h-4 w-64 bg-gray-800 rounded mb-12" />
        <div className="space-y-8">
          <div>
            <div className="h-8 w-3/4 bg-gray-800 rounded mb-4" />
            <div className="h-4 w-full bg-gray-800/80 rounded mb-2" />
            <div className="h-4 w-full bg-gray-800/80 rounded mb-2" />
            <div className="h-4 w-5/6 bg-gray-800/80 rounded" />
          </div>
          <div>
            <div className="h-8 w-2/3 bg-gray-800 rounded mb-4" />
            <div className="h-4 w-full bg-gray-800/80 rounded mb-2" />
            <div className="h-4 w-full bg-gray-800/80 rounded" />
          </div>
        </div>
      </div>
    </main>
  )
}
