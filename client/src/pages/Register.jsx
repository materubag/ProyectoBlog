import React, { useState } from 'react';
import Logo from '../img/OIG.png';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { BACK_URL } from "../config.js";

const Register = () => {

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [err, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = e => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!isValidEmail(inputs.email)) {
      setError("El correo electrónico no tiene una estructura válida.");
      return;
    }

    try {
      const res = await axios.post(`${BACK_URL}/api/auth/register`, inputs);
      console.log(res);
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="auth">
      <div className='logo'>
        <img src={Logo} alt="" />
      </div>
      <form>
        <h1>Registrarse</h1>
        <input
          required
          type="text"
          placeholder="usuario"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="email"
          placeholder="correo"
          name="email"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="contraseña"
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Registrarse</button>
        {err && <p className='error'>{err}</p>}
        <span>
          ¿Yá tienes una cuenta? <Link to="/login">Iniciar Sesión</Link>
        </span>
        <Link className='invitado' to="/">Ingresar como invitado</Link>
      </form>
    </div>
  )
}

export default Register;