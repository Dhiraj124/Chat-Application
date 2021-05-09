import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRealtimeUsers, updateMessage, getRealtimeConversations } from '../../actions';
import Layout from '../../components/Layout';
import './style.css';


const User = (props) => {

    const { user, onClick } = props;

    return (
        <div onClick={() => onClick(user)} key={user.uid} className="displayName">
            <div className="displayPic">
                <img src="https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg" alt="" />
            </div>
            <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between', margin: '0 10px' }}>
                <span style={{ fontWeight: 500 }}>{user.firstName} {user.lastName}</span>
                <span className={user.isOnline ? `onlineStatus` : `onlineStatus off`}></span>
            </div>
        </div>
    )
}


const HomePage = (props) => {

    const [userUid, setUserUid] = useState(null)
    const [message, setMessage] = useState('')
    const [chatStarted, setchatStarted] = useState(false)
    const [chatUser, setChatUser] = useState('')
    let unsubscribe;

    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const user = useSelector(state => state.user)

    useEffect(() => {
        unsubscribe = dispatch(getRealtimeUsers(auth.uid))
            .then(unsubscribe => {
                return unsubscribe;
            })
            .catch(error => {
                console.log(error);
            })



    }, [])

    //console.log(user);

    useEffect(() => {
        return () => {
            unsubscribe.then(f => f()).catch(error => console.log(error))
        }
    }, [])


    const initChat = (user) => {
        setchatStarted(true)
        setChatUser(`${user.firstName} ${user.lastName}`)
        setUserUid(user.uid)
        console.log(user);

        dispatch(getRealtimeConversations({ uid_1: auth.uid, uid_2: user.uid }));
    }



    const submitMessage = (e) => {
        const msgObj = {
            user_uid_1: auth.uid,
            user_uid_2: userUid,
            message
        }

        if (message !== "") {
            dispatch(updateMessage(msgObj))
            .then(()=>{
                setMessage('')
            })
        }

        console.log(msgObj);
    }

    return (

        <Layout>
            <section className="container">

                <div className="listOfUsers">

                    {
                        user.users.length > 0 ?
                            user.users.map(user => (
                                <User onClick={initChat} key={user.id} user={user} />
                            )) : null
                    }
                </div>




                <div className="chatArea">

                    {
                        chatStarted ? chatUser : ''

                    }

                    <div className="messageSections">

                        {
                            chatStarted ?
                                user.conversations.map(con =>
                                    <div style={{ textAlign: con.user_uid_1 == auth.uid ?'right':'left' }}>
                                        <p className="messageStyle" >{con.message}</p>
                                    </div>
                                )
                                : null

                        }


                    </div>
                    {
                        chatStarted ?
                            <div className="chatControls">
                                <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="write Message" />
                                <button onClick={submitMessage}>Send</button>

                            </div> : null
                    }
                </div>
            </section>
        </Layout>
    );
}





export default HomePage;