import React, { useState, useEffect } from "react";
import SearchBar from "../features/marketplace/SearchBar";
import ToggleButtons from "../features/marketplace/ToggleButton";
import MarketplacePostItem from "../features/marketplace/MarketplacePostItem";
import PostList from "../features/marketplace/PostList";
import { getMarketplaceItems } from "../api/marketplace/marketplace";
import "../styles/marketplace/marketplacepage.css"; 

export default function MarketplacePage({ token }) {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);

  // Pagination state
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch posts from API with pagination
  const fetchPosts = async (pageNumber = 1) => {
    try {
      setLoading(true);
      const data = await getMarketplaceItems(token, pageNumber);

      setPosts(data.items || []);
      setPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchPosts(1);
  }, []);

  // Handle Buy/Sell toggle
  const handleBuyClick = () => setShowForm(false);
  const handleSellClick = () => setShowForm(true);

  // Filter posts based on search term
  const filteredPosts = posts.filter((post) =>
    [post.title, post.description, post.category]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Handle successful post (refresh list to first page)
  const handlePostSuccess = () => {
    fetchPosts(1); 
    setShowForm(false); 
  };

  return (
    <div className="marketplace-page">
      <h1 className="page-heading">College Marketplace</h1>

      {/* Toggle Buy/Sell */}
      <ToggleButtons
        showForm={showForm}
        handleBuyClick={handleBuyClick}
        handleSellClick={handleSellClick}
      />

      {/* Show Form or List */}
      {showForm ? (
        <MarketplacePostItem token={token} onPostSuccess={handlePostSuccess} />
      ) : (
        <>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          
          {loading ? (
            <p>Loading posts...</p>
          ) : (
            <PostList posts={filteredPosts} />
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                disabled={page <= 1}
                onClick={() => fetchPosts(page - 1)}
              >
                Prev
              </button>
              <span>
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page >= totalPages}
                onClick={() => fetchPosts(page + 1)}
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
