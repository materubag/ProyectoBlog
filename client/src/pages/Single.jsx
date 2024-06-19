import React, { useEffect, useState, useContext } from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import DefaultUserImg from "../img/default.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/authContext";
import DOMPurify from "dompurify";
import {BACK_URL} from "../config.js";

const Single = () => {
  const [post, setPost] = useState({});
  axios.defaults.withCredentials = true;
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editedComment, setEditedComment] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.pathname.split("/")[2];
  const { currentUser } = useContext(AuthContext);
  const id=currentUser.id;
  const mod=currentUser.mod;
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${BACK_URL}/api/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPost();
  }, [postId]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`${BACK_URL}/api/comments/${postId}`);
        setComments(res.data);
      } catch (err) {
        console.error('Error fetching comments:', err);
      }
    };
    fetchComments();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${BACK_URL}/api/posts/${postId}`,{id,mod});
      navigate("/");
    } catch (err) {
      console.log("Error deleting post: " + err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert("Por favor, inicia sesión para comentar.");
      navigate("/login");
      return;
    }

    try {
      const formattedDate = moment().format('YYYY-MM-DD HH:mm:ss');

      await axios.post(`${BACK_URL}/api/comments`, {
        comentario: newComment,
        date: formattedDate,
        postid: postId,
      });

      setNewComment('');

      const updatedComments = await axios.get(`${BACK_URL}/api/comments/${postId}`);
      setComments(updatedComments.data);

    } catch (err) {
      console.error('Error posting comment:', err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`${BACK_URL}/api/comments/${commentId}`);
      setComments(comments.filter(comment => comment.id !== commentId));
    } catch (err) {
      console.error('Error deleting comment:', err);
    }
  };

  const handleEditClick = (comment) => {
    setEditMode(true);
    setEditedComment(comment);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedComment({});
  };

  const handleSaveEdit = async () => {
    try {
      const formattedDate = moment().format('YYYY-MM-DD HH:mm:ss');
      const edit = "Editado: ";
      await axios.put(`${BACK_URL}/api/comments/${editedComment.id}`, {
        comentario: edit + editedComment.comentario,
        date: formattedDate,
      });

      const updatedComments = await axios.get(`${BACK_URL}/api/comments/${postId}`);
      setComments(updatedComments.data);

      setEditMode(false);
      setEditedComment({});

    } catch (err) {
      console.error('Error editing comment:', err);
    }
  };

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

  if (!Object.keys(post).length) {
    return (
      <div className="single">
        <div className="content">
          <h2>Post sin moderar <Link to="/">mira otros posts</Link></h2>
        </div>
      </div>
    );
  }

  return (
    <div className="single">
      <div className="content">
        <img src={`${BACK_URL}/images/${post.img}`} alt="" />
        <div className="user">

          {post && post.visible === 1 && (<div>
            <Link to={`/user/${post.uid}/posts`}>
              <img src={post.userImg ? `${BACK_URL}/images/${post.userImg}` : DefaultUserImg} alt="" />
            </Link>
            <div className="info">
              <Link to={`/user/${post.uid}/posts`} className="username-link">
                <span>{post.username}</span>
              </Link>

            </div>
          </div>)}
          <p className="fecha">Posted {moment(post.date).fromNow()}</p>
          {currentUser && (
            <div className="edit">
              {currentUser.username === post.username && (
                <Link to={`/write?edit=${post.id}`} state={post}>
                  <img src={Edit} alt="Edit" />
                </Link>
              )}
              {((currentUser.username === post.username) || (currentUser.mod === 1)) && (
                <img onClick={handleDelete} src={Delete} alt="Delete" />
              )}
            </div>
          )}
        </div>
        <h1>{post.title && insertLineBreaks(post.title)}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.desc),
          }}
        ></p>
        <div className="comentarios">
          <form onSubmit={handleCommentSubmit}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escribe tu comentario aquí..."
            ></textarea>
            <button type="submit">Comentar</button>
          </form>
          <div className="comment-list">
            {comments.map((comment) => (
              <div className="comment-item" key={comment.id}>
                <div className="user">
                  <Link to={`/user/${comment.uid}/posts`}>
                    <img src={comment.userImg ? `${BACK_URL}/images/${comment.userImg}` : DefaultUserImg} alt="" />
                  </Link>
                  <div className="info">
                    <Link to={`/user/${comment.uid}/posts`} className="username-link">
                      <span>{comment.username}</span>
                    </Link>
                    <p>Posted {moment(comment.date).fromNow()}</p>
                  </div>
                </div>
                {editMode && editedComment.id === comment.id ? (
                  <div className="edit-area">
                    <textarea className="texto"
                      value={editedComment.comentario}
                      onChange={(e) => setEditedComment({ ...editedComment, comentario: e.target.value })}
                    />
                    <button className="bGuardar" onClick={handleSaveEdit}>Guardar</button>
                    <button className="bCancelar" onClick={handleCancelEdit}>Cancelar</button>
                  </div>
                ) : (
                  <div>
                    <p>{comment.comentario}</p>
                    <div className="comment-actions">
                      {currentUser && currentUser.id === comment.uid && (
                        <img src={Edit} alt="Edit" onClick={() => handleEditClick(comment)} />
                      )}
                      {((currentUser.username === post.username) || (currentUser.mod === 1)) && (
                        <img onClick={() => handleDeleteComment(comment.id)} src={Delete} alt="Delete" />
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Menu cat={post.cat} excludeId={postId} />
    </div>
  );
};

export default Single;