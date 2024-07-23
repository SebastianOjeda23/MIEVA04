import React, { useState } from 'react'
import  Form  from 'react-bootstrap/Form'
// import {Form} from 'react-bootstrap'

import { Button } from 'react-bootstrap';
export const Pagina2 = () => {
    const [numero1, setNumero1] = useState(0)
    const [numero2, setNumero2] = useState(0)
    const [resultado,setResultado] = useState(0)
    const getN1 = (valor:string)=>{
        const n1 = parseInt(valor);
        setNumero1(n1);
        handleSumar();
    }
    const getN2 = (valor:string)=>{
        const n2 = parseInt(valor);
        setNumero2(n2);
        handleSumar();
    }
    const handleSumar = ()=>{
        const t = numero1 + numero2
        setResultado(t)
    }
  return (
    <>
   
    <Form>
        <Form.Group className="mb-3" controlId="formBasicNombre">
            <Form.Label>Nombre:</Form.Label>
            <Form.Control type='text' placeholder='Ingrese un nombre' onChange={(e)=>getN1(e.currentTarget.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicApellido">
            <Form.Label>Apellido:</Form.Label>
            <Form.Control type='text' placeholder='Ingrese un apellido'  onChange={(e)=>getN2(e.currentTarget.value)}/>
        </Form.Group>
        <Button variant='primary' type='button' onClick={handleSumar}>Registrar</Button>
        <Form.Group className="mb-3" controlId="formBasicResultado">
            <Form.Label>Resultado:</Form.Label>
            <Form.Control type='text'   value={resultado}/>
        </Form.Group>
    </Form>



    </>
  )
}
export default Pagina2
