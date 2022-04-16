import { MdOutlineShoppingCart } from 'react-icons/md';
import { Link } from 'react-router-dom';
import logo from "../../images/img5.png"
import { useHistory } from 'react-router-dom';

const NavbarVender = () => {
    const history=useHistory();
   
const HandleLogout=()=>{
    localStorage.clear();
    history.push("/")
}

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
                            <Link className="btn" to={"/aboutus"}>About us</Link>
                        </li>
                        <li className="nav-item justify-self-end">
                            <Link className="btn" to={"/contactus"}>Contact us</Link>
                        </li>
                        <li className="nav-item justify-self-end">
                            <Link className="btn" to={"#"}>Services</Link>
                        </li>
                        <li className="nav-item">
                            <Link className=" btn btn-outline-secondary mx-3" onClick={HandleLogout}>Logout</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
export default NavbarVender;