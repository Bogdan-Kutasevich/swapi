import styles from './MenuBurger.module.css'
import React, {useState} from "react";
import burgerIcon from './Icon.png'
import {Link} from "react-router-dom";

const MenuBurger = () => {
    const[hideMenu, setHideMenu] = useState(true)
    const switchMenu = ()=> {
        setHideMenu(!hideMenu)
    }
    return (
        <div className={styles.MenuBurger}>
            <button onClick={switchMenu}>
                <img src={burgerIcon} alt="Menu"/>
            </button>
            {!hideMenu && <div className={styles.dropMenu}>
                <a href='https://www.starwars.com/'
                   target="_blank"
                   rel="noopener noreferrer"
                   className={styles.link}>
                    To Official Site
                </a>
                <Link to='/login' className={styles.link}>
                    Login
                </Link>
            </div>}
        </div>
    );
}

export default MenuBurger;