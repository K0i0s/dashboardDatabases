'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import MainContainer from '../../components/MainContainer.jsx';

const Form = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await fetch('http://localhost:3000/api/form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Error al enviar los datos');
            }

            console.log('El documento se ha escrito correctamente');
            reset();
        } catch (e) {
            console.error('Error agregando el documento:', e);
        }
    };

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
                            {...register('last_name', { required: 'Apellido paterno es obligatorio' })}
                        />
                        {errors.lastName && <p style={styles.error}>{errors.lastName.message}</p>}
                    </div>

                    <div style={styles.fieldContainer}>
                        <label htmlFor='materno' style={styles.label}>Apellido Materno</label>
                        <input
                            id='materno'
                            style={styles.input}
                            type="text"
                            {...register('mom_last_name', { required: 'Apellido materno es obligatorio' })}
                        />
                        {errors.momLastName && <p style={styles.error}>{errors.momLastName.message}</p>}
                    </div>

                    <button type="submit" style={styles.submitButton}>Registrarse</button>
                </form>
            </div>
        </MainContainer>
    );
};

export default Form;