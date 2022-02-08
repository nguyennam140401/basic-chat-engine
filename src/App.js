import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './container/Home'
import Login from './container/Login'
import Chat from './container/Chat'
function App() {
    return (
        <>
            <Routes>
                <Route path="/">
                    <Route index element={<Home />} />
                    <Route path="login" element={<Login />}></Route>
                    <Route path="chat" element={<Chat />}></Route>
                </Route>
            </Routes>
        </>
    )
}

export default App
