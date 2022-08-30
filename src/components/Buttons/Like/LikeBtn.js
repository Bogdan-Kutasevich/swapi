import React, {useEffect, useState, useContext} from 'react';
import styles from './LikeBtn.module.css'
import {ref, set, onValue, push, update} from "firebase/database";
import {db} from "../../../Base";
import {AuthContext} from "../../../context/authContext";


const LikeBtn = ({itemTitle}) => {
    const[countOfLike, setCountOfLIke] = useState(0)
    const[btnCondition, setBtnCondition] = useState(false)
    const { currentUser } = useContext(AuthContext);

    useEffect(()=>{
        if(itemTitle){
            onValue(ref(db, 'cards/' + itemTitle), (snapshot) => {
                setCountOfLIke((snapshot.val()).countOfLike)
            });
        }
    },[itemTitle])

    useEffect(()=>{
        if(currentUser){
            onValue(ref(db, 'cards/'  + itemTitle + '/userLikeList'), (snapshot) => {
                if(snapshot.val()){
                    const listOfUser = Object.values(snapshot.val());
                    if(listOfUser.includes(currentUser.uid)){
                        setBtnCondition(false)
                    }
                }else{
                    setBtnCondition(true)
                }
            })
        }
    },[currentUser, itemTitle])


    const addLike = ()=>{
        if(currentUser){
            setBtnCondition(true)
            const newUrlRef = push(ref(db, 'cards/'  + itemTitle + '/userLikeList'));
            set(newUrlRef, currentUser.uid);
            setCountOfLIke((prev)=>{
                update(ref(db, "cards/" + itemTitle), {
                    countOfLike: prev+1,
                })
                return prev+1
            })
            setBtnCondition(false)
        }
    }

    return (
        <>
            {btnCondition && <button className={styles.LikeBtn} onClick={addLike}>
                Likes: {countOfLike}
            </button>}
            {!btnCondition && <button className={styles.LikeBtnDisabled} disabled>
                Likes: {countOfLike}
            </button>}

        </>

    );
};

export default LikeBtn;