import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faUser, faTimes } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import ForOder from './penal/ForOder'
import Footer from './penal/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../redux/userSlice'
import toast from 'react-hot-toast'

const Order = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(store => store.user);
  // For confirm Login
  const [login, setLogin] = useState(false);
  // For show the Divs
  const showsidebar = (id) => {
    var rsb = document.getElementById(id);
    var r = document.getElementById('rightsidbar');
    var rs = document.getElementById('lpanel');
    var sb = document.getElementById('spanel');
    if (rsb.style.display == 'none') {
      rsb.style.display = 'block';
    }
    else {
      rsb.style.display = 'none';
      r.style.display = 'none';
      rs.style.display = 'none';
      sb.style.display = 'none';
    }
  }
  //Get the Vegitables
  const [VegData, setVegData] = useState([]);
  const GetVegData = async () => {
    const res = await axios.get('http://localhost:4800/Vegitable');
    setVegData(res?.data);
  }
  useEffect(() => {
    GetVegData();
    if (user?.UserName && !user.panel) {
      document.getElementById('userprofile').style.display = 'flex';
      document.getElementById('ooption').style.display = 'none';
      setLogin(true);
    }
    else {
      document.getElementById('ooption').style.display = 'block';
      document.getElementById('userprofile').style.display = 'none';
    }
  }, [user]);
  //Sign in the user
  const [Sign, setSign] = useState({
    UserName: "",
    Email: "",
    Mobile: null,
    Password: "",
    cPassword: "",
    Address: ""
  });
  const ChangSign = (e) => {
    const { name, value } = e.target;
    setSign({
      ...Sign,
      [name]: value
    });
  }
  const SignUser = async () => {
    if (Sign?.Password != Sign?.cPassword) {
      toast.error('Password Does not match');
    }
    else {
      const res = await axios.post('http://localhost:4800/SignUser', Sign);
      toast.success(res?.data);
      setLogin(true);
      dispatch(setUser({
        UserName: Sign?.UserName,
        panel: ''
      }));
      setSign({
        UserName: "",
        Email: "",
        Mobile: null,
        Password: "",
        cPassword: "",
        Address: ""
      });
      var rsb = document.getElementById('ooption');
      var r = document.getElementById('rightsidbar');
      var rs = document.getElementById('lpanel');
      var sb = document.getElementById('spanel');
      var usb = document.getElementById('userprofile');
      if (usb.style.display == 'none') {
        usb.style.display = 'flex';
        rsb.style.display = 'none';
        r.style.display = 'none';
        rs.style.display = 'none';
        sb.style.display = 'none';
      }
      else {
        usb.style.display = 'none';
      }
    }
  }
  //Login the user
  const [Log, setLog] = useState({
    UserName: "",
    Password: ""
  });
  const ChangLog = (e) => {
    const { name, value } = e.target;
    setLog({
      ...Log,
      [name]: value
    });
  }
  const [UserData, setUserData] = useState({});
  const LogUser = async () => {
    var un = document.getElementById('UName').value;
    var psrd = document.getElementById('pswrd').value;
    const res = await axios.get('http://localhost:4800/Login');
    setUserData(res?.data);
    for (let i = 0; i < UserData.length; i++) {
      const CurElem = UserData[i];
      if (un === CurElem?.UserName) {
        if (psrd === CurElem?.Password) {
          dispatch(setUser({
            UserName: un,
            panel: ''
          }));
          setLogin(true);
          var rsb = document.getElementById('ooption');
          var r = document.getElementById('rightsidbar');
          var rs = document.getElementById('lpanel');
          var sb = document.getElementById('spanel');
          var usb = document.getElementById('userprofile');
          if (usb.style.display == 'none') {
            usb.style.display = 'flex';

            rsb.style.display = 'none';
            r.style.display = 'none';
            rs.style.display = 'none';
            sb.style.display = 'none';
          }
          else {
            usb.style.display = 'none';
          }
          break;
        } else {
          toast.error('Incorrect Password');
          break;
        }
      } else if (i === UserData.length - 1) {
        toast.error('You are not our User!\n Please Sign up first');
      }
    }
  }
  //  For Orderr 
  const OrderNow = (id) => {
    if (login) {
      Navigate('/OrderNow', { state: { id, UserName: user?.UserName } });
    }
    else {
      toast.error('Login first before make an order!\nOn Top right Corner!');
    }
  }
  // For Big Orders
  const [BigInputs, setBigInputs] = useState([{ item: "", quantity: "", Rate: 0 }])
  const handleBigInputs = () => {
    setBigInputs([...BigInputs, { item: '', quantity: '', Rate: 0 }])
  }
  const handleBigInputChange = (e, index) => {
    const newBigInputs = [...BigInputs];
    newBigInputs[index][e.target.name] = e.target.value;
    if (e.target.name === 'item') {
      const selectedVeg = VegData.find(veg => veg?.item === e.target.value);
      newBigInputs[index].Rate = selectedVeg ? selectedVeg.Rate : 0;
    }
    setBigInputs(newBigInputs);
  };
  const BigOrderDetail = () => {
    if (login) {
      var model = document.getElementById('BigOrdermodall');
      if (model.style.display === 'none') {
        model.style.display = 'block';
      }
      else {
        model.style.display = 'none';
      }
    }
    else {
      toast.error('Login first before make an order!\nOn Top right Corner!');
    }
  }
  const [bigDetail, setBigDetail] = useState({
    Contact: '',
    Email: '',
    Address: ''
  });
  const handleBigDetailChange = (e) => {
    setBigDetail({
      ...bigDetail, [e.target.name]: e.target.value
    })
  }
  const BigOrderNow = async (e) => {
    e.preventDefault();
    let payment = 0;
    {
      BigInputs?.map((CurElem) => {
        payment = payment + CurElem?.Rate * CurElem?.quantity;
      })
    }
    const fulldetailBigOrder = {
      bigInputs: BigInputs,
      UserName: user?.UserName,
      Contact: bigDetail?.Contact,
      Email: bigDetail?.Email,
      Address: bigDetail?.Address,
      Bill: payment
    }
    const res = await axios.post('http://localhost:4800/BigOrder', fulldetailBigOrder);
    toast.success(res?.data);
    BigOrderDetail();
  }
  return (
    <>
      <div className="orderbody">
        <Navbar />
        {/* For Login Signin Option */}
        <p id='ooption' onClick={() => showsidebar('rightsidbar')}><b>Login/SignUp</b></p>
        <div id='rightsidbar'>
          <span className='closels' onClick={() => showsidebar('rightsidbar')}><FontAwesomeIcon icon={faTimes} /></span>
          <button className='roundshap' onClick={() => showsidebar('lpanel')}>Login</button><br /><br />
          <button className='roundshap' onClick={() => showsidebar('spanel')}>Sign Up</button>
        </div>
        {/* Login Panel */}
        <div id='lpanel'>
          <span className='closels' onClick={() => showsidebar('lpanel')}><FontAwesomeIcon icon={faTimes} /></span>
          Username: <input type="text" className='linput' name='UserName' id='UName' onChange={ChangLog} value={Log.UserName} /> <br />
          Password: <input type="text" className='linput' name='Password' id='pswrd' onChange={ChangLog} value={Log.Password} />
          <span className='fp'>forget password</span>
          <button className='lroundshap' onClick={LogUser}>Login</button>
        </div>
        {/* SignUp panel  */}
        <div id='spanel'>
          <span className='closels' onClick={() => showsidebar('spanel')}><FontAwesomeIcon icon={faTimes} /></span>
          Username: <input type="text" value={Sign.UserName} className='linput' onChange={ChangSign} name='UserName' /> <br />
          Email: <input type="text" value={Sign.Email} className="linput" onChange={ChangSign} name='Email' />
          Mobile: <input type="text" value={Sign.Mobile} className='linput' onChange={ChangSign} name='Mobile' />
          Password: <input type="password" value={Sign.Password} className='linput' onChange={ChangSign} name='Password' />
          Confirm Password: <input type="password" value={Sign.cPassword} className='linput' onChange={ChangSign} name='cPassword' />
          Address: <input type="text" value={Sign.Address} className='linput' onChange={ChangSign} name='Address' />
          <button className='lroundshap' onClick={SignUser}>Sign Up</button>
        </div>
        {/* User Profile */}
        <div id='userprofile'>
          <img src="/img/images.png" alt="" className='userprofilepic' />
          <span>{user?.UserName}</span>
          <button onClick={() => dispatch(setUser({}))}>Logout</button>
        </div>
        {/* Available Vagitables */}
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
                  <td className='order-now' onClick={() => OrderNow(Sabji?._id)}>Order Now</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <br /><br /><br />
        <div>
          {/* For big order */}
          <h1 className='bigtitle'>Make a Big Order</h1>
          {BigInputs.map((CurElem, index) => (
            <div className='big' key={index}>
              <p className='bigitem' >Item :  <select name="item" value={CurElem.item} onChange={(e) => handleBigInputChange(e, index)}>
                <option disabled value="">Select Item</option>
                {VegData?.map((veg, i) => (
                  <option value={veg?.item}>{veg?.item}</option>
                ))}
              </select> </p>
              <p className='bigquan' >Quantity :   <input type="text" className='binput' name='quantity' onChange={(e) => handleBigInputChange(e, index)} value={CurElem.quantity} /> </p>
              <p className='bigquan' >Rate :   <span type="text" className='binput' name='Rate' value={CurElem.Rate}>{CurElem.Rate}</span> </p> <br />
            </div>
          ))}
          <button className='broundshap' onClick={handleBigInputs}>Add More</button><button className='sbroundshap' onClick={BigOrderDetail}>Submit</button>
        </div>
        <br /><br />
        <div className='onbs'>
          <div className='CIBox' style={{ backgroundColor: 'rgb(147, 135, 158)', color: 'black', fontWeight: 'normal' }}>
            <h4>Available Stock:</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi eos ex excepturi facilis et ipsam nulla impedit, dolor accusantium praesentium beatae ut molestiae tenetur at, odio ullam, consectetur omnis!</p>
          </div>
          <div className='CIBox' style={{ backgroundColor: 'rgb(147, 135, 158)', color: 'black', fontWeight: 'normal' }}>
            <h4>Order:</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis facilis cumque consequuntur eos. Sit consequuntur cupiditate soluta enim voluptate dolorum totam necessitatibus ab illo non quo!</p>
          </div>
          <div className='CIBox' style={{ backgroundColor: 'rgb(147, 135, 158)', color: 'black', fontWeight: 'normal' }}>
            <h4>Big Order:</h4>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere harum quidem pariatur velit magni numquam impedit expedita illo sit minus doloremque commodi, nesciunt, temporibus obcaecati</p>
          </div>
        </div> <br />
        <Footer />
      </div>

      <div id='BigOrdermodall' >
        <div className='modal-contantt'>
          <h2>Fill Your Details</h2>
          <form id='custom-formm'>
            <label className='lablll'>Contact Number:</label>
            <input className='inputt' type="text" id='namee' name='Contact' value={bigDetail.Contact} onChange={handleBigDetailChange} required />
            <label className='lablll'>Email:</label>
            <input className='inputt' type="text" id='passwordd' name='Email' value={bigDetail.Email} onChange={handleBigDetailChange} required />
            <label className='lablll'>Ecject Address:</label>
            <input className='inputt' type="text" id='Codee' name='Address' value={bigDetail.Address} onChange={handleBigDetailChange} required />
            <button className='buttonn' id='submitmodal' onClick={BigOrderNow}>Submit</button>
            <button className='buttonn' id='cancel-buttonn' onClick={BigOrderDetail}>Cancel</button>
          </form>
        </div>
      </div>

    </>
  )
}
export default Order