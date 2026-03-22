import React, { useState, useEffect } from "react";
import SearchBar from "../features/marketplace/SearchBar";
import ToggleButtons from "../features/marketplace/ToggleButton";
import MarketplacePostItem from "../features/marketplace/MarketplacePostItem";
import PostList from "../features/marketplace/PostList";
import { getMarketplaceItems } from "../api/marketplace/marketplace";

export default function MarketplacePage({ token }) {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async (pageNumber = 1) => {
    try {
      setLoading(true);
      const data = await getMarketplaceItems(token, pageNumber);

      setPosts(data.items || []);
      setPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(1);
  }, []);

  const filteredPosts = posts.filter((post) =>
    [post.title, post.description, post.category]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">

      {/* Header */}
      <h1 className="text-2xl font-semibold text-center mb-6">
        Marketplace
      </h1>

      <ToggleButtons
        showForm={showForm}
        handleBuyClick={() => setShowForm(false)}
        handleSellClick={() => setShowForm(true)}
      />

      {showForm ? (
        <MarketplacePostItem token={token} onPostSuccess={() => {
          fetchPosts(1);
          setShowForm(false);
        }} />
      ) : (
        <>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          {loading ? (
            <p className="text-center mt-6">Loading...</p>
          ) : (
            <PostList posts={filteredPosts} />
          )}

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                disabled={page <= 1}
                onClick={() => fetchPosts(page - 1)}
                className="px-4 py-2 rounded-lg border disabled:opacity-50"
              >
                Prev
              </button>

              <span className="text-sm">
                {page} / {totalPages}
              </span>

              <button
                disabled={page >= totalPages}
                onClick={() => fetchPosts(page + 1)}
                className="px-4 py-2 rounded-lg border disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}