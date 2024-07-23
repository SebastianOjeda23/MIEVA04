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
    distribuidora:"",
}

export const PaginaVideojuegos = () => {
    const [videojuego, setVideojuego] = useState<Videojuego>(initialState)
    const [errors, setErrors] = useState<{ [key: string]: string }>({})

    const handleVideojuego = (name: string, value: string | number) => {
        setVideojuego({ ...videojuego, [name]: value })
    }

    const validate = () => {
        const newErrors: { [key: string]: string } = {}
        if (!videojuego.nombre) newErrors.nombre = "El nombre del juego es obligatorio."
        if (!videojuego.compania) newErrors.compania = "La compañía es obligatoria."
        if (videojuego.copias <= 0) newErrors.copias = "Debe ingresar un número de copias mayor a 0."
        if (!videojuego.fecha) newErrors.fecha = "La fecha de salida es obligatoria."
        if (!videojuego.distribuidora) newErrors.distribuidora = "La distribuidora es obligatoria."

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const registrar = () => {
        if (!validate()) return

        registrarVideojuego(videojuego).then(() => {
            alert("Se logró registrar el videojuego")
            setVideojuego(initialState)  // Limpiar el formulario después de registrar
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
                    {errors.nombre && <Form.Text className="text-danger">{errors.nombre}</Form.Text>}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Compañía:</Form.Label>
                    <Form.Control type='text' placeholder='Ingrese la compañía: '
                        name="compania"
                        value={videojuego.compania}
                        onChange={(e) => { handleVideojuego(e.currentTarget.name, e.currentTarget.value) }} />
                    {errors.compania && <Form.Text className="text-danger">{errors.compania}</Form.Text>}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Copias:</Form.Label>
                    <Form.Control type='number' placeholder='Ingrese el número de copias: '
                        name="copias"
                        value={videojuego.copias}
                        onChange={(e) => { handleVideojuego(e.currentTarget.name, Number(e.currentTarget.value)) }} />
                    {errors.copias && <Form.Text className="text-danger">{errors.copias}</Form.Text>}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Fecha salida:</Form.Label>
                    <Form.Control type='date' placeholder='Ingrese la fecha de lanzamiento: '
                        name="fecha"
                        value={videojuego.fecha}
                        onChange={(e) => { handleVideojuego(e.currentTarget.name, e.currentTarget.value) }} />
                    {errors.fecha && <Form.Text className="text-danger">{errors.fecha}</Form.Text>}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Distribuidora:</Form.Label>
                    <Form.Control type='text' placeholder='Ingrese la empresa distribuidora: '
                        name="distribuidora"
                        value={videojuego.distribuidora}
                        onChange={(e) => { handleVideojuego(e.currentTarget.name, e.currentTarget.value) }} />
                    {errors.distribuidora && <Form.Text className="text-danger">{errors.distribuidora}</Form.Text>}
                </Form.Group>
                <Button type="button" variant='success'
                    onClick={registrar}>Registrar</Button>
            </Form>
        </>
    )
}

export default PaginaVideojuegos