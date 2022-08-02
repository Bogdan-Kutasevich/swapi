import styles from './Header.module.css'
import React, {useEffect, useState} from "react";
import MenuBurger from "./MenuBurger/MenuBurger";
import logo from './header.svg'
import arrow from './arrow.png'
import {Link} from "react-router-dom";


const Header = () => {
    const [burger, setBurger] = useState(false)
    const [up, setUp] = useState(false)
    const [modal, setModal] = useState((false))

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
                    <button
                        to='login'
                        className={styles.login}
                        onClick={()=>setModal(!modal)}
                    >
                        Login
                    </button>

                </div>}
            </div>
            {up&&<div className={styles.up}>
                <img src={arrow} alt="UP" onClick={toUp}/>
            </div>}
            {modal && <div className={styles.modal} onClick={()=>setModal(false)}>
                <div className={styles.modal_content} onClick={e=>e.stopPropagation()}>
                    login form
                </div>
            </div>}
        </div>
    );
}

export default Header;