import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';

const AssignBigOrders = () => {
  const location = useLocation();
  const Navigate = useNavigate();
  const { UserName } = location.state;
  const [BigOrders, setBigOrders] = useState([]);
  const GetBigOrders = async () => {
    const res = await axios.get('http://localhost:4800/FindBigOrders');
    setBigOrders(res.data);
  }
  useEffect(() => {
    GetBigOrders();
  }, []);
  const [idDats, setIdDatas] = useState([]);
  const RadioChange = async (id) => {
    setIdDatas(
      [...idDats, id]
    )
  }
  const AssignNow = async () => {
    const res = await axios.post('http://localhost:4800/FindBigOrderforAssign', {
      ids: idDats
    })
    const workDataArray = res.data;

    const assignWorkArray = workDataArray.map((curElem) => {
      const bigInputsArray = curElem.bigInputs.map(big => ({
        item: big.item,
        quantity: big.quantity,
        Rate: big.Rate,
      }));
      return {
        bigInputs: bigInputsArray,
        Employee: UserName,
        Customer: curElem.UserName,
        Contact: curElem.Contact,
        Email: curElem.Email,
        Address: curElem.Address,
        Bill: curElem.Bill,
        Assign: "Assigned"
      }
    });
    const response = await axios.post('http://localhost:4800/AssignbigOrderNow', assignWorkArray);
    toast.success(response.data);
    Navigate('/WorkAssign');
  }
  return (
    <>
      {/* User Profile */}
      <div id='userprofile' style={{ display: 'block' }}>
        <img src="/img/images.png" alt="" className='userprofilepic' />
        <p>{UserName}</p>
      </div><br /><br /><br /><br /><br /> <br /> <br />

      <div className='allbigorders'>
        <h1>Big Order Assign Panel</h1>
        {BigOrders.map((CurElem) => (
          <div className='bigOrderCard'>
            UserName: {CurElem.UserName} <br />
            Mobile: 1477852369 <br />
            Email: kanhaiya@gmail.com <br />
            Address: kapasan,talab k pas jdf <br />
            Bill: 456 Rupees <br />
            <div className='bbbbbbbbbb'>
              {CurElem.bigInputs.map((bigInput) => (
                <div>
                  Item: {bigInput.item} <br />
                  Quantity: {bigInput.quantity} kg <br />
                  Rate: {bigInput.Rate} rupees/kg
                </div>
              ))} <br />
              <p>Assign: <input type="radio" value={CurElem._id} onChange={() => RadioChange(CurElem._id)} /></p>
            </div>
          </div>
        ))}
      </div><br />
      <button className='Asgnbtn' onClick={AssignNow}><h1>Assign Now</h1></button>
      <br /> <br />
    </>
  )
}

export default AssignBigOrders
