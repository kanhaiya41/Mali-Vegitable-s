import React from 'react'
import "./App.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import About from './Components/About'
import Contact from './Components/Contact'
import Order from './Components/Order'
import Admin from './Components/penal/Admin'
import Employedetail from './Components/penal/Employedetail'
import SingleAdmin from './Components/penal/SingleAdmin'
import Employee from './Components/penal/Employee'
import Confirm from './Components/penal/Confirm'
import ForOrder from './Components/penal/ForOder';
import SigleUser from './Components/penal/SigleUser'
import WorkAssign from './Components/penal/WorkAssign'
import OrderDetails from './Components/penal/OrderDetail'
import CompletedOrderDetail from './Components/penal/CompletedOrderDetail'
import BigOrders from './Components/penal/BigOrders'
import AssignBigOrders from './Components/penal/AssignBigOrders'
import { Toaster } from 'react-hot-toast';


const App = () => {

  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/About' element={<About />} />
          <Route path='/Contact' element={<Contact />} />
          <Route path='/Order' element={<Order />} />
          <Route path='/AdminPanel' element={<Admin />} />
          <Route path='/EmployeeDetails' element={<Employedetail />} />
          <Route path='/Employee' element={<SingleAdmin />} />
          <Route path='/EmployeePanel' element={<Employee />} />
          <Route path='/Confirm' element={<Confirm />} />
          <Route path='/OrderNow' element={<ForOrder />} />
          <Route path='/UserDetail' element={<SigleUser />} />
          <Route path='/WorkAssign' element={<WorkAssign />} />
          <Route path='/OrderDetail' element={<OrderDetails />} />
          <Route path='/CompletedOrderDetail' element={<CompletedOrderDetail />} />
          <Route path='/Big_Orders' element={<BigOrders />} />
          <Route path='/AssignBigOrders' element={<AssignBigOrders />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App
