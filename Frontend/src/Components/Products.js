import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Login.css"
import { useHistory } from "react-router-dom";
import axios from "axios";
import { url } from "./Common/constants";
import { useParams } from "react-router-dom";


const Products = () => {
    const [products, setproducts] = useState([]);
    const [quantity, setquantity] = useState(1);
    const {pname}=useParams() 
    const [name, setname] = useState(pname);
    const history = useHistory();
    const token = JSON.parse(localStorage.getItem("jwttoken"));
    const HandleAddCart = (productId) => {
        if (token) {
            const itemcart = {
                productId,
                quantity
            }
            axios.post(url + "/addtocart", itemcart, { headers: { "authorization": `Bearer ${token}` } })
                .then(response => {
                    console.log('Printing product data', response.data);
                    alert("product Added Successfully")
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                });
        }
        else {
            alert("please Login First")
        }
    }
    useEffect(() => {
        init();
    }, [])
    const init = () => {
        axios.get(url + "/searchproducts/"+name )
            .then(response => {
                console.log('Printing product data', response.data);
                setproducts(response.data);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });
    }

    return (
        <>
            <div className="container">
                <div className="d-flex m-3">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={name} onChange={(e) => { setname(e.target.value) }}/>
                    <button className="btn btn-outline-secondary" onClick={init}>Search</button>
                </div>
                <div className="row g-3">
                    {products.map((item) => (
                        <div className="col-4">
                            <div className="card " key={item.id}>
                                <div onClick={() => history.push(`/product/${item.id}`)}>

                                    <img src={item.imageUrl} height={150} width={25} className="px-5 card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.name}</h5>
                                        <p className="card-text description-box overflow-auto">{item.description}</p>
                                        <h5>{item.rate} Rs.</h5>
                                    </div>
                                </div>
                                <button className="btn btn-primary" onClick={() => { HandleAddCart(item.id) }}>Add TO Cart</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
export default Products;