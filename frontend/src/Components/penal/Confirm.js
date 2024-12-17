import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Confirm = () => {
  const Navigate = useNavigate()
  const location = useLocation();
  const { id } = location.state;
  const { message } = location.state;
  const { big } = location.state;
  const [EmployeeData, setEmployeeData] = useState({});
  const GetData = async () => {
    try {
      if (!big) {
        const res = await axios.get(`http://localhost:4800/GetSingleOrder/${id}`);
        setEmployeeData(res.data);
      }
      else {
        const res = await axios.get(`http://localhost:4800/GetSingleBigOrder/${id}`);
        setEmployeeData(res.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    GetData();
  }, [id]);
  const [ConfirmCode, setConfirmCode] = useState("");
  const Confirmation = async () => {
    const Code = ConfirmCode;
    if (message === Code) {
      toast.success("done");
      if (!big) {
        const res = await axios.post('http://localhost:4800/CompleteWorkNow', EmployeeData);
      }
      else {
        const res = await axios.post('http://localhost:4800/CompleteBidWorkNow', EmployeeData);
      }
    }
    else {
      toast.error("incorrect Code!");
    }
  }
  return (
    <><br /><br />
      <div className='ConfirmCard'>
        <h1>Confirmation Panel</h1>
        Enter Confirmation Code: <br />
        <input type="text" className='vinput' value={ConfirmCode} onChange={(e) => setConfirmCode(e.target.value)} /> <br /> <br />
        <h4>Details:</h4>
        <div className='customdetail'>
          <p>Username: <br />
            {EmployeeData.Customer}</p>

          <p>Total bill:<br />
            Rs. {EmployeeData.Bill}</p>
        </div>

        <button className='ordrdelvr' onClick={Confirmation}>Order Delivered</button>
      </div>
    </>
  )
}

export default Confirm
