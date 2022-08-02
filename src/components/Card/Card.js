import React from 'react';
import styles from './Card.module.css'

const Card = ({children}) => {
    return (
        <div className={styles.mainCard}>
            <img src="./img/logo.png" alt="avatar"/>
            <div className={styles.children}>{children}</div>
            <button>Read more...</button>
        </div>
    );
};

export default Card;