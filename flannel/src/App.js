import React from 'react'
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp'
import Chat from './pages/Chat'
import Profile from './pages/Profile'
import ExplorePage from './components/Explore/ExplorePage'
import { Route, Routes, BrowserRouter } from 'react-router-dom'

import './App.css'
/**
 * @component
 * App Component
 *      This component is the overarching navigation handler for our application.
 *      Wrapped inside a BrowserRouter from the React router library, we include
 *      different routes distinguished by their respective path URLs. The root '/'
 *      starts at the login page. Within each page, navigation is handeled by chaning
 *      the url and respectively rendering the proper component.
 */

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<LogIn />} />
                <Route exact path="/SignUp" element={<SignUp />} />
                <Route exact path="/Explore" element={<ExplorePage />} />
                <Route exact path="/Chat" element={<Chat />} />
                <Route exact path="/Profile" element={<Profile />} />
            </Routes>
        </BrowserRouter>
    )
}