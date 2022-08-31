import React, {useEffect, useState} from 'react';
import styles from './Login.module.css'
import {useNavigate} from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Base";
import {Link} from "react-router-dom";
import {useInput} from '../../hooks/useInput'


const Login = () => {
    const [isValid, setValid] = useState('false')
    const navigate = useNavigate();
    const email = useInput(true)
    const password = useInput(true)

    useEffect(()=>{
        if(email.errorMessage || password.errorMessage){
            setValid(false)
        }else{
            setValid(true)
        }
    },[email.errorMessage, password.errorMessage])

    const login = (e)=>{
        e.preventDefault();
        signInWithEmailAndPassword(auth, email.inputValue, password.inputValue).catch((error) =>
            console.log(error)
        );
        navigate("/");
    }

    return (
        <div className={styles.loginWrapper}>
            <form className={styles.loginForm}>
                <h1 className={styles.formTitle}>Login</h1>
                <p className={styles.formText}>Write an e-mail</p>
                <input
                    type="text"
                    name='email'
                    value={email.inputValue}
                    placeholder='e-mail...'
                    className={styles.formInput}
                    onChange={email.handleInput}
                    onFocus={email.setClicked}
                />
                {(email.errorMessage && email.isClicked) && <div className={styles.errorInput}>
                    {email.errorMessage}
                </div>}
                <p className={styles.formText}>Write a password</p>
                <input
                    type="password"
                    name='password'
                    value={password.inputValue}
                    placeholder='password...'
                    className={styles.formInput}
                    onChange={password.handleInput}
                    onFocus={password.setClicked}
                />
                {(password.errorMessage && password.isClicked) && <div className={styles.errorInput}>
                    {password.errorMessage}
                </div>}
                <button type="submit" disabled={!isValid} className={isValid ? styles.formButton:styles.formButtonDisabled} onClick={login}>Login</button>
                <Link to='/signUp' className={styles.loginSignUp}>Not registred yet click to Sign Up</Link>
            </form>
        </div>
    );
};

export default Login;