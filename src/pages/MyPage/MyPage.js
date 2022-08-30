import React from 'react';
import {useContext, useEffect, useState} from "react";
import styles   from './MyPage.module.css'
import {onValue, ref} from "firebase/database";
import {db} from "../../Base";
import {AuthContext} from "../../context/authContext";
import MyPageCard from "../../components/myPageCards/MyPageCard";
import Details from "../../components/Details/Details";

const MyPage = () => {
    const { currentUser } = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState({});
    const [details, setDetails] = useState([])
    const [animationCard, setAnimationCard] = useState(false)

    useEffect(() => {
        if (currentUser) {
            const starCountRef = ref(db, "users/" + currentUser.uid);
            onValue(starCountRef, (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    setUserInfo(data);
                }
            });
        }
    }, [currentUser]);

    return (
        <div className={styles.myPageWrraper}>
            {!userInfo.cardsList && <h1 className={styles.title}>You have no cards yet</h1>}
            {userInfo.cardsList && <h1 className={styles.title}>{userInfo.firstName} {userInfo.lastName}'s сollection</h1>}
            {userInfo.cardsList && <Details details={details} animationCard={animationCard} />}
            {userInfo && <div className={styles.collectionWrapper}>
                {userInfo.cardsList && Object.values(userInfo.cardsList).map((url)=>{
                    return <MyPageCard url={url}
                                       setDetails={setDetails}
                                       setAnimationCard={setAnimationCard}
                                       animationCard={animationCard}
                                       key={url}/>
                })}
            </div>}
        </div>
    );
};

export default MyPage;