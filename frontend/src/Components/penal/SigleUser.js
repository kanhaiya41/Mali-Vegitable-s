import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const SigleUser = () => {
    const Navigate=useNavigate();
    const location=useLocation();
    const {id}=location.state;
    const [EmployeeData,setEmployeeData]=useState({});
  const GetData = async () => {
    try {
      const res = await axios.get(`https://mali-vegitable-s-3.onrender.com/GetSingleUser/${id}`);
      setEmployeeData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(()=>{
    GetData();
  },[id]);
  return (
    <>
    <div className='EmployeCard'>
      <h1>Customer Details</h1>
      <div className='big'>
      <div>
        UserName:
        <p>{EmployeeData.UserName}</p>
        Mobile:
        <p>{EmployeeData.Mobile}</p>
        Item:
        <p>{EmployeeData.item}</p>
        Quantity:
        <p>{EmployeeData.quantity}</p>
        </div>
        <div className='bigtitle'>
        Email:
        <p>{EmployeeData.Email}</p>
        
        Address:
        <p>{EmployeeData.EcjectAddress}</p>
        Bill:
        <p>{EmployeeData.Bill}</p>
        </div>
      </div>
      </div>
      <button className='gbck' onClick={()=>Navigate("/AdminPanel")}>Go Back</button>
    </>
  )
}

export default SigleUser
