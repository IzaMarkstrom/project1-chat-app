import React, { useEffect, useState } from "react";
import "./App.css";
import Post from "@project1-chat-app/shared";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3002";

const fetchPosts = async () => {
  const response = await axios.get<Post>("/posts");
  return response.data;
};

function App() {
  const [post, setPost] = useState<Post | undefined>();

  useEffect(() => {
    fetchPosts().then(setPost);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {post ? post.text : "No posts yet"}
      </header>
    </div>
  );
}

export default App;
