import styles from './Header.module.css'
import React from "react";
import MenuBurger from "./MenuBurger/MenuBurger";
import LogIn from "./LogIn/LogIn";

const Header = () => {
    return (
        <div className={styles.Header}>
            <MenuBurger/>
            <button>Home</button>
            <LogIn/>
        </div>
    );
}

export default Header;