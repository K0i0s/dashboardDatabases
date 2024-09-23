import React from 'react'

const UserCard = ({ user }) => {
    const { nombre, last_name, mom_last_name} = user

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
            <p>Apellido Paterno: {last_name}</p>
            <p>Apellido Materno: {mom_last_name}</p>
        </div>
    )
}

export default UserCard