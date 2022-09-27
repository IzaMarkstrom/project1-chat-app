import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Post from "@project1-chat-app/shared";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3002";

const fetchPosts = async () => {
  const response = await axios.get<Post>("/posts");
  return response.data;
};

export default function HomePage() {
    const [post, setPost] = useState<Post | undefined>();
    const [error, setError] = useState<string | undefined>();
  
    useEffect(() => {
      fetchPosts()
        .then(setPost)
        .catch((error) => {
          setPost(undefined);
          setError("Something went wrong");
        });
    }, []);

  return (
    <div className="App">
      <header className="App-header">
        {post ? post.text : error ? error : "No posts yet"}
      </header>
    </div>
  )
}
