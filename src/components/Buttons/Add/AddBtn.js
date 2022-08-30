import React, {useEffect, useState} from 'react';
import styles from './addBtn.module.css'
import {ref, set, push, onValue} from "firebase/database";
import {db} from "../../../Base";
import {useContext} from "react";
import {AuthContext} from "../../../context/authContext";
import {useNavigate} from "react-router-dom";

const AddBtn = ({item}) => {
    const { currentUser } = useContext(AuthContext);
    const [isCardAdded, setIsCardAdded] = useState(false)
    const [isUserLogin, setIsUserLogin] = useState(false)
    const navigate = useNavigate()

    useEffect(()=>{
        if (currentUser) {
            setIsUserLogin(true)
            onValue(ref(db, "users/" + currentUser.uid + '/cardsList'), (snapshot) => {

                if(snapshot.exists()){
                    const list = Object.values(snapshot.val());
                    if(list.includes(item.url)){
                        setIsCardAdded(true)
                    }
                }
            }, {
                onlyOnce: true
            });
        }else{
            setIsUserLogin(false)
        }
    },[item,currentUser])

    const addCard = ()=>{
        if (currentUser) {
            const newUrlRef = push(ref(db, "users/" + currentUser.uid + '/cardsList'));
            set(newUrlRef, item.url);
            setIsCardAdded(true)
        }
    }

    const loginFirst = ()=>{
        navigate("/login")
    }

    return (
        <>
            {(isUserLogin && !isCardAdded) && <button className={styles.addBtn} onClick={addCard}>
                Add +
            </button>}
            {(isUserLogin && isCardAdded) && <button className={styles.wasAddBtn}>
                Cards added
            </button>}
            {!isUserLogin && <button className={styles.addBtnDisabled} onClick={loginFirst}>
                Login to add
            </button>}

        </>

    );
};

export default AddBtn;

