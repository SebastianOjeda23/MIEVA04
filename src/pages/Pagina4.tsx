import { obtenerVideojuegos,eliminarVideojuego } from '@/Firebase/Promesas'
import { Videojuego } from '@/Interfaces/IVideojuegos'  // Asegúrate de que el nombre del archivo sea correcto
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export const Pagina4 = () => {
    const [videojuegos, setVideojuegos] = useState<Videojuego[]>([])

    useEffect(() => {
        // Traer listado de videojuegos desde las promesas
        obtenerVideojuegos().then((videojuegos) => {
            // Meter el listado dentro del estado
            setVideojuegos(videojuegos)
        }).catch((e) => {
            console.log(e)
            alert("Algo ocurrió")
        })
    }, [])
    const eliminar = (key: string) => {
        if (confirm("¿Estás seguro de que deseas eliminar este videojuego?")) {
            eliminarVideojuego(key)
                .then(() => {
                    // Actualizar la lista de videojuegos después de eliminar
                    setVideojuegos(videojuegos.filter(v => v.key !== key))
                    alert("Videojuego eliminado con éxito")
                })
                .catch(() => alert("Error al eliminar el videojuego"))
        }
    }

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Compañía</th>
                        <th>Copias</th>
                        <th>Fecha</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        videojuegos.map((v) => {
                            return (
                                <tr key={v.key}>
                                    <td>{v.nombre}</td>
                                    <td>{v.compania}</td>
                                    <td>{v.copias}</td>
                                    <td>{v.fecha}</td>
                                    <td>
                                        <Link href={{ pathname: 'Pagina5', query: { key: v.key } }}>
                                            <Button variant='warning'><FaEdit /></Button>
                                        </Link>
                                        <Button variant='danger' onClick={() => eliminar(v.key!)}><MdDelete /></Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </>
    )
}

export default Pagina4