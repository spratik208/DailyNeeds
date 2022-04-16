import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { url } from "./Common/constants";
import "./Login.css"

const ForgotPassword = (e) => {
    const history = useHistory();
    const [email, setemail] = useState("")
    const [password, setPassword] = useState("")
    const [cpassword, setcPassword] = useState("")
    const [otp, setotp] = useState("")
    const [confirmOtp, setConfirmotp] = useState("")
    const GenerateAndSendOTP = () => {
        console.log(email);
        axios.get(url + "/generateotp/" + email,)
            .then(Response => {
                console.log(Response.data);
                setConfirmotp(Response.data);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    };
    const HandleOtp = () => {
        if (confirmOtp == otp) {
            if (password == cpassword) {
                const Credential={email,password}
                axios.put(url + "/changepassword",Credential).then(Response => {
                    console.log(Response.data);
                })
                history.push("/")
            }
            else
                console.log("wrong otp");
        }
    }
        return (
            <div className=" position-absolute top-50 start-50 translate-middle loginback">
                <div className="position-absolute top-50 start-50 translate-middle loginform">
                    <div className="p-5 text-black">
                        <h1>
                            ForgotPassword
                        </h1>
                        <div className="mb-3">
                            <label htmlFor="Email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="Email" aria-describedby="emailHelp" value={email} onChange={(e) => { setemail(e.target.value) }} />
                        </div>
                        <div className="mb-3">
                            <button className="btn btn-success" onClick={GenerateAndSendOTP}>Get otp</button>
                        </div>
                        <h1>
                            Change Password
                        </h1>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control " id="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" id="cpassword" value={cpassword} onChange={(e) => { setcPassword(e.target.value) }} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="otp" className="form-label">OTP</label>
                            <input type="text" className="form-control" id="otp" value={otp} onChange={(e) => { setotp(e.target.value) }} />
                        </div>
                        <div className="mb-3">
                            <button type="button" className="btn btn-primary" onClick={HandleOtp}>Confirm</button>
                        </div>

                    </div>
                </div>
            </div>

        )
    }
    export default ForgotPassword;