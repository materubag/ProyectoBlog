import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {BACK_URL} from "../config.js";

const Menu = ({ cat, excludeId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BACK_URL}/api/posts/?cat=${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  return (
    <div className="menu">
      <h1>Posts que te pueden interesar</h1>
      {posts
        .filter(post => post.id !== Number(excludeId))  // Filtra el post actual
        .map((post) => (
          <div className="post" key={post.id}>
            <img src={`../upload/${post?.img}`} alt="" />
            <h2>{post.title}</h2>
            <Link className="link" to={`/post/${post.id}`}>
              <button>Leer más</button>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Menu;