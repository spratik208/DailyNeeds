import { Link } from "react-router-dom";
import { useState } from "react";
import { url } from "./Common/constants";
import axios from "axios";
import "./Login.css"
import { useHistory } from "react-router-dom";

const Login = () => {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const history=useHistory();
    const HandleLogin=()=>{
        const user={
            email,
            password
        }
        axios.post(url + "/login",user)
        .then(Response => {
            if(Response.data.jwt&&Response.status == 200){
                localStorage.setItem('jwttoken',JSON.stringify(Response.data.jwt));
                if(Response.data.role=='[ROLE_CUSTOMER]')
                history.push("/");
                else if(Response.data.role=='[ROLE_VENDOR]')
                  history.push("/vendorhome")
                else if(Response.data.role=='[ROLE_ADMIN]')
                  console.log("in admin")
              } 
        })
        .catch(error => {
            console.log('Something went wrong', error);
        })
    }    
    return (
        <div className=" position-absolute top-50 start-50 translate-middle loginback">
            <div className="position-absolute top-50 start-50 translate-middle loginform">

                <div className="p-5 text-whiteS">
                    <h1>
                        LOGIN
                    </h1>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email </label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={email} onChange={(e) => { setemail(e.target.value) }} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" value={password} onChange={(e) => { setpassword(e.target.value) }}/>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={HandleLogin}>Submit</button>
                    <div>
                        <Link className="btn btn-secondary m-3" to={"/register"}>REGISTER</Link>
                        <Link className="m-3" to={"/forgotpassword"}>Forgot Password</Link>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Login;