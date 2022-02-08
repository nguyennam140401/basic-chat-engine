import React, { useContext } from 'react'
import { ChatEngine } from 'react-chat-engine'
import { AuthContext } from '../context/AuthContext'
const Chat = () => {
    const { authState } = useContext(AuthContext)
    return (
        <ChatEngine
            height="100vh"
            userName={authState.email}
            userSecret={authState.uid}
            projectID="87b753e0-9120-4e14-9ff1-8bedcbbd7f84"
        />
    )
}

export default Chat
