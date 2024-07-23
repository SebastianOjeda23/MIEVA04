import { useState } from "react";
import { useRouter } from "next/router";
import { Navbar, Nav, Button, Form } from "react-bootstrap";
import { obtenerUsuarios } from "@/Firebase/Promesas"; // Asegúrate de tener esta función para obtener usuarios

export default function Pagina1() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    setError("");

    try {
      const usuarios = await obtenerUsuarios(); 
      const usuarioValido = usuarios.find(
        (usuario) => usuario.correo === correo && usuario.contrasena === contrasena
      );

      if (usuarioValido) {
        alert("Inicio de sesión exitoso");
        router.push("/Pagina2");
      } else {
        setError("Credenciales inválidas");
      }
    } catch (e) {
      console.error("Error al iniciar sesión:", e);
      setError("Error al iniciar sesión. Inténtalo de nuevo más tarde.");
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <div className="container">
          <Navbar.Brand href="/">Game Cave</Navbar.Brand>
        </div>
      </Navbar>

      <div className="mt-5 text-center">
        <h1>Iniciar Sesión en Game Cave</h1>
        <p>Ingresa tus credenciales para acceder a tu cuenta.</p>

        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingrese su email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingrese su contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />
          </Form.Group>

          {error && <p className="text-danger">{error}</p>}

          <div className="text-center">
            <Button variant="primary" onClick={handleLogin} className="m-2">
              Iniciar Sesión
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}
