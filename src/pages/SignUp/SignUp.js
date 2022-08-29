import React, {useState} from 'react';
import styles from './SignIn.module.css'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../Base";
import { ref, set } from "firebase/database";

const SignUp = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        email:'',
        password:'',
        firstName:'',
        lastName:''
    })

    const handleInput = (e)=>{
        setInput((prev)=>{
            return {...prev, [e.target.name]:e.target.value}
        })
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        createUserWithEmailAndPassword(auth, input.email, input.password)
            .then((userCredential) => {
                set(ref(db, "users/" + userCredential.user.uid), {
                    firstName: input.firstName,
                    lastName: input.lastName,
                    email: input.email,
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
                <input type="text" name='firstName' value={input.firstName} placeholder='firstName...' className={styles.formInput} onChange={handleInput}/>
                <p className={styles.formText}>Last Name</p>
                <input type="text" name='lastName' value={input.lastName} placeholder='lastName...' className={styles.formInput} onChange={handleInput}/>
                <p className={styles.formText}>Write an e-mail</p>
                <input type="text" name='email' value={input.email} placeholder='e-mail...' className={styles.formInput} onChange={handleInput}/>
                <p className={styles.formText}>Write a password</p>
                <input type="password" name='password' value={input.password} placeholder='password...' className={styles.formInput} onChange={handleInput}/>
                <button type="submit" className={styles.formButton} onClick={handleSubmit}>SignUp</button>
            </form>
        </div>
    );
};

export default SignUp;