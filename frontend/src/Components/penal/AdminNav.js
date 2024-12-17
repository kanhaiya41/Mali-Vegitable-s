import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminNav = () => {
  const Navigate=useNavigate();
  return (
    <>
      <nav>
          <ul className='anav'>
          <li onClick={()=>Navigate('/')}><img src="./img/logo.png" alt="" className='logo'/></li>
            <li 
            onClick={()=>Navigate('/AdminPanel')}
            >
              <b>Admin</b>
            </li>
            <li onClick={()=>Navigate('/EmployeeDetails')}>
              <b>Employee Details</b>
            </li>
            
          </ul>
        </nav> 
    </>
  )
}

export default AdminNav
