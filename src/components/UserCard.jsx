import React from 'react'

const UserCard = ({ user }) => {
    const { nombre, lastName, momLastName, email, birthday, gender} = user

    const style = {
        userCard:{
            backgroundColor: '#E4E4E4',
            color: '415A80',
            padding: '1rem 4rem',
            borderRadius: '0.5rem',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)'
        }
    }

    return (
        <div style={style.userCard}>
            <p>Nombre: {nombre}</p>
            <p>Apellido Paterno: {lastName}</p>
            <p>Apellido Materno: {momLastName}</p>
            <p>Correo: {email}</p>
            <p>Genero: {gender}</p>
            <p>Fecha de nacimiento: {birthday}</p>
        </div>
    )
}

export default UserCard