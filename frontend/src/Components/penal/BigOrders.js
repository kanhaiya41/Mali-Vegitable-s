import React, { useEffect, useState } from 'react'
import axios from 'axios';
const BigOrders = () => {
    const [BigOrders,setBigOrders]=useState([]);
    const GetBigOrders=async()=>{
        const res=await axios.get('http://localhost:4800/FindBigOrders');
        setBigOrders(res.data);
    }
    const [AssignBigOrders,setAssignBigOrders]=useState([]);
    const GetAssignBigOrders=async()=>{
        const res=await axios.get('http://localhost:4800/FindAssignedBigOrders');
        setAssignBigOrders(res.data);
    }
    const [CompletedBigWork,setCompletedBigWork]=useState([]);
  const GetCompletedWork=async()=>{
    const res=await axios.get('http://localhost:4800/FindCompletedBigOrder');
    setCompletedBigWork(res.data);
  }
    useEffect(()=>{
        GetBigOrders();
        GetAssignBigOrders();
        GetCompletedWork();
    })
  return (
    <>
      <h1>Big Orders Panel</h1>
      <h2>Big Orders(pending)</h2>
      <div className='allbigorders'>
      {BigOrders.map((CurElem)=>(
        <div className='bigOrderCard'>
          <div>
        UserName: {CurElem.UserName} <br />
        Mobile: {CurElem.Contact} <br />
        Email: {CurElem.Email} <br />
        Address: {CurElem.Address} <br />
        Bill: {CurElem.Bill} Rupees <br />
        Operation:Not Assigned
        </div>
        <div>
        {CurElem.bigInputs.map((bigInput)=>(
            <div>
                Item: {bigInput.item} <br />
                Quantity: {bigInput.quantity} kg <br />
                Rate: {bigInput.Rate} rupees/kg 
            </div>
        ))}
        </div>
        
        </div>
      ))}
      </div>
      {/* Assigned Big Orders */}
        <h2>Assigned Big Orders</h2>
        <div className='allbigorders'>
      {AssignBigOrders.map((CurElem)=>(
        <div className='bigOrderCard'>
          <div>
        Employee: {CurElem.Employee}  <br />
        UserName: {CurElem.Customer} <br />
        Mobile: {CurElem.Contact} <br />
        Email: {CurElem.Email} <br />
        Address: {CurElem.Address} <br />
        Bill: {CurElem.Bill} Rupees <br />
        Operation: Assigned
        </div>
        <div>
        {CurElem.bigInputs.map((bigInput)=>(
            <div>
                Item: {bigInput.item} <br />
                Quantity: {bigInput.quantity} kg <br />
                Rate: {bigInput.Rate} rupees/kg 
            </div>
        ))}
        </div>
        </div>
      ))}
      </div>
        {/* Completed Big Orders */}
        <h2>Completed Big Orders</h2>
        <div className='allbigorders'>
      {CompletedBigWork.map((CurElem)=>(
        <div className='bigOrderCard'>
          <div>
        Employee: {CurElem.Employee}  <br />
        UserName: {CurElem.Customer} <br />
        Mobile: {CurElem.Contact} <br />
        Email: {CurElem.Email} <br />
        Address: {CurElem.Address} <br />
        Bill: {CurElem.Bill} Rupees <br />
        Operation: Completed
        </div>
        <div>
        {CurElem.bigInputs.map((bigInput)=>(
            <div>
                Item: {bigInput.item} <br />
                Quantity: {bigInput.quantity} kg <br />
                Rate: {bigInput.Rate} rupees/kg 
            </div>
        ))}
        </div>
        </div>
      ))}
      </div>
      
    </>
  )
}

export default BigOrders
