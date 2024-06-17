import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false); // Estado para detectar si es móvil
  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/posts${cat}`);
        setPosts(res.data);
      } catch (err) {
        setError(err);
        console.error("Error fetching posts:", err);
      }
    };
    fetchData();

    // Función para manejar el resize y actualizar isMobile
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Agregar listener de resize al montar el componente
    window.addEventListener('resize', handleResize);

    // Limpiar listener al desmontar el componente
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [cat]);

  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            {/* Renderizado condicional para dispositivos móviles */}
            {isMobile ? (
              <div className="mobile-layout">
                <div className="img">
                  <img src={`../upload/${post.img}`} alt="" />
                </div>
                <div className="content">
                  <Link className="link" to={`/post/${post.id}`}>
                    <h1>{post.title}</h1>
                  </Link>
                  <div dangerouslySetInnerHTML={{ __html: post.desc }} />
                  <Link className="link" to={`/post/${post.id}`}>
                    <button>Leer más</button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="desktop-layout">
                <div className="img">
                  <img src={`../upload/${post.img}`} alt="" />
                </div>
                <div className="content">
                  <Link className="link" to={`/post/${post.id}`}>
                    <h1>{post.title}</h1>
                  </Link>
                  <div dangerouslySetInnerHTML={{ __html: post.desc }} />
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