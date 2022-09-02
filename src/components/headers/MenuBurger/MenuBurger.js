import styles from './MenuBurger.module.css'
import React, {useState} from "react";
import {Link} from "react-router-dom";
import logo from "../logo.png";

const MenuBurger = ({user}) => {
    const[hideMenu, setHideMenu] = useState(true)
    const switchMenu = ()=> {
        setHideMenu(!hideMenu)
    }
    return (
        <div className={styles.MenuBurger}>
            <button className={styles.MenuBurgerBtn} onClick={switchMenu}>
                <span></span>
                <span></span>
                <span></span>
            </button>
            <img className={styles.MenuBurgerImg} src={logo} alt="logo"/>
            {!hideMenu && <div className={styles.dropMenu}>
                <a href='https://www.starwars.com/'
                   target="_blank"
                   rel="noopener noreferrer"
                   className={styles.link}
                   onClick={switchMenu}>
                    To Official Site
                </a>
                <Link to='/' className={styles.link} onClick={switchMenu}>
                    Home
                </Link>
                {!user && <Link to='/login' className={styles.link} onClick={switchMenu}>
                    Login
                </Link>}
                {!user && <Link to='/signUp' className={styles.link} onClick={switchMenu}>
                    Sign Up
                </Link>}
                {user && <Link to='/logout' className={styles.link} onClick={switchMenu}>
                    Logout
                </Link>}
                {user && <Link to='/myPage' className={styles.link} onClick={switchMenu}>
                    My Page
                </Link>}
            </div>}
        </div>
    );
}

export default MenuBurger;