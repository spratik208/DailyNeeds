import logo from './logo.svg';
import './App.css';
import "@stripe/stripe-js";
import HomePage from './Components/HomePage';
import Navbar from './Components/Navbar/Navbar';
import Login from './Components/Login';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Register from './Components/Register';
import ForgotPassword from './Components/ForgotPassword';
import Grocery from './Components/Grocery';
import Fruits from './Components/Fruits';
import ProductDetails from './Components/ProductDetails';
import DairyProducts from './Components/Dairy';
import Vegetables from './Components/Vegetables';
import Aboutus from './Components/Aboutus';
import Contactus from './Components/Contactus';
import NavbarLoginRegister from './Components/Navbar/NavbarLoginRegister';
import AdressAndPaymentMethod from './Components/AdressAndPaymentMethod';
import Cart from './Components/Cart';
import VendorHome from './Components/VendorHome';
import AddProduct from './Components/AddProducts';
import NavbarVender from './Components/Navbar/NavbarVender';
import Products from './Components/Products';
import NavbarSearch from './Components/Navbar/NavbarSearch';
import Orders from './Components/Orders';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <Navbar/>
          <HomePage/>
        </Route>
        {/* <Route exact path='/authhome'>
        <NavbarAfterLogin/>
        <HomePage/>
        </Route> */}
        <Route exact path='/login'>
        <NavbarLoginRegister/>
          <Login/>
        </Route>
        <Route exact path='/register'>
        <NavbarLoginRegister/>
        <Register/>
        </Route>
        <Route exact path='/cart'>
        <NavbarLoginRegister/>
          <Cart/>
        </Route>
        <Route exact path='/order'>
        <NavbarLoginRegister/>
          <Orders/>
        </Route>
        <Route exact path='/deliveryaddress'>
        <Navbar/>
          <AdressAndPaymentMethod/>
        </Route>
        <Route exact path='/vendorhome'>
        <NavbarVender/>
          <VendorHome/>
        </Route>
        <Route exact path='/forgotpassword'>
          <ForgotPassword/>
        </Route>
        <Route exact path='/grocery'>
          <Navbar/>
          <Grocery/>
        </Route>
        {/* <Route exact path='/authgrocery'>
          <NavbarAfterLogin/>
          <Grocery/>
        </Route> */}
        <Route exact path='/fruits'>
          <Navbar/>
          <Fruits/>
        </Route>
        {/* <Route exact path='/authfruits'>
          <NavbarAfterLogin/>
          <Fruits/>
        </Route> */}
        <Route exact path='/vegetables'>
          <Navbar/>
          <Vegetables/>
        </Route>
        {/* <Route exact path='/authvegetables'>
          <NavbarAfterLogin/>
          <Vegetables/>
        </Route> */}
        <Route exact path='/dairyproducts'>
          <Navbar/>
          <DairyProducts/>
        </Route>
        {/* <Route exact path='/authdairyproducts'>
          <NavbarAfterLogin/>
          <DairyProducts/>
        </Route> */}
        <Route exact path='/aboutus'>
          <Navbar/>
          <Aboutus/>
        </Route>
        <Route exact path='/contactus'>
          <Navbar/>
          <Contactus/>
        </Route>
        <Route exact path='/addproduct'>
          <Navbar/>
          <AddProduct/>
        </Route>
        <Route exact path='/product/:id'>
          <Navbar/>
          <ProductDetails/>
        </Route>
        <Route exact path='/search/:pname'>
          <NavbarSearch/>
          <Products/>
        </Route>
        {/* <Route exact path='/authsearch/:pname'>
          <NavbarAfterLogin/>
          <Products/>
        </Route> */}
        <Route exact path='/addproduct/:id'>
        <Navbar/>
          <AddProduct/>
        </Route>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
