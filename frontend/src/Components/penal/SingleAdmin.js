import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const SingleAdmin = () => {
    const Navigate=useNavigate();
    const location=useLocation();
    const {id}=location.state;
    const [EmployeeData,setEmployeeData]=useState({});
  const GetData = async () => {
    try {
      const res = await axios.get(`https://mali-vegitable-s-3.onrender.com/GetSingleEmloyee/${id}`);
      setEmployeeData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(()=>{
    GetData();
  },[id]);
  // For Assign Data 
  const [AssignOrders,setAssignOrders]=useState([]);
  const GetAssignSignOrderData=async()=>{
    var aoc=document.getElementById('AssignedOrders');
    if(aoc.style.display==='none')
    {
      aoc.style.display='block';
      const Employee=EmployeeData.UserName;
    const res=await axios.get(`https://mali-vegitable-s-3.onrender.com/FindAssignOrdersForSignleEmployee/${Employee}`);
    setAssignOrders(res.data);
    }
    else
    {
      aoc.style.display='none';
    }
  }
  // For Completed Data 
  const [CompletedOrders,setCompletedOrders]=useState([]);
  const GetCompletedOrderData=async()=>{
    var aoc=document.getElementById('CompletedOrders');
    if(aoc.style.display==='none')
    {
      aoc.style.display='block';
      const Employee=EmployeeData.UserName;
    const res=await axios.get(`https://mali-vegitable-s-3.onrender.com/FindCompletedOrdersForSignleEmployee/${Employee}`);
    setCompletedOrders(res.data);
    }
    else
    {
      aoc.style.display='none';
    }
  }
  return (
    <>
    <div className='EmployeCard'>
      <h1>Employee Details</h1>
      <div className='big'>
      <div>
        UserName:
        <p>{EmployeeData.UserName}</p>
        Mobile:
        <p>{EmployeeData.Mobile}</p>
        Password:
        <p>{EmployeeData.Password}</p>
        Employee Code:
        <p>{EmployeeData.Code}</p>
        </div>
        <div className='bigtitle'>
        Email:
        <p>{EmployeeData.Email}</p>
        Date-of-Birth:
        <p>{EmployeeData.DOB}</p>
        Gender:
        <p>{EmployeeData.Gender}</p>
        Address:
        <p>{EmployeeData.Address}</p>
        
        </div>
        <div className='bigtitle'>
        Qualification:
        <p>Graduate</p>
        Experience:
        <p>2 Year</p>
        Driving Licence:
        <p>No</p>   
        Adhar No:
        <p>123456789012</p>     
        </div>
        
      </div>
      <p className='empassorder' onClick={GetAssignSignOrderData}>Assigned Orders</p>
      <div id='AssignedOrders' >
      <div className='tabled'>
          
          <table className='sotable'>
            <thead>
              <tr className='table-th'>
                <th className='table-head'>S.N.</th>
                <th className='table-head'>Employee</th>
                <th className='table-head'>Customer</th>
                <th className='table-head'>Vagitable</th>
                <th className='table-head'>Quantity</th>
                <th className='table-head'>Bill</th>
                
                <th className='table-head'>Operation</th>
              </tr>
            </thead>
            <tbody>
            {AssignOrders.map((Sabji,index)=>(
              <tr className='table-row'>
                <td className='table-data'>{index+1}</td>
                <td className='table-head'>{Sabji.Employee}</td>
                <td className='table-head'>{Sabji.Customer}</td>
                <td className='table-data'>{Sabji.item}</td>
                <td className='table-data'>{Sabji.quantity} KG</td>
                <td className='order-now'>RS.{Sabji.Bill}</td>
                <td className='table-data'>Assigned</td>
              </tr>
              ))}
            </tbody>
          </table>
        </div> <br /> <br /><br />
      </div>
        <p className='empassorder' onClick={GetCompletedOrderData}>Completed Orders</p>
        <div id='CompletedOrders' >
      <div className='tabled'>
          
          <table className='sotable'>
            <thead>
              <tr className='table-th'>
                <th className='table-head'>S.N.</th>
                <th className='table-head'>Employee</th>
                <th className='table-head'>Customer</th>
                <th className='table-head'>Vagitable</th>
                <th className='table-head'>Quantity</th>
                <th className='table-head'>Bill</th>
                
                <th className='table-head'>Operation</th>
              </tr>
            </thead>
            <tbody>
            {CompletedOrders.map((Sabji,index)=>(
              <tr className='table-row'>
                <td className='table-data'>{index+1}</td>
                <td className='table-head'>{Sabji.Employee}</td>
                <td className='table-head'>{Sabji.Customer}</td>
                <td className='table-data'>{Sabji.item}</td>
                <td className='table-data'>{Sabji.quantity} KG</td>
                <td className='order-now'>RS.{Sabji.Bill}</td>
                <td className='table-data'>Completed</td>
              </tr>
              ))}
            </tbody>
          </table>
        </div> <br /> <br /><br />
      </div>
      </div>
      <button className='gbck' onClick={()=>Navigate("/EmployeeDetails")}>Go Back</button>
    </>
  )
}

export default SingleAdmin
