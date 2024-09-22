import React from 'react'

const MainContainer = ({children}) => {
    const style = {
        width: '80vw',
        height: '100vh',
        backgroundColor:'#F2F2F2'
    }
    return (
        <div style={style}>
            {children}
        </div>
    )
}

export default MainContainer