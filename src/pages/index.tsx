import { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { registrarUsuario } from "@/Firebase/Promesas"; // Asegúrate de que esta ruta es correcta

export default function Home() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [edad, setEdad] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");

  const handleRegister = async () => {
    const usuario = {
      nombre,
      apellido,
      edad: parseInt(edad, 10),
      correo,
      contrasena
    };

    try {
      await registrarUsuario(usuario);
      alert("Registro exitoso");
      setNombre("");
      setApellido("");
      setEdad("");
      setCorreo("");
      setContrasena("");
    } catch (error) {
      console.error("Error al registrar:", error);
      alert("Error al registrar");
    }
  };

  return (
    <>
      <div className="mt-5">
        <h1>Registro en Game Cave</h1>
        <p>Regístrate para comprar tus juegos favoritos de manera rápida y sencilla.</p>

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese su nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese su apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Edad</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese su edad"
              value={edad}
              onChange={(e) => setEdad(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingrese su email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingrese su contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />
          </Form.Group>

          <div className="d-flex flex-column align-items-center">
            <Button variant="primary" className="mb-3" onClick={handleRegister}>
              Registrarse
            </Button>
            <Button variant="danger" href="/Pagina1">
              Login
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}