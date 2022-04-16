import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { url } from "./Common/constants";

const Cart = () => {
  const history = useHistory();
  let total = 0;

  const [items, setitems] = useState([]);
  const [user, setuser] = useState("");
  const token = JSON.parse(localStorage.getItem("jwttoken"));

  const HandleOrder = () => {
    localStorage.setItem("Total", total);
    console.log(localStorage.getItem("Total"));
    history.push("/deliveryaddress");
  };

  const HandleIncreaseQuantity = (id) => {
    axios
      .put(url + "/increasequantity/" + id, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("Printing product data", response.data);
        init();
      })
      .catch((error) => {
        console.log("Something went wrong", error);
      });
  };

  const HandleDecreaseQuantity = (id) => {
    axios
      .put(url + "/decreasequantity/" + id, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("Printing product data", response.data);
        init();
      })
      .catch((error) => {
        console.log("Something went wrong", error);
      });
  };

  const HandleRemove = (id) => {
    axios
      .delete(url + "/productremovefromcart/" + id, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("Printing product data", response.data);
        init();
      })
      .catch((error) => {
        console.log("Something went wrong", error);
      });
  };

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    axios
      .get(url + "/getcartproducts", {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("Printing product data", response.data, total);
        setitems(response.data);
      })
      .catch((error) => {
        console.log("Something went wrong", error);
      });
    axios
      .get(url + "/getinfo", { headers: { authorization: `Bearer ${token}` } })
      .then((response) => {
        console.log("Printing product data", response.data);
        setuser(response.data);
      })
      .catch((error) => {
        console.log("Something went wrong", error);
      });
  };

  return (
    <>
      <div className="container">
        <div className="">
          <button
            onClick={() => {
              history.push("/order");
            }}
            className="btn btn-primary"
          >
            My Orders
          </button>
        </div>
        <div className="row g-1 my-3 fw-bold border">
          <div className="col-1"></div>
          <div className="col-2">Title</div>
          <div className="col-2">qty</div>
          <div className="col-2">rate</div>
          <div className="col-2">Total Price</div>
        </div>
        {items.map((item) => (
          <div className="row g-1 border border-4" key={item.id}>
            <div className="col-1">
              <img src={item.imageUrl} height={25} width={25} />
            </div>
            <div className="col-2">{item.name}</div>
            <div className="col-2">
              <button
                className="btn"
                onClick={() => {
                  HandleIncreaseQuantity(item.id);
                }}
              >
                +
              </button>
              {item.quantity}
              <button
                className="btn"
                onClick={() => {
                  HandleDecreaseQuantity(item.id);
                }}
              >
                -
              </button>
            </div>
            <div className="col-2">{item.rate}</div>
            <div className="col-2">
              {parseInt(item.quantity) * parseInt(item.rate)}
            </div>
            <div className="col-1 " hidden>
              {(total = total + parseInt(item.quantity) * parseInt(item.rate))}
            </div>
            <div className="col-2">
              <button
                className="btn btn secondary"
                onClick={() => {
                  HandleRemove(item.id);
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <div className="text-end fw-bold fs-5 m-5 px-5">Total : {total}</div>
      </div>
      <div>
        <button className="btn btn-primary fw-bold fs-4" onClick={HandleOrder}>
          Place Order
        </button>
      </div>
    </>
  );
};
export default Cart;
