import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const Profile = () => {
    const { currentUser,logout } = useContext(AuthContext);
    return (
        <div className="profile">
            <div className="header">
                <h1>Perfil</h1>
                <Link to="/login"><button className='logout-button'onClick={logout}>Cerrar Sesión</button></Link>
            </div>
            <div className="content">
                <h2>Información del Usuario</h2>
                <p>Nombre: {currentUser?.username}</p>
                <p>Correo electrónico: {currentUser?.email} </p>
                <p>Rol:...... </p>
                <h2>Opciones de Perfil</h2>
                <ul>
                    <li><button className="profile-option">Editar Perfil</button></li>
                    <li><button className="profile-option">Cambiar Contraseña</button></li>
                    <li><button className="profile-option">Eliminar Cuenta</button></li>
                </ul>
            </div>
        </div>
    );
};

export default Profile;

