import styles from './Header.module.css'
import React, {useEffect, useState, useContext} from "react";
import MenuBurger from "./MenuBurger/MenuBurger";
import logo from './logo.png'
import arrow from './arrow.png'
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/authContext";
import { db } from "../../Base";
import { ref, onValue } from "firebase/database";




const Header = () => {
    const { currentUser } = useContext(AuthContext);
    const [burger, setBurger] = useState(false)
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
        }else if(window.scrollY>80){
            setBurger(true)
        }else{
            setUp(false)
            setBurger(false)
        }

    }
    const toUp = ()=>{
        window.scroll(0,0)
    }

    useEffect(()=>{
        window.addEventListener('scroll', scrollHandler)
    },[])

    return (
        <div className={styles.headerContainer}>
            <div className={burger?styles.burgerHeader:styles.Header}>
                { burger && <MenuBurger className={styles.menuBurger}/> }
                { !burger && <div className={styles.navMenu}>
                    <Link to='/'><img src={logo} alt="logo"/></Link>
                    <div className={styles.header_home}>
                        <a href='https://www.starwars.com/'
                           target="_blank"
                           rel="noopener noreferrer">
                            To Official Site
                        </a>
                    </div>
                    <div className={styles.loginWrraper}>
                        {currentUser && <div className={styles.loginWelcome}>Welcome, {username}</div>}
                        {!currentUser && <Link to='/signUp' className={styles.login}>SIGN UP</Link>}
                        <Link to={currentUser ? '/logout': '/login'} className={styles.login}>
                            {currentUser ? 'Log Out' : 'Log In'}
                        </Link>
                    </div>
                </div>}
            </div>
            {up&&<div className={styles.up}>
                <img src={arrow} alt="UP" onClick={toUp}/>
            </div>}
        </div>
    );
}

export default Header;