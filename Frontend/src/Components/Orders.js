import axios from "axios";
import { useEffect, useState } from "react";
import { url } from "./Common/constants";

const Orders = () => {
  const [items, setitems] = useState([]);
  const token = JSON.parse(localStorage.getItem("jwttoken"));
  // const HandleOrder=()=>{
  //     localStorage.setItem("Total",total);
  //     console.log(localStorage.getItem("Total"))
  //     history.push("/deliveryaddress")
  // }

  useEffect(() => {
    init();
  }, []);
  const init = () => {
    axios
      .get(url + "/getorders", {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("Printing product data", response.data);
        setitems(response.data);
      })
      .catch((error) => {
        console.log("Something went wrong", error);
      });
  };

  return (
    <>
      <div className="container">
        <div className="row g-1 my-3 fw-bold border">
          <div className="col-2">orderId</div>
          <div className="col-2">Name</div>
          <div className="col-5">Address</div>
          <div className="col-1">Contact</div>
          <div className="col-1">Total Price</div>
          <div className="col-1">status</div>
        </div>
        {items.map((item) => (
          <div className="row g-1 border border-4" key={item.id}>
            <div className="col-2"> {item.orderId} </div>
            <div className="col-2"> {item.fullName} </div>
            <div className="col-5">
              {" "}
              {item.line1}, {item.line2}, {item.city}, {item.state},{" "}
              {item.pincode}.{" "}
            </div>
            <div className="col-1"> {item.contact} </div>
            <div className="col-1"> {item.totalAmount} </div>
            <div className="col-1"> {item.status} </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Orders;
