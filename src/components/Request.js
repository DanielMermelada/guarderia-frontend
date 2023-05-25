import React, { useState } from 'react'
import { Divider } from './Divider';
import pug from './componentResource/pug.png';

export const Request = () => {
    const [tuNombre, setTunombre] = useState('');
    const [nombreMascota, setMascota] = useState('');
    const [fechaDeseada, setFecha] = useState('');
  return (
    <div>
    <p><Divider /></p>
    <img style={{ width: 200, height: 200 }} src={pug} className="App-pug" alt="pug" />
    <p>Resultados... {tuNombre} {nombreMascota} {fechaDeseada}</p>
    <p><Divider /></p>
    </div>
  )
}
