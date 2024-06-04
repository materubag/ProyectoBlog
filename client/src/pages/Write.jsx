import React, {useState} from 'react';
import ReactQuill, { displayName } from "react-quill";
import "react-quill/dist/quill.snow.css";

const Write = () => {
  const [value, setValue] = useState('');
  console.log(value);
  return (
    <div className='add'>
      <div className="content">
        <input type="text" placeholder='Titulo'/>
        <div className="editorContainer">
        <ReactQuill className="editor" theme="snow" value={value} onChange={setValue}/>
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publicar</h1>
          <span>
            <b>Estado:</b> Borrador
          </span>
          <span>
            <b>Visibilidad:</b> Publico
          </span>
          <input style={{display:"none"}} type='file' name='' id='file'></input>
          <label className='file' htmlFor='file'>Subir Imagen</label>
          <div className="buttons">
            <button>Guardar como borrador</button>
            <button>Actualizar</button>
          </div>
        </div>
        <div className="item">
          <h1>Categoria</h1>
          <div className="cat">
          <input type='radio' name='cat' value="arte" id='arte'></input>
          <label htmlFor='arte'>Arte</label></div>
          <div className="cat">
          <input type='radio' name='cat' value="tecnologia" id='tecnologia'></input>
          <label htmlFor='tecnologia'>Tecnologia</label></div>
          <div className="cat">
          <input type='radio' name='cat' value="entretenimiento" id='entretenimiento'></input>
          <label htmlFor='entretenimiento'>Entretenimiento</label></div>
          <div className="cat">
          <input type='radio' name='cat' value="deporte" id='deporte'></input>
          <label htmlFor='deporte'>Deporte</label></div>
          <div className="cat">
          <input type='radio' name='cat' value="historia" id='historia'></input>
          <label htmlFor='historia'>Historia</label></div>
          <div className="cat">
          <input type='radio' name='cat' value="ciencia" id='ciencia'></input>
          <label htmlFor='ciencia'>Ciencia</label></div>
        </div>
      </div>
    </div>
  )
}

export default Write;
