import React from 'react'
import { Link } from 'react-router-dom'
import styles from './navbar.module.css'

const Navbar = () => {
  return (
    <div className={styles.generalNavbarContainer}>
        <div className={styles.websiteNameContainer}>
            <h1 className={styles.dashboardName}>Dashboard</h1>
        </div>
        <nav className={styles.navbarContainer}>
            <ul className={styles.elementsNavbarContainer}>
                <li>
                  <Link to='/'>Inicio</Link>
                </li>
                <li>
                  <Link to='/form'>Formulario</Link>
                </li>
                <li>
                  <Link to='/data'>
                    Datos
                  </Link>
                </li>
                <li>
                  <Link to='/about'>
                    About
                  </Link>
                </li>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar