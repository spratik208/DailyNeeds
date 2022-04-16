import { MdOutlineShoppingCart } from 'react-icons/md';
import { Link } from 'react-router-dom';
import logo from "../../images/img5.png"
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
const NavbarSearch = () => {
    const history = useHistory();
    const token = JSON.parse(localStorage.getItem("jwttoken"));
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
            history.push("/")
        }
        else{
            history.push("/login")
        }
    }
   
    const init=()=>{
        if(token){
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
                    <img src={logo} alt="" width="150" height="65" className="d-inline-block align-text-top" />
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
                        <li className="nav-item justify-self-end">
                            <Link className="btn" to={"#"}>Services</Link>
                        </li>
                        <li className="nav-item">
                            <button className=" btn btn-outline-secondary mx-3" onClick={HandleLoginLogout}>{loginbutton}</button>
                        </li>
                        <li className="nav-item">
                        <button className="btn  mx-3" onClick={HandleCart}><MdOutlineShoppingCart></MdOutlineShoppingCart>Cart</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
export default NavbarSearch;