import { obtenerVideojuegos, eliminarVideojuego } from '@/Firebase/Promesas';
import { Videojuego } from '@/Interfaces/IVideojuegos'; // Asegúrate de que el nombre del archivo sea correcto
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export const Pagina4 = () => {
    const [videojuegos, setVideojuegos] = useState<Videojuego[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [videojuegoAEliminar, setVideojuegoAEliminar] = useState<string | null>(null);

    useEffect(() => {
        // Traer listado de videojuegos desde las promesas
        obtenerVideojuegos().then((videojuegos) => {
            // Meter el listado dentro del estado
            setVideojuegos(videojuegos);
        }).catch((e) => {
            console.log(e);
            alert("Algo ocurrió");
        });
    }, []);

    const handleShow = (key: string) => {
        setVideojuegoAEliminar(key);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setVideojuegoAEliminar(null);
    };

    const handleDelete = () => {
        if (videojuegoAEliminar) {
            eliminarVideojuego(videojuegoAEliminar)
                .then(() => {
                    // Actualizar la lista de videojuegos después de eliminar
                    setVideojuegos(videojuegos.filter(v => v.key !== videojuegoAEliminar));
                    alert("Videojuego eliminado con éxito");
                    handleClose();
                })
                .catch(() => alert("Error al eliminar el videojuego"));
        }
    };

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Compañía</th>
                        <th>Copias</th>
                        <th>Fecha salida</th>
                        <th>Distribuidora</th>
                        <th>Duracion</th>
                        <th>Precio</th>
                        <th>Genero</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        videojuegos.map((v) => (
                            <tr key={v.key}>
                                <td>{v.nombre}</td>
                                <td>{v.compania}</td>
                                <td>{v.copias}</td>
                                <td>{v.fecha}</td>
                                <td>{v.distribuidora}</td>
                                <td>{v.duracion}</td>
                                <td>{v.precio}</td>
                                <td>{v.genero}</td>
                                <td>
                                    <Link href={{ pathname: 'Pagina5', query: { key: v.key } }}>
                                        <Button variant='warning'><FaEdit /></Button>
                                    </Link>
                                    <Button variant='danger' onClick={() => handleShow(v.key!)}><MdDelete /></Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Estás seguro de que deseas eliminar este videojuego?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Pagina4;