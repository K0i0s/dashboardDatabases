'use client'
import React, { useEffect, useState} from 'react'
import UserCard from '../../components/UserCard'
import { db } from '../../services/firebase'
import { collection, getDocs } from 'firebase/firestore'

const Datos = () => {
  const [users,setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async() =>{
    try{
        const querySnap = await getDocs(collection(db,"users"))
        const usersData = querySnap.docs.map((doc) => doc.data())
        setUsers(usersData)
    } catch(e){
        console.error('Error al hacer el fetch de los usuarios', e);
    }}

    fetchUsers()
  }, [])

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
        {users.length>0?(
            users.map((user,index) => <UserCard key={index} user ={user}/>)
        ):(
            <p style={styles.noData}>No hay usuarios registrados</p>
        )}
    </div>
  )
}

export default Datos