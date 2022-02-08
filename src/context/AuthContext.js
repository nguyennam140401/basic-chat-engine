import React, { useEffect, useState } from 'react'
import {
    getAuth,
    signInWithPopup,
    FacebookAuthProvider,
    GoogleAuthProvider,
} from 'firebase/auth'
import { analytics as app } from '../firebase'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
export const AuthContext = React.createContext()

const AuthContextProvider = ({ children }) => {
    const [authState, setAuthState] = useState(null)
    // const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const auth = getAuth()
    auth.languageCode = 'vi'
    const getFile = async (url) => {
        const res = await fetch(url)
        const data = await res.blob()
        return new File([data], 'userPhoto.jpg', { type: 'image/jpeg' })
    }
    useEffect(() => {
        if (authState) {
            localStorage.setItem('user', JSON.stringify(authState))
            axios
                .get('https://api.chatengine.io/users/me', {
                    headers: {
                        'project-id': '87b753e0-9120-4e14-9ff1-8bedcbbd7f84',
                        'user-name': authState.email,
                        'user-secret': authState.uid,
                    },
                })
                .then(() => {
                    navigate('/chat')
                })
                .catch(() => {
                    let formData = new FormData()
                    formData.append('email', authState.email)
                    formData.append('username', authState.email)
                    formData.append('secret', authState.uid)
                    getFile(authState.photoURL).then((avatar) => {
                        formData.append('avatar', avatar, avatar.name)
                        axios
                            .post(
                                'https://api.chatengine.io/users/',
                                formData,
                                {
                                    headers: {
                                        'private-key':
                                            '3f0c8b92-fedd-45ee-bff4-ea39f28b7fcf',
                                    },
                                }
                            )
                            .then(() => {
                                navigate('/chat')
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    })
                })
        }
    }, [authState, navigate])
    useEffect(() => {
        if (localStorage.getItem('user')) {
            setAuthState(JSON.parse(localStorage.getItem('user')))
        }
    }, [])
    const signinWithFacebook = () => {
        const provider = new FacebookAuthProvider()
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user
                console.log(result)
                const credential =
                    FacebookAuthProvider.credentialFromResult(result)
                const accessToken = credential.accessToken
                console.log(accessToken)
                setAuthState(user)
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code
                const errorMessage = error.message
                // The email of the user's account used.
                const email = error.email
                // The AuthCredential type that was used.
                const credential =
                    FacebookAuthProvider.credentialFromError(error)

                // ...
                console.log(errorCode, errorMessage, email, credential)
            })
    }
    const signinWithGoogle = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
            .then((result) => {
                // console.log(result)
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential =
                    GoogleAuthProvider.credentialFromResult(result)
                const token = credential.accessToken
                // The signed-in user info.
                const user = result.user
                // ...
                console.log(user, token)
                setAuthState(user)
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code
                const errorMessage = error.message
                // The email of the user's account used.
                const email = error.email
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error)
                // ...
                console.log(errorCode, errorMessage, email, credential)
            })
    }
    const data = { authState, signinWithGoogle, signinWithFacebook }
    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
}
export default AuthContextProvider
