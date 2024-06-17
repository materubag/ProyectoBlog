import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import DefaultUserImg from "../img/default.png";
import moment from "moment";
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from "../context/authContext";

const Moderation = () => {
  const [invisibleUsers, setInvisibleUsers] = useState([]);
  const [invisiblePosts, setInvisiblePosts] = useState([]);
  const [invisibleComments, setInvisibleComments] = useState([]);
  const [modReq, setModReq] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [hasInvisibleUsers, setHasInvisibleUsers] = useState(false);
  const [hasInvisiblePosts, setHasInvisiblePosts] = useState(false);
  const [hasInvisibleComments, setHasInvisibleComments] = useState(false);
  const [hasModReq, setHasModReq] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    if (!currentUser || currentUser.mod !== 1) {
      console.log(currentUser.isMod);
      navigate('/');
    }
  }, [currentUser, navigate]);

  const fetchInvisibleUsers = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/modders/invisible-users', {
        withCredentials: true
      });
      setInvisibleUsers(res.data);
      setHasInvisibleUsers(res.data.length > 0);
    } catch (err) {
      console.error('Error fetching invisible users:', err);
    }
  };

  const fetchInvisiblePosts = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/modders/invisible-posts', {
        withCredentials: true
      });
      setInvisiblePosts(res.data);
      setHasInvisiblePosts(res.data.length > 0);
    } catch (err) {
      console.error('Error fetching invisible posts:', err);
    }
  };

  const fetchInvisibleComments = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/modders/invisible-comments', {
        withCredentials: true
      });
      setInvisibleComments(res.data);
      setHasInvisibleComments(res.data.length > 0);
    } catch (err) {
      console.error('Error fetching invisible comments:', err);
    }
  };

  const fetchModReq = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/modders/mod-req', {
        withCredentials: true
      });
      setModReq(res.data);
      setHasModReq(res.data.length > 0);
    } catch (err) {
      console.error('Error fetching moderator requests:', err);
    }
  };

  const approveUser = async (userId) => {
    try {
      await axios.put(`http://localhost:8080/api/modders/update-visible-user/${userId}`, null, {
        withCredentials: true
      });
      fetchInvisibleUsers();
    } catch (err) {
      console.error('Error approving user:', err);
    }
  };

  const approvePost = async (postId) => {
    try {
      await axios.put(`http://localhost:8080/api/modders/update-visible-post/${postId}`, null, {
        withCredentials: true
      });
      fetchInvisiblePosts();
    } catch (err) {
      console.error('Error approving post:', err);
    }
  };

  const approveComment = async (commentId) => {
    try {
      await axios.put(`http://localhost:8080/api/modders/update-visible-comment/${commentId}`, null, {
        withCredentials: true
      });
      fetchInvisibleComments();
    } catch (err) {
      console.error('Error approving comment:', err);
    }
  };

  const approveModReq = async (userId) => {
    try {
      await axios.put(`http://localhost:8080/api/modders/update-mod/${userId}`, null, {
        withCredentials: true
      });
      fetchModReq();
    } catch (err) {
      console.error('Error approving moderator request:', err);
    }
  };

  useEffect(() => {
    fetchInvisibleUsers();
    fetchInvisiblePosts();
    fetchInvisibleComments();
    fetchModReq();
  }, []);

  const renderContent = () => {
    switch (selectedOption) {
      case 'users':
        return (
          <div className="section">
            <h2>Usuarios a revisar</h2>
            {invisibleUsers.map(user => (
              <div className="user" key={user.id}>
                <Link to={`/user/${user.id}/posts`}>
                  <img src={user.userImg ? `../upload/${user.userImg}` : DefaultUserImg} alt="" />
                </Link>
                <div className="info">
                  <Link to={`/user/${user.id}/posts`} className="username-link">
                    <span>{user.username}</span>
                  </Link>
                  <div>
                    <button className="botones" onClick={() => approveUser(user.id)}>Aprobar</button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        );
      case 'posts':
        return (
          <div className="section">
            <h2>Posts a moderar</h2>
            <div className="posts">
              {invisiblePosts.map(post => (
                <div className="post" key={post.id}>
                  <div className="img">
                    {post.img && (
                      <img src={`../upload/${post.img}`} alt="" />
                    )}
                  </div>
                  <div className="content">
                    <h1>{post.title}</h1>
                    <div dangerouslySetInnerHTML={{ __html: post.desc }} />
                    <button className="botones" onClick={() => approvePost(post.id)}>Aprobar</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'comments':
        return (
          <div className="section">
            <h2>Comentarios</h2>
            <div className="comment-list">
              {invisibleComments.map(comment => (
                <div className="comment-item" key={comment.id}>
                  <div className="user">
                    <Link to={`/user/${comment.uid}/posts`}>
                      <img src={comment.userImg ? `../upload/${comment.userImg}` : DefaultUserImg} alt="" />
                    </Link>
                    <div className="info">
                      <Link to={`/user/${comment.uid}/posts`} className="username-link">
                        <span>{comment.username}</span>
                      </Link>
                      <p>Posted {moment(comment.date).fromNow()}</p>
                    </div>
                  </div>
                  <p>{comment.comentario}</p>
                  {currentUser && (
                    <div className="comment-actions">
                      <button className="botones" onClick={() => approveComment(comment.id)}>Aprobar</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      case 'mod-requests':
        return (
          <div className="section">
            <h2>Peticiones de moderador</h2>
            {modReq.map(req => (
              <div className="mod-request" key={req.id}>
                <Link to={`/user/${req.id}/posts`}>
                  <img src={req.userImg ? `../upload/${req.userImg}` : DefaultUserImg} alt="" />
                </Link>
                <div className="info">
                  <Link to={`/user/${req.id}/posts`} className="username-link">
                    <span>{req.username}</span>
                  </Link>
                  <div>
                    <button className="botones" onClick={() => approveModReq(req.id)}>Aprobar</button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        );
      default:
        return <p>Por favor seleccione una opción.</p>;
    }
  };

  return (
    <div className="moderation">
      <h1>Panel de Moderacion</h1>
      <div className="menu">
        <button onClick={() => setSelectedOption('users')}>
          Usuarios {hasInvisibleUsers && <span className="notification-circle"></span>}
        </button>
        <button onClick={() => setSelectedOption('posts')}>
          Posts {hasInvisiblePosts && <span className="notification-circle"></span>}
        </button>
        <button onClick={() => setSelectedOption('comments')}>
          Comentarios {hasInvisibleComments && <span className="notification-circle"></span>}
        </button>
        <button onClick={() => setSelectedOption('mod-requests')}>
          Peticiones a Moderador{hasModReq && <span className="notification-circle"></span>}
        </button>
      </div>
      {renderContent()}
    </div>
  );
};

export default Moderation;