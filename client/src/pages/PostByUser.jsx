import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {BACK_URL} from "../config.js";

const PostByUser = () => {
  const [posts, setPosts] = useState([]);
  const { userId } = useParams();  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BACK_URL}/api/posts/user/${userId}`);
        setPosts(res.data);
        console.log(res.data);
      } catch (err) {
        console.error("Error fetching posts by user:", err);
      }
    };
    fetchData();
  }, [userId]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  const insertLineBreaks = (title) => {
    if (title && title.length > 30) {
      let newTitle = '';
      for (let i = 0; i < title.length; i++) {
        newTitle += title[i];
        if ((i + 1) % 30 === 0) {
          newTitle += '\n';
        }
      }
      return newTitle;
    }
    return title;
  };

  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
            <img src={`${BACK_URL}/images/${post.img}`} alt="" />
            </div>
            <div className="content">
              <Link className="link" to={`/post/${post.id}`}>
                <h1>{post.title && insertLineBreaks(post.title)}</h1>
              </Link>
              <p>{getText(post.desc)}</p>
              <Link className="link" to={`/post/${post.id}`}>
                <button>Read More</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostByUser;