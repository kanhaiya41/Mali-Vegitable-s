import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ForOder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state;
  const { UserName } = location.state;
  const [VegData, setVegData] = useState({});
  const GetData = async () => {
    try {
      const res = await axios.get(`https://mali-vegitable-s-3.onrender.com/GetOrderVeg/${id}`);
      setVegData(res?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    GetData();
  }, [id]);
  const [qua, setQua] = useState();
  const [Mobile, setMobile] = useState();
  const [Email, setEmail] = useState();
  const [EcjectAdd, setEcjectAdd] = useState();

  const SubmitOrder = async () => {
    const OrderData = {
      UserName: UserName,
      item: VegData.item,
      quantity: qua,
      Mobile: Mobile,
      Email: Email,
      EcjectAddress: EcjectAdd,
      Bill: qua * VegData.Rate
    };
    const res = await axios.post('https://mali-vegitable-s-3.onrender.com/TakeOrder', OrderData);
    toast.success(res?.data);
    navigate('/Order');
  }
  return (
    <>
      {/* User Profile */}
      <div id='userprofile' style={{ display: 'flex' }}>
        <img src="/img/images.png" alt="" className='userprofilepic' />
        <p>{UserName}</p>
      </div>
      <div className='orderCard'>
        <h4>Item*</h4>
        <p className='oinput'>{VegData.item}</p> <hr />
        <h4>Quantity(In Kg)*</h4>
        <input type="text" className='oinput' placeholder={`Enter Quantity less then ${VegData.quantity}`} value={qua} onChange={(e) => setQua(e.target.value)} /> <hr />
        <h4>Rate*</h4>
        <p className='oinput'>{VegData.Rate} Rs/Kg</p> <hr />
        <h4>Mobile No*</h4>
        <input type="text" className='oinput' placeholder={`Enter Your Mobile number`} value={Mobile} onChange={(e) => setMobile(e.target.value)} /> <hr />
        <h4>Email*</h4>
        <input type="text" className='oinput' placeholder={`Enter Your Email(Active**)`} value={Email} onChange={(e) => setEmail(e.target.value)} /> <hr />
        <h4>Ecject Address*</h4>
        <input type="text" className='oinput' placeholder={`Your Ecject location Where Order Placed`} value={EcjectAdd} onChange={(e) => setEcjectAdd(e.target.value)} /> <hr />
        <h4>Total Bill*</h4>
        <p className='oinput'>Rs. {qua * VegData.Rate}</p> <hr />
        <button className='onb' onClick={SubmitOrder}>Order Now</button>
      </div>
    </>
  )
}

export default ForOder
