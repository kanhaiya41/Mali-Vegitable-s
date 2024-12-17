import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const WorkAssign = () => {
    //Get the Orders
  const [Orders,setOrders]=useState([]);
  const GetOrderData=async()=>{
    const res=await axios.get('http://localhost:4800/Order');
    setOrders(res.data);
  };

  useEffect(()=>{
    GetOrderData();
  },[]);
  const Navigate=useNavigate();
    const location=useLocation();
    const {id}=location.state;
    const [EmployeeData,setEmployeeData]=useState({});
  const GetData = async () => {
    try {
      const res = await axios.get(`http://localhost:4800/GetSingleEmloyee/${id}`);
      setEmployeeData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(()=>{
    
    GetData();
  },[id]);
  //   For Assign
  const [idDats,setIdDatas]=useState([]);
  const RadioChange=async(id)=>{
    setIdDatas(
        [...idDats,id]
    )
    
  }
  const [Work,setWork]=useState({});
  const [AssignWorkData,setAssignWorkData]=useState({
    Employee:"",
    Customer:"",
    item:"",
    quantity:null,
    Mobile:"",
    Email:"",
    EcjectAddress:"",
    Bill:null,
    Assign:""
  });
  
  const AssignNow=async()=>{
    try {
      const res = await axios.post('http://localhost:4800/FindforAssign', {
        ids: idDats
      });
      const workDataArray = res.data;

      const assignWorkArray = workDataArray.map(curelem => ({
        Employee: EmployeeData.UserName,
        Customer: curelem.UserName,
        item: curelem.item,
        quantity: curelem.quantity,
        Mobile: curelem.Mobile,
        Email: curelem.Email,
        EcjectAddress: curelem.EcjectAddress,
        Bill: curelem.Bill,
        Assign: "Assigned"
      }));

      setAssignWorkData(assignWorkArray);

      // Debugging: Check the new AssignWork structure
      console.log('AssignWork Data:', assignWorkArray);

      const response = await axios.post('http://localhost:4800/AssignWorkNow', assignWorkArray);
      toast.success(`Assign to ${EmployeeData?.UserName}`);

    } catch (error) {
      console.error('There was an error assigning the work!', error);
    }
  }
  
  return (
    <>
    {/* User Profile */}
    {/* <div id='userprofile' style={{display:'block'}}>
          <img src="/img/images.png" alt="" className='userprofilepic'/>
          <p>{EmployeeData.UserName }</p>
        </div> */}
      {/* List of orders */}
      <h1 className='avstock'  >List of Orders(Pending)</h1>
        <div className='tabled' >
          
          <table className='sotable'>
            <thead>
              <tr className='table-th'>
                <th className='table-head'>S.N.</th>
                <th className='table-head'>UserName</th>
                <th className='table-head'>Vagitable</th>
                <th className='table-head'>Quantity</th>
                <th className='table-head'>Address</th>
                <th className='table-head'>Bill</th>
                <th className='table-head'>Operation</th>
              </tr>
            </thead>
            <tbody>
            {Orders.map((Sabji,index)=>(
              <tr className='table-row'>
                <td className='table-data'>{index+1}</td>
                <td className='table-head'>{Sabji.UserName}</td>
                <td className='table-data'>{Sabji.item}</td>
                <td className='table-data'>{Sabji.quantity} KG</td>
                <td className='table-data' >kapasan</td>
                <td className='order-now'>RS.{Sabji.Bill}</td>
                <td className='table-data'>Assign <input type="radio" value={Sabji._id}  onChange={()=>RadioChange(Sabji._id)}/></td>
              </tr>
              ))}
            </tbody>
          </table>
          
        </div>
        <button className='Asgnbtn' onClick={AssignNow}>Assign</button>
         <br /> <br /><br />
         <h3 className='abiob' onClick={()=>Navigate('/AssignBigOrders',{state:{UserName:EmployeeData.UserName}})}>Assign Big Orders</h3>
         <button className='Asgnbtn' onClick={()=>Navigate('/EmployeeDetails')}>Go back</button>
    </>
  )
}

export default WorkAssign
