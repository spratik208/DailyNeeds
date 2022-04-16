import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { url } from "./Common/constants";
import axios

from "axios";
const VendorHome = () => {
    const token=JSON.parse(localStorage.getItem("jwttoken"));
    const history = useHistory();
    const [user, setuser] = useState("");
    const [items, setitems] = useState([])
    const HandleRemove=(id)=>{
        axios.delete(url + "/productremove/"+id,{headers:{"authorization":`Bearer ${token}`}})
        .then(response => {
            console.log('Printing product data', response.data);
            init();
        })
        .catch(error => {
            console.log('Something went wrong', error);
        })
    }
    useEffect(() => {
        init();
      }, [])
    const init=()=>{
        axios.get(url + "/allvendorproducts",{headers:{"authorization":`Bearer ${token}`}})
        .then(response => {
            console.log('Printing product data', response.data);
            setitems(response.data);
        })
        .catch(error => {
            console.log('Something went wrong', error);
        });
        axios.get(url + "/getinfo",{headers:{"authorization":`Bearer ${token}`}})
        .then(response => {
            console.log('Printing product data', response.data);
            setuser(response.data);
        })
        .catch(error => {
            console.log('Something went wrong', error);
        });
    }
   
    
    return (
        <>

            <div className="container">
                <div className="row">
                    <div className="col">
                        <div><strong>{user.firstName} {user.lastName}</strong></div>
                        <div><strong>{user.email}</strong></div>
                    </div>
                    <div className="col">
                        <Link className="btn btn-primary fw-bold fs-4" to={"/addproduct"}>Add Products</Link>
                    </div>
                </div>
                <div className="row g-1 my-3 fw-bold border">
                    <div className="col-1"></div>
                    <div className="col-4">Title</div>
                    <div className="col-1">qty</div>
                    <div className="col-2">rate</div>
                    <div className="col-2">Total Price</div>
                </div>
                {items.map((item) => (
                    <div className="row g-1 border border-4" key={item.id}>
                        <div className="col-1"><img src={item.imageUrl} height={25} width={25} /></div>
                        <div className="col-4">{item.name}</div>
                        <div className="col-1">{item.quantity}</div>
                        <div className="col-2">{item.rate}</div>
                        <div className="col-2"><button className="btn btn secondary" onClick={()=>{history.push(`/addproduct/${item.id}`)}}>Edit</button></div>
                        <div className="col-2"><button className="btn btn secondary" onClick={()=>{HandleRemove(item.id)}}>Remove</button></div>
                    </div>
                ))}
            </div>

        </>
    )
}

export default VendorHome