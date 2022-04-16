import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Login.css"
import { useParams } from "react-router-dom";
import { url } from "./Common/constants";
import axios from "axios";
import { useHistory } from "react-router-dom";
const ProductDetails = () => {
    const { id } = useParams();
    const [item, setitem] = useState("")
    const token = JSON.parse(localStorage.getItem("jwttoken"));
    const [productId, setproductId] = useState(id);
    const [quantity, setquantity] = useState(1);
    const history = useHistory();
    let total=0;
    const HandleAddCart = () => {
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
        const category = "FRUITS"
        axios.get(url + "/getproduct/" + id, { headers: { "authorization": `Bearer ${token}` } })
            .then(response => {
                console.log('Printing product data', response.data);
                setitem(response.data);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });
    }

    const HandleBuy = () => {
        total=parseInt(item.rate)*parseInt(quantity);
        console.log(total)
        localStorage.setItem("Total",total);
        console.log(localStorage.getItem("Total"))
        history.push("/deliveryaddress")
    }
    return (
        <div className="container">
            <div class="text-center">
                <img src={item.imageUrl} height={200} width={200} class="rounded" alt="..." />
            </div>
            <div className="my-3">
                <strong >{item.name}</strong>
            </div>
            <div className="my-3">
                <strong >{item.rate}</strong>
            </div>
            <div className="row">
              
                <div className="col-6 text-end">Qty : </div>
                <div className="col-2">
                    <input type="number" className="form-control" id="qty" value={quantity} onChange={(e) => { setquantity(e.target.value) }} />
                </div>
            </div>
            <div className="my-3">
                <button className="btn btn-primary mx-5" onClick={() => { HandleAddCart() }} >Add TO Cart</button>
                <button className="btn btn-primary mx-5" onClick={()=>{HandleBuy()}}>Buy Now</button>
            </div>
            <div>
                <p className="card-text">{item.description}</p>
            </div>
        </div>
    )
}
export default ProductDetails;