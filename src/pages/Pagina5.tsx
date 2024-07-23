import { actualizarVideojuego, obtenerVideojuego } from '@/Firebase/Promesas'
import { Videojuego } from '@/Interfaces/IVideojuegos'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'

const initialState: Videojuego = {
    nombre: "",
    compania: "",
    copias: 0,
    fecha: "",
    distribuidora: "",
    genero: "",
    precio: 0,
    duracion: "",
    key: ""
}

export const Pagina5 = () => {
    const router = useRouter()
    const [videojuego, setVideojuego] = useState<Videojuego>(initialState)

    const handleVideojuego = (name: string, value: string | number) => {
        setVideojuego({ ...videojuego, [name]: value })
    }

    useEffect(() => {
        const key = router.query.key;
        if (key !== undefined && typeof key === "string") {
            obtenerVideojuego(key).then((v) => {
                if (v !== undefined) {
                    setVideojuego(v)
                } else {
                    // Volver a la tabla si no se encuentra el videojuego
                    router.push('/Pagina4')
                }
            }).catch(() => {
                // Volver a la tabla en caso de error
                router.push('/Pagina4')
            })
        } else {
            // Volver a la tabla si no se proporciona una clave
            router.push('/Pagina4')
        }
    }, [router.query.key, router])

    const modificar = () => {
        actualizarVideojuego(videojuego).then(() => {
            alert("Se actualizó con éxito")
        }).catch((e) => {
            console.log(e)
            alert("Algo ocurrió")
        })
    }

    return (
        <>
            <Form>
                <Form.Group>
                    <Form.Label>Nombre del Juego:</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Ingrese el nombre del juego: '
                        value={videojuego.nombre}
                        name="nombre"
                        onChange={(e) => { handleVideojuego(e.currentTarget.name, e.currentTarget.value) }} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Compañía:</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Ingrese la compañía: '
                        value={videojuego.compania}
                        name="compania"
                        onChange={(e) => { handleVideojuego(e.currentTarget.name, e.currentTarget.value) }} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Copias:</Form.Label>
                    <Form.Control
                        type='number'
                        placeholder='Ingrese el número de copias: '
                        value={videojuego.copias}
                        name="copias"
                        onChange={(e) => { handleVideojuego(e.currentTarget.name, Number(e.currentTarget.value)) }} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Fecha:</Form.Label>
                    <Form.Control
                        type='date'
                        placeholder='Ingrese la fecha de lanzamiento: '
                        value={videojuego.fecha}
                        name="fecha"
                        onChange={(e) => { handleVideojuego(e.currentTarget.name, e.currentTarget.value) }} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Distribuidora:</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Ingrese la empresa distribuidora: '
                        name="distribuidora"
                        value={videojuego.distribuidora}
                        onChange={(e) => { handleVideojuego(e.currentTarget.name, e.currentTarget.value) }} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Genero:</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Ingrese el género: '
                        name="genero"
                        value={videojuego.genero}
                        onChange={(e) => { handleVideojuego(e.currentTarget.name, e.currentTarget.value) }} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Precio:</Form.Label>
                    <Form.Control
                        type='number'
                        placeholder='Ingrese el precio: '
                        name="precio"
                        value={videojuego.precio}
                        onChange={(e) => { handleVideojuego(e.currentTarget.name, Number(e.currentTarget.value)) }} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Duración:</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Ingrese la duración del juego: '
                        name="duracion"
                        value={videojuego.duracion}
                        onChange={(e) => { handleVideojuego(e.currentTarget.name, e.currentTarget.value) }} />
                </Form.Group>
                <Button type="button" variant='success' onClick={modificar}>Modificar</Button>
            </Form>
        </>
    )
}

export default Pagina5