import {MdOutlineShoppingCart} from 'react-icons/md';
import {CgProfile} from 'react-icons/cg'
import {FcSearch} from 'react-icons/fc'
import { Link } from 'react-router-dom';
import logo from "../../images/img5.png"
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { url } from '../Common/constants';

import Vegetables from '../Vegetables';
import axios from 'axios';
const Navbar = () => {
const history=useHistory();
const [pname, setname] = useState("")
const [profile, setprofile] = useState("")
    const token=JSON.parse(localStorage.getItem("jwttoken"));
    const [loginbutton, setloginbutton] = useState("");
    const HandleCart = () => {
        console.log(token);
        if (token) {
            history.push("/cart");
        }
        else {
            alert("Please Login First")
        }
    }
    const HandleLoginLogout=()=>{
        if(loginbutton=="Logout"){
            localStorage.clear();
            setloginbutton("Login/Register")
            setprofile("");
            history.push("/")
        }
        else{
            history.push("/login")
        }
    }
    const init=()=>{
        if(token){
          axios.get(`${url}/getinfo`,{headers:{"authorization":`Bearer ${token}`}})
            .then(response => {
            console.log('Printing product data', response.data);
            setprofile(response.data);
        })
        .catch(error => {
            console.log('Something went wrong', error);
        });
            setloginbutton("Logout")
        }
        else{
            setloginbutton("Login/Register")
        }
    }
useEffect(() => {
  init();
}, [])
    
    return (
        <nav className="navbar navbar-expand-lg sticky-top navbar-light bg-light">
            <div className="container">
                <div className="navbar-brand" onClick={()=>{history.push("/")}}>
                <img src= {logo} alt="" width="130" height="65" className="d-inline-block align-text-top"/>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end " id="navbarNav">
                    <ul className="nav">
                    <li className="nav-item">
                        <div className="dropdown">
                            <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                Category
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><button className="dropdown-item" onClick={()=>{history.push("vegetables")}}>Vegetables</button></li>
                                <li><button className="dropdown-item" onClick={()=>{history.push("/fruits")}}>Fruits</button></li>
                                <li><button className="dropdown-item" onClick={()=>{history.push("/dairyproducts")}}>Dairy Product</button></li>
                                <li><button className="dropdown-item" onClick={()=>{history.push("/grocery")}}>Grocery</button></li>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item">
                        <Link className="btn" to={"/aboutus"}>About us</Link>
                    </li>
                    <li className="nav-item justify-self-end">
                        <Link className="btn" to={"/contactus"}>Contact us</Link>
                    </li>
                        <div className="d-flex mx-3">
                            <input className="form-control me-1"  type="search" placeholder="Search" aria-label="Search"value={pname} onChange={(e) => { setname(e.target.value) }}/>
                           <h3 onClick={()=>{history.push(`/search/${pname}`)}}><FcSearch/></h3>
                        </div>
                        <li className="nav-item">
                            <button className=" btn btn-outline-secondary mx-3" onClick={HandleLoginLogout}>{loginbutton}</button>
                        </li>
                        <li className="nav-item">
                        <button className="btn  mx-3" onClick={HandleCart}><MdOutlineShoppingCart></MdOutlineShoppingCart>Cart</button>
                        </li>
                        <li className="nav-item">
                            <div className='fs-5'><CgProfile/></div>
                        <strong>Hello {profile.firstName}</strong>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
export default Navbar;