import Link from "next/link";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

export default function Home() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Game Cave</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/Pagina3">Registrar videojuego</Nav.Link>
            <Nav.Link href="/Pagina4">Lista de videojuegos</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-5 text-center">
        <h1>Bienvenido a Game Cave</h1>
        <p>Compra tus juegos favoritos de manera rápida y sencilla.</p>
        <Button variant="primary" href="/Pagina3" className="m-2">Registro</Button>
        <Button variant="primary" href="/Pagina4" className="m-2">Tabla</Button>
      </Container>
    </>
  );
}
