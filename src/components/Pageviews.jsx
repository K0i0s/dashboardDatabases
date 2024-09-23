import React, {useState, useEffect} from 'react';

const Pageviews = () => {
    const [pageviews, setPageviews] = useState(null);

    const style = {
        container : {
        display: 'flex',
        justifyContent: 'spaceEvenly',
        alignItems: 'center',
        flexDirection: 'column',
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
        },
        mainText:{
        fontWeight: 200,
        textAlign: 'center',
        fontSize: '16px'
        },
        numberDeco:{
        fontSize: '24px',
        textAlign: 'center',
        fontWeight: 700
        }
    }

    return (
    <div style={style.container}>
        <div style={style.split}>
            <h3 style={style.mainText}>Visitas a la pagina web</h3>
            <h2 style={style.numberDeco}>{pageviews}</h2>
        </div>
    </div>
  )
}

export default Pageviews