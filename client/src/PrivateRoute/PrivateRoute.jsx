import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet,Navigate } from 'react-router-dom'
function PrivateRoute({allowedRoles}) {
  // {allowedRoles}
    const {currentUser} = useSelector((state)=>state.user)
    const role = currentUser?.data?.role;
    console.log("role is :-",role)
    const isAllowed = allowedRoles.includes(role);
    return isAllowed? <Outlet/> : <Navigate to='/sign-in'/>
  return (
    <div>PrivateRoute</div>
  )
}

export default PrivateRoute