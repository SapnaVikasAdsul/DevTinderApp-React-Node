import React, { useState } from 'react'
import axios from "axios"
import { useDispatch } from 'react-redux';
import { addUser } from './utils/userSlice';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [emailId, setEmail] = useState("sanku.dream@gmail.com");
    const [password, setPassword] = useState("Sanket@1234");
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            const res = await axios.post("http://localhost:3000/login", {
                emailId,
                password
            },
                { withCredentials: true }
            )
            dispatch(addUser(res.data))
            navigate("/")
        }
        catch (err) {
            console.error(err);
        }
    }


    return (
        <div className='flex justify-center my-10'>
            <div className="card card-border bg-base-100 w-96">
                <div className="card-body">
                    <h2 className="card-title justify-center">Login</h2>
                    <div >
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend py-4">Email ID</legend>
                            <input type="text" className="input" placeholder="Type here" value={emailId} onChange={(e) => setEmail(e.target.value)} />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend py-4">Password</legend>
                            <input type="password" className="input" placeholder="Type here" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </fieldset>
                    </div>

                    <div className="card-actions justify-center">
                        <button className="btn btn-primary" onClick={handleLogin}>Login</button>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login
