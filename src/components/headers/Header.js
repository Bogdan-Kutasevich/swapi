import styles from './Header.module.css'
import React, {useEffect, useState, useContext} from "react";
import MenuBurger from "./MenuBurger/MenuBurger";
import logo from './logo.png'
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/authContext";
import { db } from "../../Base";
import { ref, onValue } from "firebase/database";




const Header = () => {
    const { currentUser } = useContext(AuthContext);
    const [up, setUp] = useState(false)
    const [username, setUsername] = useState("");

    useEffect(() => {
        if (currentUser) {
            const starCountRef = ref(db, "users/" + currentUser.uid);
            onValue(starCountRef, (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    setUsername(data.firstName + " " + data.lastName);
                }
            });
        }
    }, [currentUser]);


    const scrollHandler = ()=>{
        if(window.scrollY>350){
            setUp(true)
        }else{
            setUp(false)
        }

    }
    const toUp = ()=>{
        window.scroll(0,0)
        console.log('hi')
    }

    useEffect(()=>{
        window.addEventListener('scroll', scrollHandler)
    },[])

    return (
        <div className={styles.headerContainer}>
            <div className={styles.Header}>
                <MenuBurger user={currentUser}/>
                <div className={styles.navMenu}>
                    <Link to='/'><img src={logo} alt="logo"/></Link>
                    <div className={styles.headerToOficialSite}>
                        <a href='https://www.starwars.com/'
                           target="_blank"
                           rel="noopener noreferrer">
                            To Official Site
                        </a>
                    </div>
                    <div className={styles.loginWrraper}>
                        {currentUser && <div className={styles.loginWelcome}>Welcome, {username}</div>}
                        {currentUser && <Link to='/myPage' className={styles.login}>My Page</Link>}
                        {!currentUser && <Link to='/signUp' className={styles.login}>Sign Up</Link>}
                        <Link to={currentUser ? '/logout': '/login'} className={styles.login}>
                            {currentUser ? 'Log Out' : 'Log In'}
                        </Link>
                    </div>
                </div>
            </div>
            {up&&<div className={styles.up} onClick={toUp}>
                UP
            </div>}
        </div>
    );
}

export default Header;