import React from 'react';
import styles from './addBtn.module.css'
import {ref, set, push, onValue} from "firebase/database";
import {db} from "../../../Base";
import {useContext} from "react";
import {AuthContext} from "../../../context/authContext";

const AddBtn = ({item}) => {
    const { currentUser } = useContext(AuthContext);
    const addCard = (url)=>{
        if (currentUser) {
            onValue(ref(db, "users/" + currentUser.uid + '/cardsList'), (snapshot) => {
                const list = Object.values(snapshot.val());
                if(list.includes(url)){
                    return null
                }else{
                    const newUrlRef = push(ref(db, "users/" + currentUser.uid + '/cardsList'));
                    set(newUrlRef, url);
                }
            }, {
                onlyOnce: true
            });
        }
    }
    return (
        <button className={styles.addBtn} onClick={()=>(addCard(item.url))}>
           Add +
        </button>
    );
};

export default AddBtn;

