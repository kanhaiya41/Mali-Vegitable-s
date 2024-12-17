import React, { useEffect, useState } from 'react'
import AdminNav from './AdminNav'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';

const Employedetail = () => {
  const Navigate = useNavigate();
  // for Employe Registresion
  const [Employee, setEmployee] = useState({
    UserName: "",
    Password: "",
    Code: "",
    Mobile: null,
    Email: "",
    DOB: null,
    Gender: "",
    Address: "",
    Qualification: "",
    Experience: "",
    Licence: "",
    Aadhar: null
  });
  const ChangeVegValue = (e) => {
    setEmployee({
      ...Employee,
      [e.target.name]: e.target.value
    }
    )
  }
  const AddEmployee = async (e) => {
    e.preventDefault();
    const res = await axios.post('https://mali-vegitable-s-3.onrender.com/AdminRegistration', Employee);
    toast.success(res.data);
    setEmployee({
      UserName: "",
      Password: "",
      Code: "",
      Mobile: null,
      Email: "",
      DOB: null,
      Gender: "",
      Address: "",
      Qualification: "",
      Experience: "",
      Licence: "",
      Aadhar: null
    });
  }
  //Get the Employees
  const [EmployeData, setEmployeData] = useState([]);
  const GetEmployeData = async () => {
    const res = await axios.get('https://mali-vegitable-s-3.onrender.com/FindEmployee');

    setEmployeData(res.data);
  }
  useEffect((req, res) => {
    GetEmployeData();
  }, []);
  return (
    <>
      <AdminNav />
      <div className='form'>
        <h4>Register a new Employee</h4>
        UserName: <br />
        <input type="text" className='vinput' name='UserName' onChange={ChangeVegValue} value={Employee.UserName} placeholder='Make UserName' /> <br />
        Password: <br />
        <input type="text" className='vinput' name='Password' onChange={ChangeVegValue} value={Employee.Password} placeholder='Make a Strong Password' /><br />
        Employee Code: <br />
        <input type="text" className='vinput' name='Code' onChange={ChangeVegValue} value={Employee.Code} placeholder='Generate a Employee Code' /><br />
        Mobile: <br />
        <input type="Number" className='vinput' name='Mobile' onChange={ChangeVegValue} value={Employee.Mobile} placeholder='Mobile number' /><br />
        Email:<br />
        <input type="text" className='vinput' name='Email' onChange={ChangeVegValue} value={Employee.Email} placeholder='Email Address' /><br />
        Date-of-Birth:<br />
        <input type="Date" className='vinput' name='DOB' onChange={ChangeVegValue} value={Employee.DOB} placeholder='Date-of-birth' /><br />
        Gender:<br />
        <span>Male:</span><input type="Radio" className='' name='Gender' onChange={ChangeVegValue} value='Male' />
        <span className='gndr'>Female:</span><input type="Radio" className='' name='Gender' onChange={ChangeVegValue} value='Female' />
        <span className='gndr'>Others:</span><input type="Radio" className='' name='Gender' onChange={ChangeVegValue} value='Others' /> <br />
        Address:<br />
        <input type="text" className='vinput' name='Address' onChange={ChangeVegValue} value={Employee.Address} placeholder='Permanent address' /><br />
        Qualification:<br />
        <input type="text" className='vinput' name='Qualification' onChange={ChangeVegValue} value={Employee.Qualification} placeholder='Graduate/12th/10th' /><br />
        Experience:<br />
        <input type="text" className='vinput' name='Experience' onChange={ChangeVegValue} value={Employee.Experience} placeholder='field expirence' /><br />
        Driving Licence:<br />
        Yes*<input type="Radio" className='' name='Licence' onChange={ChangeVegValue} value='Yes' />
        <span className='gndr'>No*</span><input type="Radio" className='' name='Licence' onChange={ChangeVegValue} value='No' /><br />
        Aadhar No:<br />
        <input type="text" className='vinput' name='Aadhar' onChange={ChangeVegValue} value={Employee.Aadhar} placeholder='Adhar number' /><br />
        <button className='adveg' onClick={AddEmployee}>Add Employee</button>
      </div> <br /> <br />
      {/* List of Employees */}
      <h1 className='avstock' >List of Employees</h1>
      <div className='tabled'>
        <table className='sotable'>
          <thead>
            <tr className='table-th'>
              <th className='table-head'>S.N.</th>
              <th className='table-head'>UserName</th>
              <th className='table-head'>Mobile</th>
              <th className='table-head'>Address</th>
              <th className='table-head'>Details</th>
              <th className='table-head'>Action</th>
            </tr>
          </thead>
          <tbody>
            {EmployeData.map((Sabji, index) => (
              <tr className='table-row'>
                <td className='table-data'>{index + 1}</td>
                <td className='table-data'>{Sabji.UserName}</td>
                <td className='table-data'>{Sabji.Mobile}</td>
                <td className='table-data'>{Sabji.Address}</td>
                <td className='order-now' onClick={() => Navigate("/Employee", { state: { id: Sabji._id } })}>Cheack</td>
                <td className='order-now' onClick={() => Navigate('/WorkAssign', { state: { id: Sabji._id } })}>Assign</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br /> <br /><br /><br />
    </>
  )
}

export default Employedetail
