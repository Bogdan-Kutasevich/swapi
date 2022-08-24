import React, {useState} from 'react';
import styles from './Login.module.css'
import {useNavigate} from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Base";


const Login = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        email:'',
        password:''
    })

    const handleInput = (e)=>{
        setInput((prev)=>{
            return {...prev, [e.target.name]:e.target.value}
        })
    }

    const login = (e)=>{
        e.preventDefault();
        signInWithEmailAndPassword(auth, input.email, input.password).catch((error) =>
            console.log(error)
        );
        navigate("/");
    }

    return (
        <div className={styles.loginWrapper}>
            <form className={styles.loginForm}>
                <h1 className={styles.formTitle}>Login</h1>
                <p className={styles.formText}>Write an e-mail</p>
                <input type="text" name='email' value={input.email} placeholder='e-mail...' className={styles.formInput} onChange={handleInput}/>
                <p className={styles.formText}>Write a password</p>
                <input type="password" name='password' value={input.password} placeholder='password...' className={styles.formInput} onChange={handleInput}/>
                <button type="submit" className={styles.formButton} onClick={login}>Login</button>
            </form>
        </div>
    );
};

export default Login;