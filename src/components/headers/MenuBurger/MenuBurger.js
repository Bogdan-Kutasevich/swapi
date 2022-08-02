import styles from './header.module.css'
import React from "react";

const Header = () => {
    return (
        <div className={styles.Header}>
            <MenuBurger/>
            <button>Home</button>
        </div>
    );
}

export default Header;