// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyCeTeCqu9HUBOP69wQwtj9Wm1YMvbBtsIw',
    authDomain: 'basic-chat-engine.firebaseapp.com',
    projectId: 'basic-chat-engine',
    storageBucket: 'basic-chat-engine.appspot.com',
    messagingSenderId: '721088982394',
    appId: '1:721088982394:web:e91656455c1a0bc3783ac3',
    measurementId: 'G-8KXRHRYJY1',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)
