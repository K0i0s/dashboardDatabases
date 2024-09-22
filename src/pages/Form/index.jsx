'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { db } from '../../services/firebase.js'
import { collection, addDoc } from 'firebase/firestore'
import MainContainer from '../../components/MainContainer.jsx'

const Form = () => {
    const { register, handleSubmit, reset, formState: { errors }} = useForm()

    const onSubmit = async (data) => {
        try {
            await addDoc(collection(db,"users"), data)
            console.log('El documento se ha escrito correctamente');
            reset();
        } catch (e) {
            console.error('Error agregando el documento:',e);
        }
    }

    const styles = {
        container: {
          color: '#415A80',
          padding: '4rem 6rem',
          borderRadius: '0.5rem',
        },
        form: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
        title: {
          fontSize: '3rem',
          paddingBottom: '2rem',
          textAlign: 'center',
          textTransform: 'uppercase',
          fontWeight: 'bold',
        },
        fieldContainer: {
          display: 'flex',
          flexDirection: 'column',
          marginBottom: '1rem',
          width: '100%',
        },
        label: {
          textAlign: 'left',
          marginBottom: '0.5rem',
        },
        input: {
          height: '2rem',
          borderRadius: '0.25rem',
          padding: '0.5rem',
          border: '1px solid #ccc',
        },
        submitButton: {
          backgroundColor: '#415A80',
          color: '#F2F2F2',
          width: '8rem',
          height: '3rem',
          marginTop: '1rem',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          borderRadius: '0.25rem',
          cursor: 'pointer',
        },
        error: {
          color: 'red',
          fontSize: '0.875rem',
        },
      };

    return (
        <MainContainer>
        <div style={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
          <h3 style={styles.title}>Registrate</h3>
          
          <div style={styles.fieldContainer}>
            <label htmlFor='nombre' style={styles.label}>Nombre</label>
            <input
              id='nombre'
              style={styles.input}
              type="text"
              {...register('nombre', { required: 'Nombre es obligatorio' })}
            />
            {errors.nombre && <p style={styles.error}>{errors.nombre.message}</p>}
          </div>
  
          <div style={styles.fieldContainer}>
            <label htmlFor='paterno' style={styles.label}>Apellido Paterno</label>
            <input
              id='paterno'
              style={styles.input}
              type="text"
              {...register('lastName', { required: 'Apellido paterno es obligatorio' })}
            />
            {errors.lastName && <p style={styles.error}>{errors.lastName.message}</p>}
          </div>
  
          <div style={styles.fieldContainer}>
            <label htmlFor='materno' style={styles.label}>Apellido Materno</label>
            <input
              id='materno'
              style={styles.input}
              type="text"
              {...register('momLastName', { required: 'Apellido materno es obligatorio' })}
            />
            {errors.momLastName && <p style={styles.error}>{errors.momLastName.message}</p>}
          </div>
  
          <div style={styles.fieldContainer}>
            <label htmlFor='email' style={styles.label}>Correo</label>
            <input
              id='email'
              style={styles.input}
              type="email"
              {...register('email', { required: 'Correo es obligatorio' })}
            />
            {errors.email && <p style={styles.error}>{errors.email.message}</p>}
          </div>
  
          <div style={styles.fieldContainer}>
            <label htmlFor='birth' style={styles.label}>Fecha de nacimiento</label>
            <input
              id='birth'
              style={styles.input}
              type="date"
              {...register('birthday', { required: 'Fecha de nacimiento es obligatoria' })}
            />
            {errors.birthday && <p style={styles.error}>{errors.birthday.message}</p>}
          </div>
  
          <div style={styles.fieldContainer}>
            <label htmlFor='gender' style={styles.label}>Género</label>
            <select
              id='gender'
              style={styles.input}
              {...register('gender', { required: 'Género es obligatorio' })}
            >
              <option value="">Seleccione su género</option>
              <option value="male">Masculino</option>
              <option value="female">Femenino</option>
              <option value="other">Otro</option>
            </select>
            {errors.gender && <p style={styles.error}>{errors.gender.message}</p>}
          </div>
  
          <button type="submit" style={styles.submitButton}>Registrarse</button>
        </form>
      </div>
      </MainContainer>
  )
}

export default Form