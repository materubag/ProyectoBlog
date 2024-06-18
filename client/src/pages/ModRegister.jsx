import React, { useState } from "react";
import Logo from '../img/OIG.png';
import axios from "axios";
import {BACK_URL} from "../config.js";

const ModRegister = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [telf, setTelf] = useState("");
  const [err, setErr] = useState(null);
  const [msg, setMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if all fields are filled
    if (!username || !password || !telf) {
      setMsg(null)
      setErr("Todos los campos son obligatorios");
      return;
    }

    const data = { username, password, telf };

    try {
      setMsg(null);
      const res = await axios.put(`${BACK_URL}/api/auth/updateTelf`, data);
      setMsg(res.data);
      setErr(null); // Clear error if successful
    } catch (err) {
      setErr(err.response?.data || "Error al registrar el usuario");
      setMsg(null); // Clear message if there's an error
    }
  };

  return (
    <div className="auth">
      <div className='logo'>
        <img src={Logo} alt="" />
      </div>
      <form className="modRegister" onSubmit={handleSubmit}>
        <h2>Credenciales</h2>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          Teléfono:
          <input
            type="text"
            name="telf"
            value={telf}
            onChange={(e) => setTelf(e.target.value)}
          />
        </label>
        <button type="submit">Register</button>
        {err && <p className="error">{err}</p>}
        {msg && <p className="msg">{msg}</p>}
      </form>
    </div>
  );
};

export default ModRegister;