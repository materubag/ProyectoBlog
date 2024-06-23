import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { BACK_URL } from "../config.js";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BACK_URL}/api/posts${cat}`);
        setPosts(res.data);
      } catch (err) {
        setError(err);
        console.error("Error fetching posts:", err);
      }
    };
    fetchData();

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [cat]);

  const truncateDescription = (desc) => {
    return desc.length > 350 ? `${desc.substring(0, 350)}...` : desc;
  };

  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            {isMobile ? (
              <div className="mobile-layout">
                <div className="img">
                  <img src={`${BACK_URL}/images/${post.img}`} alt="" />
                </div>
                <div className="content">
                  <Link className="link" to={`/post/${post.id}`}>
                    <h1>{post.title}</h1>
                  </Link>
                  <div dangerouslySetInnerHTML={{ __html: truncateDescription(post.desc) }} />
                  <Link className="link" to={`/post/${post.id}`}>
                    <button>Leer más</button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="desktop-layout">
                <div className="img">
                  <img src={`${BACK_URL}/images/${post.img}`} alt="" />
                </div>
                <div className="content">
                  <Link className="link" to={`/post/${post.id}`}>
                    <h1>{post.title}</h1>
                  </Link>
                  <div dangerouslySetInnerHTML={{ __html: truncateDescription(post.desc) }} />
                  <Link className="link" to={`/post/${post.id}`}>
                    <button>Leer más</button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;