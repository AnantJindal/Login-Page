import React from 'react'
import style from './Navbar.module.css'
import Logo from '../../assests/Logo.svg'

const Navbar = () => {
    return (
        <>
            <header>
                <div className={style.container}>
                    <div className={style.imgContainer}>
                        <img src={Logo} alt="Logo" />
                    </div>
                </div>
            </header>
        </>
    )
}

export default Navbar