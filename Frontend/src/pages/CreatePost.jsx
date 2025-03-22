import React, { useState } from "react";
import PostForm from "../components/post/PostForm";
import Feed from "../components/post/Feed";

const CreatePost = (token) => {
  

  return (
    <div>
      <h1>Social Feed</h1>
      {token ? (
        <>
          <PostForm onPostCreated={() => window.location.reload()} token={token} />
          <Feed token={token} />
        </>
      ) : (
        <p>Please log in to view and create posts.</p>
      )}
    </div>
  );
};

export default CreatePost;
