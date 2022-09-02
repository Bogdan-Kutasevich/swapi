import React, {useState, useEffect, useContext} from 'react';
import styles from './Comments.module.css'
import {onValue, push, ref, set} from "firebase/database";
import {db} from "../../Base";
import {AuthContext} from "../../context/authContext";


const Comments = ({itemTitle}) => {
    const [input, setInput] = useState('')
    const [allComments, setAllComments] = useState([])
    const {currentUser} = useContext(AuthContext)
    const [username, setUsername] = useState("");
    //get all comments from db
    useEffect(()=>{
        if(itemTitle){
            onValue(ref(db, 'cards/' + itemTitle + '/comments'), (snapshot) => {
                if(snapshot.exists()){
                    setAllComments(Object.values(snapshot.val()))
                }
            });
        }
    },[itemTitle])

    //get userName from db
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

    const inputHendler = (e)=>{
        setInput(e.target.value)
    }

    const addComment = ()=>{
        if(currentUser){
            const comment = {
                user: username,
                text: input
            }
            const newUrlRef = push(ref(db, 'cards/'  + itemTitle + '/comments'));
            set(newUrlRef, comment);
        }
        setInput('')
    }

    return (
        <div className={styles.commentsMainWrapper}>
            <div className={styles.commentsAddWrapper}>
                <p className={styles.commentsAddTitle}>Add your comment:</p>
                <textarea type="textarea" className={styles.commentsAddInput} value={input} onChange={inputHendler}/>
                <button className={styles.commentsAddBtn} onClick={addComment}>add comment</button>
            </div>
            <div className={styles.commentsAddedMainWrapper}>
                {allComments.map((comment)=>{
                    return (
                        <div className={styles.commentsAddedWrapper} key={comment.text}>
                            <h3 className={styles.commentsAddedUser}>{comment.user}:</h3>
                            <p className={styles.commentsAddedText}>{comment.text}</p>
                        </div>
                    )
                })}
            </div>
        </div>

    );
};

export default Comments;