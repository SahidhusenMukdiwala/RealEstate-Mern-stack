import React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Profile from './Pages/Profile'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import CreateListing from './Pages/CreateListing'
import PrivateRoute from './PrivateRoute/PrivateRoute'
import UpdateListing from './Pages/UpdateListing'
import ListingPage from './Pages/ListingPage'
import Search from './Pages/Search'
import Dashboard from './Pages/Dashboard'
import Review from './Components/Review/Review'
import ContectUs from './Components/ContectUs/ContectUs'
export default function App() {
  return <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route element={<PrivateRoute allowedRoles={['user', 'agent']} />} >
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/listing/:id' element={<ListingPage />} />
      </Route>

      <Route element={<PrivateRoute allowedRoles={['user']} />} >
        <Route path='/users/profile/me' element={<Profile />} />
      </Route>
      <Route element={<PrivateRoute allowedRoles={['agent']} />} >
        <Route path='/agents/profile/me' element={<Dashboard />} />
        <Route path='/create-listing' element={<CreateListing />} />
        <Route path='/updateListing/:id' element={<UpdateListing />} />
      </Route>
      <Route path='/listing/:id' element={<ListingPage />} />
      <Route path='/search' element={<Search />} />
      <Route path='/ContectUs' element={<ContectUs/>}/>
    </Routes>
    <Footer />
  </BrowserRouter>
}