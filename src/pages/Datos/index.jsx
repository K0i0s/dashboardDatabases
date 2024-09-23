'use client'
import React, { useEffect, useState } from 'react'
import UserCard from '../../components/UserCard'

const Datos = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/profiles'); // Cambia la URL para obtener los perfiles
        const data = await response.json();
        setUsers(data); // Asume que el backend devuelve un array de usuarios
      } catch (e) {
        console.error('Error al hacer el fetch de los usuarios', e);
      }
    };

    fetchUsers();
  }, []);

  const styles = {
    container: {
      height: '96vh',
      width: '78vw',
      overflowY: 'scroll',
      backgroundColor: '#F2F2F2',
      padding: '2rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
    },
    noData: {
      textAlign: 'center',
      color: '#415A80',
    },
  }

  return (
    <div style={styles.container}>
      {users.length > 0 ? (
        users.map((user, index) => <UserCard key={index} user={user} />)
      ) : (
        <p style={styles.noData}>No hay usuarios registrados</p>
      )}
    </div>
  )
}

export default Datos;
