import React, {useEffect, useState} from 'react';
import styles from './LikeBtn.module.css'
import {ref, set, onValue} from "firebase/database";
import {db} from "../../../Base";


const LikeBtn = ({itemTitle}) => {
    const[countOfLike, setCountOfLIke] = useState(0)

    useEffect(()=>{

        if(itemTitle){
            onValue(ref(db, 'cards/' + itemTitle), (snapshot) => {
                setCountOfLIke((snapshot.val()).countOfLike)
                console.log((snapshot.val()).countOfLike)
            });
        }
    },[itemTitle])

    const addLike = ()=>{
        setCountOfLIke((prev)=>{
            set(ref(db, "cards/" + itemTitle), {
                countOfLike: prev+1,
                comments: []
            })
            return prev+1
        })
    }

    return (
        <>
            <button className={styles.LikeBtn} onClick={addLike}>
                Likes: {countOfLike}
            </button>

        </>

    );
};

export default LikeBtn;