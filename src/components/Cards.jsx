import React from 'react'

const Cards = () => {
  const style = {
    container : {
      display: 'flex',
      justifyContent: 'spaceEvenly',
      alignItems: 'center',
      flexDirection: 'row',
      width: '20vw',
      height: '20vh',
      marginTop: '3rem',
      marginBottom: '3rem',
      backgroundColor: '#E4E4E4',
      color: '#415A80',
      borderRadius: '0.75rem'
    },
    split: {
      display: 'flex',
      flexDirection: 'column'
    }
  }
  return (
    <div style={style.container}>
      <div style={style.split}>
        <h2>
          
        </h2>
      </div>
    </div>
    )
}

export default Cards