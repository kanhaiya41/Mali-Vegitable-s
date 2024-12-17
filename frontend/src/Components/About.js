import React, { useState } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Footer from './penal/Footer'
import { setUser } from '../redux/userSlice';
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast';

const About = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  // For Admin Login
  const Admin = () => {
    var model = document.getElementById('Adminmodall');
    if (model.style.display === 'none') {
      model.style.display = 'block';
      document.body.classList.add('panel');
    }
    else {
      model.style.display = 'none';
      document.body.classList.remove('panel');
    }

  }
  const [AdminDetail, setAdminDetail] = useState({
    AUserName: "",
    APassword: ""
  })
  const AdminChange = (e) => {
    setAdminDetail({
      ...AdminDetail,
      [e.target.name]: e.target.value
    })
  }
  const AdminLogin = async (e) => {
    e.preventDefault();
    const UserName = AdminDetail.AUserName;
    const Password = AdminDetail.APassword;
    const res = await axios.get(`https://mali-vegitable-s-3.onrender.com/AdminLogin/${UserName}`);

    const Result = res.data;
    if (Result && Result.UserName === UserName) {
      if (Result.Password === Password) {
        Navigate('/AdminPanel');
        dispatch(setUser({ UserName, panel: 'admin' }));
        Admin();
        toast.success('Welcome Back Master');
      }
      else {
        toast.error('incorrect Password');
      }
    }
    else {
      toast.error('You are not Admin!');
    }
  }
  // For Employee Login 
  const Employee = () => {
    var model = document.getElementById('Employemodall');
    if (model.style.display === 'none') {
      model.style.display = 'block';
      document.body.classList.add('panel');
    }
    else {
      model.style.display = 'none';
      document.body.classList.remove('panel');
    }

  }
  const [EmployeeDetail, setEmployeeDetail] = useState({
    EUserName: "",
    EPassword: "",
    ECode: ""
  })
  const EmployeeChange = (e) => {
    setEmployeeDetail({
      ...EmployeeDetail,
      [e.target.name]: e.target.value
    })
  }
  const EmployeeLogin = async (e) => {
    e.preventDefault();
    const UserName = EmployeeDetail.EUserName;
    const Password = EmployeeDetail.EPassword;
    const Code = EmployeeDetail.ECode;
    const res = await axios.get(`https://mali-vegitable-s-3.onrender.com/EmployeeLogin/${UserName}`);
    const Result = res?.data;
    if (Result && Result.UserName === UserName) {
      if (Result.Password === Password) {
        if (Result.Code === Code) {
          dispatch(setUser({ UserName, panel: 'employe' }));
          Navigate('/EmployeePanel');
          Employee();
          toast.success(`Welcome back ${UserName}`);
        }
        else {
          toast.error('Incorrect Employee Code')
        }
      }
      else {
        toast.error('incorrect Password');
      }
    }
    else {
      toast.error('You are not our Employee!');
    }
  }
  return (
    <>
      <div id='AboutBody'>
        <Navbar />
        <div className='Aboutone'>
          <h1 className='MLAP'><b>Mali Vagitable's</b></h1>
          <div className='subAboutoneF'>
            <p className='bio'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, omnis repellendus maxime laudantium porro sed consequatur expedita neque, ratione, doloribus soluta illo id. Ea maiores ipsam minima error. Quam, possimus!</p>
            <p><video width="560" height="315" controls poster='/img/Poster.png' src="https://www.youtube.com/watch?v=NVrP3TzX_Jo"></video></p>
          </div>
        </div>
        <div className='ofocus'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, laudantium at beatae quasi optio corrupti, inventore dolore rerum autem dicta tenetur consectetur atque maxime repellat repudiandae, incidunt culpa. Ea, omnis?
          </p>
          <h2><b>Our focus</b></h2>
        </div>
        <div className='Abouttwo'>
          <div className='subAboutone'><img src="/img/veg1.jpeg" alt="" className='sbaoi' /><p className='sbaop'> <h1>Seasonal Vegetable Guide</h1> Benefits of eating seasonal vegetables.
            Recipes using seasonal vegetables.
            How to store seasonal vegetables properly.</p></div> <br />
          <div className='subAboutone'><p className='sbaop'> <h1>Health Benefits of Different Vegetables</h1> Nutritional value and health benefits of common vegetables.
            Superfoods: Vegetables that pack a punch.
            Vegetables for specific health conditions (e.g., leafy greens for heart health).
          </p><img className='sbaoi' src="/img/veg3.jpeg" alt="" /></div> <br />
          <div className='subAboutone'><img className='sbaoi' src="/img/veg2.jpeg" alt="" /><p className='sbaop'> <h1>Gardening Tips for Beginners</h1> How to start a vegetable garden.
            Best vegetables to grow at home.
            Tips for maintaining a healthy vegetable garden.</p></div> <br />
          <div className='subAboutone'><p className='sbaop'> <h1>Vegetable-Based Recipes</h1>Quick and easy vegetable recipes.
            Vegetarian and vegan meal ideas.
            Kid-friendly vegetable dishes.</p><img className='sbaoi' src="/img/veg4.jpeg" alt="" /></div>
        </div>
        <h2 style={{ paddingLeft: '5%' }}><b>Who we are</b></h2> <br />
        <div className='subAboutone1'>
          <div>
            <img src="/img/3d1.jpeg" className='vii' alt="" /> <br /> <br />
            <p className='CIW'>Banifits</p>
            <p>Good Vegitable Make you Healthy.</p>
          </div>
          <div>
            <img src="/img/3d2.jpeg" className='vii' alt="" /> <br /> <br />
            <p className='CIW'>Good Health</p>
            <p>Good Health Make you Strong.</p>
          </div>
          <div>
            <img src="/img/3d3.jpeg" className='vii' alt="" /> <br /> <br />
            <p className='CIW'>Strong Borns</p>
            <p>Healthy Vegitable's make Your Borns Strong.</p>
          </div>
        </div> <br /> <br /><br />
        <div className='subAboutonev'>
          <img src="/img/veg5.jpeg" className='sbaoii' alt="" />
          <p className='sbaop'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            In consequatur ipsa accusamus voluptate ullam quam labore
            quaerat, aperiam assumenda dolore aliquam eaque quas ea
            autem suscipit dolor nemo velit? Ad?</p>
        </div>
        <div>
          <h2 className='wwsa'><b>What we serve</b></h2>
          <div className='big'>
            <p className='wwsa'>
              <p className='wwsab'>Fresh Seasonal Vegetables </p>
              We pride ourselves on offering a diverse selection of seasonal vegetables. By sourcing locally and supporting sustainable farming practices, we ensure that you get the freshest produce that’s bursting with flavor and nutrition. From crisp lettuce and juicy tomatoes to hearty root vegetables, our selection changes with the seasons, bringing you the best nature has to offer.
            </p>
            <p className='wwsa'><p className='wwsab'>Organic Options</p>
              For those who prefer organic produce, we have a dedicated section featuring a variety of organically grown vegetables. These vegetables are free from synthetic pesticides and fertilizers, ensuring that you and your family can enjoy them with peace of mind. Look for the organic label on our shelves to find these premium options.</p>
            <p className='wwsa'><p className='wwsab'>Exotic and Hard-to-Find Vegetables</p>
              Looking to add a unique twist to your meals? Explore our range of exotic and hard-to-find vegetables. Whether you’re searching for fresh artichokes, purple cauliflower, or dragon beans, we strive to bring you a world of flavors that can inspire your culinary creativity.</p>
          </div>
          <div className='big'>
            <p className='wwsa'>
              <p className='wwsab'>Pre-Cut and Ready-to-Cook </p>
              We understand that convenience is key in today’s busy world. That’s why we offer a selection of pre-cut and ready-to-cook vegetables. Perfect for quick meal preparation, our pre-cut veggies save you time without compromising on quality. Simply grab, cook, and enjoy!
            </p>
            <p className='wwsa'><p className='wwsab'>Herbs and Greens</p>
              No meal is complete without a touch of freshness from herbs and greens. We offer a variety of fresh herbs such as basil, cilantro, and rosemary, along with an assortment of leafy greens like spinach, kale, and arugula. These nutrient-rich additions can elevate any dish and are perfect for salads, smoothies, and more.</p>
            <p className='wwsa'><p className='wwsab'>Locally Sourced Produce</p>
              Supporting local farmers is at the heart of our mission. We partner with nearby farms to bring you vegetables that are harvested at their peak and delivered to our store quickly. This not only ensures superior freshness but also supports our local community and reduces our carbon footprint.</p>
          </div>
        </div>
        <div id='AboutContent'>
          <div className='fstf'>
            <br />
            <h3><b>For staff</b></h3>
            <p><b className='panel' onClick={Admin}> <span className='orange'><b>></b></span> Admin</b> <b className='panel' onClick={Employee}> <span className='orange'><b>></b></span> employee</b></p>
            <br />
          </div>
          <div className='smore'>
            <h2><b>Some more :-</b></h2>
            <p>
              At our vegetable store, we pride ourselves on offering the freshest produce, sourced directly from local farms to ensure top quality and taste. With a wide variety of seasonal and exotic vegetables, we cater to all culinary preferences and dietary needs. Our commitment to sustainability is reflected in our organic options and eco-friendly practices. We strive to provide a convenient shopping experience with both in-store and online options, along with home delivery services. Our knowledgeable staff is always available to assist, offering valuable tips on storage, preparation, and cooking. Competitive pricing, regular promotions, and customer loyalty programs further enhance the value we provide. By shopping with us, you support local farmers and contribute to the community's well-being. Our focus on health and wellness ensures that you have access to nutrient-rich options for a balanced lifestyle.
            </p>
            <h3>The Mali Vegitable's</h3>
          </div>

        </div>
      </div>
      <Footer />
      <div id='Adminmodall'>
        <div className='modal-contantt'>
          <h2>Fill Your Details</h2>
          <form id='custom-formm'>
            <label className='lablll'>Name:</label>
            <input className='inputt' type="text" id='namee' name='AUserName' value={AdminDetail.AUserName} onChange={AdminChange} required />

            <label className='lablll'>Password:</label>
            <input className='inputt' type="text" id='passwordd' name='APassword' value={AdminDetail.APassword} onChange={AdminChange} required />
            <span className='fpc'>forget password</span>
            <button className='buttonn' id='submitmodal' onClick={AdminLogin}>Submit</button>
            <button className='buttonn' id='cancel-buttonn' onClick={Admin}>Cancel</button>
          </form>
        </div>
      </div>
      <div id='Employemodall' >
        <div className='modal-contantt'>
          <h2>Fill Your Details</h2>
          <form id='custom-formm'>
            <label className='lablll'>Name:</label>
            <input className='inputt' type="text" id='namee' name='EUserName' value={EmployeeDetail.EUserName} onChange={EmployeeChange} required />
            <label className='lablll'>Password:</label>
            <input className='inputt' type="text" id='passwordd' name='EPassword' value={EmployeeDetail.EPassword} onChange={EmployeeChange} required />
            <label className='lablll'>Employee Code:</label>
            <input className='inputt' type="text" id='Codee' name='ECode' value={EmployeeDetail.ECode} onChange={EmployeeChange} required />
            <span className='fpc'>forget password</span>
            <button className='buttonn' id='submitmodal' onClick={EmployeeLogin}>Submit</button>
            <button className='buttonn' id='cancel-buttonn' onClick={Employee}>Cancel</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default About
