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
    direccion:"",
    key: ""
}

export const Pagina5 = () => {
    const router = useRouter()
    const [videojuego, setVideojuego] = useState<Videojuego>(initialState)

    const handleVideojuego = (name: string, value: string) => {
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
                        onChange={(e) => { handleVideojuego(e.currentTarget.name, e.currentTarget.value) }} />
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
                    <Form.Label>Direccion:</Form.Label>
                    <Form.Control type='textarea' 
                        placeholder='Ingrese la direccion de su casa: '
                        name="direccion"
                        value={videojuego.direccion}
                        onChange={(e) => { handleVideojuego(e.currentTarget.name, e.currentTarget.value) }} />
                    <Form.Text></Form.Text>
                </Form.Group>
                <Button type="button" variant='success' onClick={modificar}>Modificar</Button>
            </Form>
        </>
    )
}

export default Pagina5