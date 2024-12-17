import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const Employee = () => {
  const Navigate = useNavigate();
  const Location = useLocation();

  const { user } = useSelector(store => store.user);
  //Get the Vegitables
  const [VegData, setVegData] = useState([]);
  const GetVegData = async () => {
    const res = await axios.get('https://mali-vegitable-s-3.onrender.com/Vegitable');
    setVegData(res?.data);
  }
  const [EmployeeData, setEmployeeData] = useState([]);
  const GetEmployeeWork = async () => {
    const Employee = user?.UserName;
    const res = await axios.get(`https://mali-vegitable-s-3.onrender.com/FindAssignOrdersForSignleEmployee/${Employee}`);
    setEmployeeData(res?.data);
  }
  // Fing Big Orders Assigned
  const [EmployeeBigData, setEmployeeBigData] = useState([]);
  const GetEmployeeBigWork = async () => {
    const Employee = user?.UserName;
    const res = await axios.get(`https://mali-vegitable-s-3.onrender.com/FindAssignBigOrdersForSignleEmployee/${Employee}`);
    setEmployeeBigData(res?.data);
  }
  useEffect(() => {
    GetVegData();
    GetEmployeeWork();
    GetCompletedWork();
    GetEmployeeBigWork();
    GetCompletedBigWork();
  }, []);
  const [Detail, setDetail] = useState({
    to: "",
    message: ""
  })
  //For Generate random OTP
  // const OTP='';
  const GenerateRandomOTP = (lenth) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const characterlenth = characters.length;
    let result = '';
    for (let i = 0; i < lenth; i++) {
      result += characters.charAt(Math.floor(Math.random() * characterlenth));
    }
    return result;
  }
  const SendOTPandConfirm = async (id, Number) => {
    const OTP = GenerateRandomOTP(6);
    setDetail({
      to: `+91${Number}`,
      message: OTP
    })
    const otpDetails = {
      to: `+91${Number}`,
      message: OTP
    };
    const res = await axios.post('https://mali-vegitable-s-3.onrender.com/send-OTP', otpDetails);
    const message = otpDetails.message;
    Navigate('/Confirm', { state: { id, message, big: false } });
  }
  const [CompletedWork, setCompletedWork] = useState([]);
  const GetCompletedWork = async () => {
    const Employee = user?.UserName;
    const res = await axios.get(`https://mali-vegitable-s-3.onrender.com/FindCompletedOrdersForSignleEmployee/${Employee}`);

    setCompletedWork(res?.data);
  }
  // for big order confirm
  const SendOTPandConfirmBig = async (id, Number) => {
    const OTP = GenerateRandomOTP(6);
    setDetail({
      to: `+91${Number}`,
      message: OTP
    })
    const otpDetails = {
      to: `+91${Number}`,
      message: OTP
    };
    const res = await axios.post('https://mali-vegitable-s-3.onrender.com/send-OTP', otpDetails);
    const message = otpDetails.message;
    Navigate('/Confirm', { state: { id, message, big: true } });
  }
  const [CompletedBigWork, setCompletedBigWork] = useState([]);
  const GetCompletedBigWork = async () => {
    const Employee = user?.UserName;
    const res = await axios.get(`https://mali-vegitable-s-3.onrender.com/FindCompletedBigOrdersForSignleEmployee/${Employee}`);
    setCompletedBigWork(res?.data);
  }
  // For Total Export Ammount
  const [Ammount, setAmmount] = useState(0);
  const calculateTotalAmount = (completedOrders) => {
    const totalAmount = completedOrders.reduce((acc, order) => acc + order.Bill, 0);
    setAmmount(totalAmount);
  }
  useEffect(() => {
    calculateTotalAmount(CompletedWork);
  }, [CompletedWork]);
  return (
    <>
      {/* Employe Profile */}
      <div className='Profile'>
        <img src="/img/images.png" alt="" className='ppic' />
        <p>{user?.UserName}</p>
      </div>
      {/* Available Stock */}
      <h1 className='avstock' >Available Stock</h1>
      <div className='tabled'>
        <table className='sotable'>
          <thead>
            <tr className='table-th'>
              <th className='table-head'>S.N.</th>
              <th className='table-head'>Vagitable</th>
              <th className='table-head'>Quantity</th>
              <th className='table-head'>Rate</th>
            </tr>
          </thead>
          <tbody>
            {VegData?.map((Sabji, index) => (
              <tr className='table-row'>
                <td className='table-data'>{index + 1}</td>
                <td className='table-data'>{Sabji?.item}</td>
                <td className='table-data'>{Sabji?.quantity} KG</td>
                <td className='table-data'>{Sabji?.Rate} RS/kg</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> <br /><br /><br />
      {/* Employee Work Assigned */}
      <h1 className='avstock' >Your Work</h1>
      <div className='tabled'>
        <table className='sotable'>
          <thead>
            <tr className='table-th'>
              <th className='table-head'>S.N.</th>
              <th className='table-head'>UserName</th>
              <th className='table-head'>Vagitable</th>
              <th className='table-head'>Quantity</th>
              <th className='table-head'>Details</th>
              <th className='table-head'>Action</th>
            </tr>
          </thead>
          <tbody>
            {EmployeeData?.map((CurElem, index) => (
              <tr className='table-row'>
                <td className='table-data'>{index + 1}</td>
                <td className='table-head'>{CurElem?.Employee}</td>
                <td className='table-data'>{CurElem?.item}</td>
                <td className='table-data'>{CurElem?.quantity} KG</td>
                <td className='order-now' onClick={() => Navigate("/OrderDetail", { state: { id: CurElem?._id, n: '/EmployeePanel' } })}>Check</td>
                <td className='order-now' onClick={() => SendOTPandConfirm(CurElem?._id, CurElem?.Mobile)}>Reached</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div> <br /><br /><br />
      {/* Assigned Big Orders */}
      <h2 style={{ marginLeft: '14%' }}>Assigned Big Orders</h2>
      <div className='allbigorderse'>
        {EmployeeBigData?.map((CurElem) => (
          <div className='bigOrderCard'>
            <div>
              <p>Employee: {CurElem?.Employee}</p>
              <p>UserName: {CurElem?.Customer}</p>
              <p>Mobile: {CurElem?.Contact} </p>
              <p>Email: {CurElem?.Email} </p>
              <p>Address: {CurElem?.Address} </p>
              <p>Bill: {CurElem?.Bill} Rupees </p>
              <p>Action: <span className='order-now' onClick={() => SendOTPandConfirmBig(CurElem?._id, CurElem?.Contact)}>Reached</span></p>
            </div>
            <div>
              {CurElem?.bigInputs.map((bigInput) => (
                <div>
                  <p>Item: {bigInput?.item}</p>
                  <p>Quantity: {bigInput?.quantity} kg</p>
                  <p>Rate: {bigInput?.Rate} rupees/kg</p>
                </div>

              ))}

            </div>
          </div>
        ))}

      </div>
      {/* Sold Today */}
      <h1 className='avstock' >Today Sell</h1>
      <div className='tabled'>

        <table className='sotable'>
          <thead>
            <tr className='table-th'>
              <th className='table-head'>S.N.</th>
              <th className='table-head'>Employee</th>
              <th className='table-head'>Customer</th>
              <th className='table-head'>Vagitable</th>
              <th className='table-head'>Quantity</th>
              <th className='table-head'>Details</th>
              <th className='table-head'>Bill</th>

              <th className='table-head'>Operation</th>
            </tr>

          </thead>
          <tbody>
            {CompletedWork?.map((Sabji, index) => (
              <tr className='table-row'>
                <td className='table-data'>{index + 1}</td>
                <td className='table-head'>{Sabji?.Employee}</td>
                <td className='table-head'>{Sabji?.Customer}</td>
                <td className='table-data'>{Sabji?.item}</td>
                <td className='table-data'>{Sabji?.quantity} KG</td>
                <td className='order-now' onClick={() => Navigate("/CompletedOrderDetail", { state: { id: Sabji?._id } })}>Cheack</td>
                <td className='order-now'>RS.{Sabji?.Bill}</td>
                <td className='table-data'>Completed</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> <br /> <br /> <br />
      {/* Completed Big Orders */}
      <h2 style={{ marginLeft: '10%' }}>Completed Big Orders</h2>
      <div className='allbigorderse'>
        {CompletedBigWork?.map((CurElem) => (
          <div className='bigOrderCard'>
            <div>
              <p>Employee: {CurElem?.Employee}</p>
              <p>UserName: {CurElem?.Customer} </p>
              <p>Mobile: {CurElem?.Contact} </p>
              <p>Email: {CurElem?.Email} </p>
              <p>Address: {CurElem?.Address} </p>
              <p>Bill: {CurElem?.Bill} Rupees </p>
            </div>
            <div>
              {CurElem?.bigInputs.map((bigInput) => (
                <div>
                  <p>Item: {bigInput?.item} </p>
                  <p>Quantity: {bigInput?.quantity} kg </p>
                  <p>Rate: {bigInput?.Rate} rupees/kg</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <h1 className='avstock'>Today Total Export Amount</h1>
      <h2 className='totalbill'>Rs. {Ammount}</h2>
    </>
  )
}

export default Employee
