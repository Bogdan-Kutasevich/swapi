import React from 'react';
import styles from './Logout.module.css'
import { auth} from "../../Base";
import { signOut } from "firebase/auth";
import {useNavigate} from "react-router-dom";



const Logout = () => {
    const navigate = useNavigate()
    const logOut = ()=>{
        signOut(auth);
        navigate("/")
    }
    const returnBack = ()=>{
        navigate("/")
    }

    return (
        <div className={styles.logoutWrapper}>
            <h1 className={styles.logoutTitle}>Are you sure?</h1>
            <div>
                <button className={styles.logoutBtn} onClick={logOut}>Yes</button>
                <button className={styles.logoutBtn} onClick={returnBack}>Back</button>
            </div>
        </div>
    );
};

export default Logout;