import React, { useEffect, useState } from 'react'
import AdminNav from './AdminNav'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';

const Admin = () => {
  const [ChangeButton, setChangeButton] = useState(false);
  const Navigate = useNavigate();
  // for Vegitable Inster
  const [Vagitable, setVegitable] = useState({
    item: "",
    quantity: '',
    Rate: ''
  });
  const ChangeVegValue = (e) => {
    setVegitable({
      ...Vagitable,
      [e.target.name]: e.target.value
    }
    )
  }
  const AddVegitable = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:4800/Admin', Vagitable);
    setVegitable({
      item: "",
      quantity: '',
      Rate: ''
    })
    toast.success(res?.data);
  }

  //Get the Vegitables
  const [VegData, setVegData] = useState([]);
  const GetVegData = async () => {
    const res = await axios.get('http://localhost:4800/Vegitable');
    setVegData(res?.data);
  }
  //Get the Orders
  const [Orders, setOrders] = useState([]);
  const GetOrderData = async () => {
    const res = await axios.get('http://localhost:4800/Order');
    setOrders(res?.data);
  }
  //Get the Assign Orders
  const [AssignOrders, setAssignOrders] = useState([]);
  const GetAssignOrderData = async () => {
    const res = await axios.get('http://localhost:4800/FindAssignedOrder');
    setAssignOrders(res?.data);
  }
  const [User, setUser] = useState([]);
  const GetUser = async () => {
    const res = await axios.get('http://localhost:4800/Login');
    setUser(res?.data);
  }
  //For Completed Orders
  const [CompletedWork, setCompletedWork] = useState([]);
  const GetCompletedWork = async () => {
    const res = await axios.get('http://localhost:4800/FindCompletedOrder');
    setCompletedWork(res?.data);
  }
  useEffect(() => {
    GetVegData();
    GetOrderData();
    GetUser();
    GetAssignOrderData();
    GetCompletedWork();
    // GetTotalExportAmmount();
  }, []);
  // For Total Export Ammount
  const [Ammount, setAmmount] = useState(0);
  const calculateTotalAmount = (completedOrders) => {
    const totalAmount = completedOrders.reduce((acc, order) => acc + order.Bill, 0);
    setAmmount(totalAmount);
  }
  useEffect(() => {
    calculateTotalAmount(CompletedWork);
  }, [CompletedWork]);
  // For Update the Vegitable
  const [IdForUpdate, setIdForUpdate] = useState('');
  const UpdateValue = (Sabji) => {
    setIdForUpdate(Sabji._id);
    setVegitable({
      item: Sabji.item,
      quantity: Sabji.quantity,
      Rate: Sabji.Rate
    })
    setChangeButton(true);
  }
  const UpdateNow = async () => {
    const id = IdForUpdate;
    const res = await axios.put(`http://localhost:4800/UpdateVegNow/${id}`, Vagitable);
    toast.success(res?.data);
    setVegitable({
      item: "",
      quantity: '',
      Rate: ''
    })
    setChangeButton(false);
  }
  // for delete
  const DeleteNow = async (id) => {
    const res = await axios.delete(`http://localhost:4800/DeleteVegNow/${id}`);
  }
  return (
    <>
      <AdminNav />
      <div className='form'>
        <h4>Add Vagitable's in list</h4>
        Item: <br />
        <input type="text" className='vinput' name='item' onChange={ChangeVegValue} value={Vagitable.item} placeholder='Vagitable Name' /> <br />
        Quantity: <br />
        <input type="text" className='vinput' name='quantity' onChange={ChangeVegValue} value={Vagitable.quantity} placeholder='Quantity of Vagitable' /><br />
        Rate: <br />
        <input type="text" className='vinput' name='Rate' onChange={ChangeVegValue} value={Vagitable.Rate} placeholder='Ex. 100 RS/kg' /><br />
        {!ChangeButton ? <button className='adveg' onClick={AddVegitable}>Add Item</button> : <button className='adveg' onClick={UpdateNow}>Update Item</button>}
      </div> <br /> <br />
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
              <th className='table-head'>Action</th>
            </tr>

          </thead>
          <tbody>
            {VegData?.map((Sabji, index) => (
              <tr className='table-row'>
                <td className='table-data'>{index + 1}</td>
                <td className='table-data'>{Sabji?.item}</td>
                <td className='table-data'>{Sabji?.quantity} KG</td>
                <td className='table-data'>{Sabji?.Rate} RS/kg</td>
                <td className='Action-now'>
                  <span className='updt' onClick={() => UpdateValue(Sabji)}>Update</span><span className='dlt' onClick={() => DeleteNow(Sabji._id)}>Delete</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> <br /> <br /><br />
      {/* List of orders */}
      <h1 className='avstock' >List of Orders(Pending)</h1>
      <div className='tabled'>

        <table className='sotable'>
          <thead>
            <tr className='table-th'>
              <th className='table-head'>S.N.</th>
              <th className='table-head'>UserName</th>
              <th className='table-head'>Vagitable</th>
              <th className='table-head'>Quantity</th>
              <th className='table-head'>Details</th>
              <th className='table-head'>Bill</th>

              <th className='table-head'>Operation</th>
            </tr>

          </thead>
          <tbody>
            {Orders?.map((Sabji, index) => (
              <tr className='table-row'>
                <td className='table-data'>{index + 1}</td>
                <td className='table-head'>{Sabji?.UserName}</td>
                <td className='table-data'>{Sabji?.item}</td>
                <td className='table-data'>{Sabji?.quantity} KG</td>
                <td className='order-now' onClick={() => Navigate("/UserDetail", { state: { id: Sabji?._id } })}>Cheack</td>
                <td className='order-now'>RS.{Sabji?.Bill}</td>
                <td className='table-data'>Not Assign</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> <br /> <br /><br />
      {/* List of Assigned orders */}
      <h1 className='avstock' >List of Orders(Assigned)</h1>
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
            {AssignOrders?.map((Sabji, index) => (
              <tr className='table-row'>
                <td className='table-data'>{index + 1}</td>
                <td className='table-head'>{Sabji?.Employee}</td>
                <td className='table-head'>{Sabji?.Customer}</td>
                <td className='table-data'>{Sabji?.item}</td>
                <td className='table-data'>{Sabji?.quantity} KG</td>
                <td className='order-now' onClick={() => Navigate("/OrderDetail", { state: { id: Sabji?._id, n: '/AdminPanel' } })}>Cheack</td>
                <td className='order-now'>RS.{Sabji?.Bill}</td>
                <td className='table-data'>Assigned</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> <br /> <br /><br />
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
      {/* Total Sell Ammount */}
      <h1 className='avstock'>Today Total Export Ammount</h1>
      <h2 className='totalbill'>Rs. {Ammount}</h2>
      <h3 className='cbo' onClick={() => Navigate('/Big_Orders')}>Cheack Big Orders</h3>
      {/* All Costomers Table */}
      <h1 className='avstock' >All Customers/Users</h1>
      <div className='tabled'>

        <table className='sotable'>
          <thead>
            <tr className='table-th'>
              <th className='table-head'>S.N.</th>
              <th className='table-head'>UserName</th>
              <th className='table-head'>Email </th>
              <th className='table-head'>Mobile</th>
              <th className='table-head'>Password</th>
              <th className='table-head'>Address</th>
            </tr>
          </thead>
          <tbody>
            {User?.map((Sabji, index) => (
              <tr className='table-row'>
                <td className='table-data'>{index + 1}</td>
                <td className='table-data'>{Sabji?.UserName}</td>
                <td className='table-data'>{Sabji?.Email} </td>
                <td className='table-data'>{Sabji?.Mobile} </td>
                <td className='table-data'>{Sabji?.Password} </td>
                <td className='table-data'>{Sabji?.Address} </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> <br /> <br /><br />
    </>
  )
}

export default Admin
