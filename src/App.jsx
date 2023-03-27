import { useState } from 'react'
import Msg from './msg';
import './App.css'

function App() {

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [errors, setErrors] = useState({});
  const [msj, setMsj] = useState('')

  function enviarFormulario(e) {
    e.preventDefault();

    let error = {};

    if(!nombre){
      error.nombre = "El nombre es requerido"
      setTimeout(() => {
        error.nombre = "";
        setErrors(error.nombre)
      }, 3000)
      setErrors(error)
      return
    }
    if(!/^[a-zA-Z\s]+$/.test(nombre)){
      error.nombre = "El nombre no puede contener caracteres especiales"
      setTimeout(() => {
        error.nombre = "";
        setErrors(error.nombre)
      }, 3000)
      setErrors(error)
      return
    }
    if(!correo){
      error.correo = "El correo es requerido"
      setTimeout(() => {
        error.correo = "";
        setErrors(error.correo)
      }, 3000)
      setErrors(error)
      return
    }
    if(!/\S+@\S+\.\S+/.test(correo)){
      error.correo = "El correo electrónico no es válido"
      setTimeout(() => {
        error.correo = "";
        setErrors(error.correo)
      }, 3000)
      setErrors(error)
      return
    }

    if(!mensaje) {
      error.mensaje = "El mensaje es requerido.";
      setTimeout(() => {
        error.mensaje = "";
        setErrors(error.mensaje)
      }, 3000)
      setErrors(error)
      return
    }
    if(!/^[a-zA-Z0-9\s]+$/.test(mensaje)) {
      error.mensaje = "El mensaje no puede contener caracteres especiales.";
      setTimeout(() => {
        error.mensaje = "";
        setErrors(error.mensaje)
      }, 3000)
      setErrors(error)
      return
    }

    setErrors(error)

    if(Object.keys(errors).length === 0) {
      const inputname = document.querySelector('#name')
      setMsj("Formulario enviado correctamente!");
      setTimeout(() => {
        setMsj("");
        inputname.focus()
      }, 4000);
    }
    // Es el provedor de mail gratuito.
    fetch("https://formspree.io/f/ID_de_Formspree", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre: nombre, correo: correo, mensaje: mensaje }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Formulario enviado exitosamente:", data);
      })
      .catch((error) => {
        console.error("Error al enviar el formulario:", error);
      });

    setNombre("");
    setCorreo("");
    setMensaje("");
  }

  const fecha = new Date().getFullYear()

  return (
    <>
    {msj && <Msg>{msj}</Msg>}
    <h1 className='title'>Contacto</h1>
      <form onSubmit={enviarFormulario} noValidate>
        <div className='input__content'>
          <label>Nombre:</label>
          <input type="text" id="name" value={nombre} autoComplete="off" onChange={(e) => setNombre(e.target.value)} />
          { errors.nombre && (<span>{errors.nombre}</span>)}
        </div>
        <div className='input__content'>
          <label>Correo electrónico:</label>  
          <input type="email" value={correo} autoComplete="off" onChange={(e) => setCorreo(e.target.value)} />
          {errors.correo && <span>{errors.correo}</span>}
        </div>
        <div className='input__content'>
          <label>Mensaje:</label>  
          <textarea value={mensaje} autoComplete="off" onChange={(e) => setMensaje(e.target.value)}></textarea>
          {errors.mensaje && <span>{errors.mensaje}</span>}
        </div>
        <button type="submit">Enviar</button>
      </form>
      <p>Todos los derechos reservados <span className='copyright'>&copy;soynicola.click {fecha}</span></p>
    </>
  );
}

export default App
