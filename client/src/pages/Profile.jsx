import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const Profile = () => {
    const { currentUser, logout } = useContext(AuthContext);
    if (!currentUser) {
        return (
            <div className="profile">
                <div className="header">
                    <h1>Perfil</h1>
                    <Link to="/login"><button className='logout-button'>Iniciar Sesión</button></Link>
                </div>
                <div className="content">
                    <p>Debe iniciar sesión para ver esta información.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="profile">
            <div className="header">
                <h1>Perfil</h1>
                <Link to="/login"><button className='logout-button' onClick={logout}>Cerrar Sesión</button></Link>
            </div>
            <div className="content">
                <h2>Información del Usuario</h2>
                <p>Nombre: {currentUser.username}</p>
                <p>Correo: {currentUser.email} </p>
                <h2>Opciones de Perfil</h2>
                <ul>
                    <li>
                        <Link to="/editprofile">
                        <button className="profile-option">Editar Perfil</button>
                        </Link>
                    </li>
                    <li>
                        <Link className="link" to={`/user/${currentUser.id}/posts`}>
                            <button className="profile-option">Mis Posts</button>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Profile;

