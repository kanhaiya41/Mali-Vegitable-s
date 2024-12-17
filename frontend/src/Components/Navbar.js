import { faBars, faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const Navigate = useNavigate();
  const openNav = () => {
      document.getElementById("mySidenav").style.width = "200px";
  }

  function closeNav() {
      document.getElementById("mySidenav").style.width = "0";
  }
  return (
    <>
      <nav>
        <ul>
          <li onClick={() => Navigate('/')}><img src="./img/logo.png" alt="" className='logo' /></li>
          <li
            className='nav' onClick={() => Navigate('/')}
          >
            <b>Home</b>
          </li>
          <li className='nav' onClick={() => Navigate('/Order')}>
            <b>Order Now</b>
          </li>
          <li className='nav' onClick={() => Navigate('/Contact')}>
            <b>Contact Us</b>
          </li>
          <li className='nav' onClick={() => Navigate('/About')}>
            <b>About Us</b>
          </li>
          <li className='menu'> <FontAwesomeIcon icon={faBars} onClick={openNav} /> </li>
        </ul>
      </nav>
      <div id="mySidenav" className="sidenav">
        <div className="closebtn" onClick={closeNav}><FontAwesomeIcon icon={faClose} /></div>
        <div onClick={() => Navigate('/')}>Home</div>
        <div onClick={() => Navigate('/Order')}>Order Now</div>
        <div onClick={() => Navigate('/Contact')}>Contact Us</div>
        <div onClick={() => Navigate('/About')}>About Us</div>
      </div >
    </>
  )
}

export default Navbar
