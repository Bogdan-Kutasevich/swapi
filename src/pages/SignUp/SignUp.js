import React, {useEffect, useState} from 'react';
import styles from './SignIn.module.css'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../Base";
import { ref, set } from "firebase/database";
import {useInput} from "../../hooks/useInput";

const SignUp = () => {
    const [isValid, setValid] = useState('false')
    const navigate = useNavigate();
    const email = useInput(true)
    const password = useInput(true)
    const firstName = useInput(false)
    const lastName = useInput(false)

    useEffect(()=>{
        if(email.errorMessage || password.errorMessage || !firstName.inputValue || !lastName.inputValue ){
            setValid(false)
        }else{
            setValid(true)
        }
    },[email.errorMessage, password.errorMessage, firstName.inputValue, lastName.inputValue])


    const handleSubmit = (e)=>{
        e.preventDefault()
        createUserWithEmailAndPassword(auth, email.inputValue, password.inputValue)
            .then((userCredential) => {
                set(ref(db, "users/" + userCredential.user.uid), {
                    firstName: firstName.inputValue,
                    lastName: lastName.inputValue,
                    email: email.inputValue,
                    cardsList:[]
                });
            })
            .catch((error) => console.log(error));
        navigate("/");
    }

    return (
        <div className={styles.loginWrapper}>
            <form className={styles.loginForm}>
                <h1 className={styles.formTitle}>Register</h1>
                <p className={styles.formText}>FirstName</p>
                <input type="text" name='firstName' value={firstName.inputValue} placeholder='firstName...' className={styles.formInput} onChange={firstName.handleInput}/>
                <p className={styles.formText}>Last Name</p>
                <input type="text" name='lastName' value={lastName.inputValue} placeholder='lastName...' className={styles.formInput} onChange={lastName.handleInput}/>
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
                <button type="submit" disabled={!isValid} className={isValid ? styles.formButton:styles.formButtonDisabled} onClick={handleSubmit}>Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;