import React from 'react';
import Logo from '../img/OIG.png';
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react'; 
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  })

  const [err, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = e => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await login(inputs)
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  }

  return (
    <div className="auth">
      <div className='logo'>
          <img src={Logo} alt="" />
        </div>
      <form>
      <h1>Iniciar Sesión</h1>
        <input
          required
          type="text"
          placeholder="usuario"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="contraseña"
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Login</button>
        {err && <p className='error'>{err}</p>}
        <span>
        ¿Aún no tienes una cuenta? <Link to="/register">Registrate</Link>
        </span>
      </form>
    </div>
  )
}

export default Login
