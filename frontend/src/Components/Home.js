import React from 'react'
import Navbar from './Navbar'
import Footer from './penal/Footer'
const Home = () => {
  return (
    <>
    <Navbar/>
    {/* Animational Welcome Text */}
      <div className='containerr'>
        <div className='typing'>
          Welcome to Mali Vegitable's.....
        </div> 
      </div>
      {/* Design with Vegitable images  */}
      <div className='bigh'>
        <div className='hpdfi'>
          <img src="/img/fveg1.jpg" className='sbaoih' alt="" />
          <p className='wwsabh'>We treat you like Our Family</p>
        </div>
        <div className='hpdfi'>
          <img src="/img/fveg2.jpg" className='sbaoih' alt="" />
          <p className='wwsabh'>How we treat Vegitable's</p>
        </div>
      </div>
      <div className='bigh'>
        <div className='hpdfi'>
          <img src="/img/fveg3.jpg" className='sbaoih' alt="" />
          <p className='wwsabh'>How We Serve</p>
        </div>
        <div className='hpdfi'>
          <img src="/img/fveg4.jpg" className='sbaoih' alt="" />
          <p className='wwsabh'>A healthy Vegetable have a Another Smell</p>
        </div>
      </div>
      <div className='bigh'>
        <div className='hpdfi'>
          <img src="/img/fveg5.jpg" className='sbaoih' alt="" />
          <p className='wwsabh'>We have the Acuall Rate</p>
        </div>
        <div className='hpdfi'>
          <img src="/img/fveg6.jpg" className='sbaoih' alt="" />
          <p className='wwsabh'>We give the Guranty of Quality</p>
        </div>
      </div>
      <br /><br /><br />
      <Footer/>
    </>
  )
}

export default Home
