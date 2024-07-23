import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Videojuego } from '@/Interfaces/IVideojuegos'
import { registrarVideojuego } from '@/Firebase/Promesas'

const initialState: Videojuego = {
    nombre: "",
    compania: "",
    copias: 0,
    fecha: "",
    direccion:"",
}

export const PaginaVideojuegos = () => {
    const [videojuego, setVideojuego] = useState<Videojuego>(initialState)
    
    const handleVideojuego = (name: string, value: string | number) => {
        setVideojuego({ ...videojuego, [name]: value })
    }

    const registrar = () => {
        registrarVideojuego(videojuego).then(() => {
            alert("Se logró registrar el videojuego")
        }).catch((e) => {
            console.log(e);
            alert("Algo ocurrió")
        })
    }

    return (
        <>
            <Form>
                <Form.Group>
                    <Form.Label>Nombre del Juego:</Form.Label>
                    <Form.Control type='text' placeholder='Ingrese el nombre del juego: '
                        name="nombre"
                        value={videojuego.nombre}
                        onChange={(e) => { handleVideojuego(e.currentTarget.name, e.currentTarget.value) }} />
                    <Form.Text></Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Compañía:</Form.Label>
                    <Form.Control type='text' placeholder='Ingrese la compañía: '
                        name="compania"
                        value={videojuego.compania}
                        onChange={(e) => { handleVideojuego(e.currentTarget.name, e.currentTarget.value) }} />
                    <Form.Text></Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Copias:</Form.Label>
                    <Form.Control type='number' placeholder='Ingrese el número de copias: '
                        name="copias"
                        value={videojuego.copias}
                        onChange={(e) => { handleVideojuego(e.currentTarget.name, Number(e.currentTarget.value)) }} />
                    <Form.Text></Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Fecha salida:</Form.Label>
                    <Form.Control type='date' placeholder='Ingrese la fecha de lanzamiento: '
                        name="fecha"
                        value={videojuego.fecha}
                        onChange={(e) => { handleVideojuego(e.currentTarget.name, e.currentTarget.value) }} />
                    <Form.Text></Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Direccion:</Form.Label>
                    <Form.Control type='textarea' placeholder='Ingrese la direccion de su casa: '
                        name="direccion"
                        value={videojuego.direccion}
                        onChange={(e) => { handleVideojuego(e.currentTarget.name, e.currentTarget.value) }} />
                    <Form.Text></Form.Text>
                </Form.Group>
                <Button type="button" variant='success'
                    onClick={registrar}>Registrar</Button>
            </Form>
        </>
    )
}

export default PaginaVideojuegos