import React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Profile from './Pages/Profile'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
export default function App() {
  return <BrowserRouter>
  <Header/>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/about' element={<About />} />
      <Route path='/profile' element={<Profile />} />
    </Routes>
    <Footer/>
  </BrowserRouter>
}