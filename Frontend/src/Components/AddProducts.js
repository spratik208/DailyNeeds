import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { url } from "./Common/constants";

const AddProduct = () => {
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [quantity, setquantity] = useState("");
  const [rate, setrate] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setcategory] = useState("");
  const [button, setbutton] = useState("Add Product");
  const { id } = useParams();
  const history = useHistory();
  const token = JSON.parse(localStorage.getItem("jwttoken"));
  const init = () => {
    if (id) {
      axios
        .get(url + "/getproduct/" + id, {
          headers: { authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log("Printing product data", response.data);
          setname(response.data.name);
          setImageUrl(response.data.imageUrl);
          setcategory(response.data.category);
          setquantity(response.data.quantity);
          setrate(response.data.rate);
          setdescription(response.data.description);
          setbutton("Confirm");
        })
        .catch((error) => {
          console.log("Something went wrong", error);
        });
    }
  };
  useEffect(() => {
    init();
  }, []);

  const HandleAddProduct = () => {
    if (id) {
      console.log(id);
      const product = {
        id,
        name,
        imageUrl,
        description,
        rate,
        quantity,
        category,
      };
      axios
        .put(url + "/editproduct", product, {
          headers: { authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log("Printing product data", response.data);
          history.goBack();
        })
        .catch((error) => {
          console.log("Something went wrong", error);
        });
    } else {
      const product = {
        name,
        imageUrl,
        description,
        rate,
        quantity,
        category,
      };
      axios
        .post(url + "/addproduct", product, {
          headers: { authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log("Printing product data", response.data);
          history.goBack();
        })
        .catch((error) => {
          console.log("Something went wrong", error);
        });
    }
  };
  return (
    <div className="position-absolute top-50 start-50 translate-middle regback">
      <div className="container position-absolute top-50 start-50 translate-middle regform">
        <div className="p-5 text-black fw-bold">
          <h1>ProductDetails</h1>
          <div className="row">
            <div className="mb-3 col px-5">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={name}
                onChange={(e) => {
                  setname(e.target.value);
                }}
              />
            </div>
            <div className="mb-3 col px-5">
              <label htmlFor="url" className="form-label">
                Image Url{" "}
              </label>
              <input
                type="text"
                className="form-control"
                id="url"
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="mb-3 col px-5">
              <label htmlFor="qty" className="form-label">
                Category
              </label>
              <select
                name="roles"
                id="roles"
                className="input-fields-mod form-control"
                onChange={(e) => {
                  setcategory(e.target.value);
                }}
              >
                <option value="" hidden>
                  Choose category
                </option>
                <option value="GROCERY">Grocery</option>
                <option value="VEGETABLES">Vegetables</option>
                <option value="DAIRY_PRODUCTS">Dairy Products</option>
                <option value="FRUITS">Fruits</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="mb-3 col px-5">
              <label htmlFor="qty" className="form-label">
                Quantity
              </label>
              <input
                type="number"
                className="form-control"
                id="qty"
                value={quantity}
                onChange={(e) => {
                  setquantity(e.target.value);
                }}
              />
            </div>
            <div className="mb-3 col px-5">
              <label htmlFor="rate" className="form-label">
                Rate{" "}
              </label>
              <input
                type="number"
                className="form-control"
                id="rate"
                value={rate}
                onChange={(e) => {
                  setrate(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="mb-3 row px-5">
            <label htmlFor="Description" className="form-label">
              Description
            </label>
            {/* <textarea type="text" className="form-control" id="Description" style="height: 100px" value={description} onChange={(e) => { setdescription(e.target.value) }} /> */}
            <textarea
              id="Description"
              rows="4"
              cols="50"
              value={description}
              onChange={(e) => {
                setdescription(e.target.value);
              }}
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={HandleAddProduct}
          >
            {button}
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddProduct;
