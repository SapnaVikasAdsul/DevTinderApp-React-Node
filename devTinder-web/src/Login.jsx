import React, { useState } from 'react'
import axios from "axios"
import { useDispatch } from 'react-redux';
import { addUser } from './utils/userSlice';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [emailId, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [iseLoginForm, setIsLoginForm] = useState(true)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [error, setError] = useState("")

    const handleLogin = async () => {
        try {
            const res = await axios.post("http://localhost:3000/login", {
                emailId,
                password
            },
                { withCredentials: true }
            )
            console.log(res)
            dispatch(addUser(res.data))
            navigate("/")
        }
        catch (err) {
            setError(err?.response?.data || "Something went wrong")
            console.error(err);
        }
    }

    const handleSignup = async () => {
        try {
            const res = await axios.post("http://localhost:3000/signup", { firstName, lastName, emailId, password }, { withCredentials: true });
            dispatch(addUser(res.data.data))
            navigate("/profile")
        }
        catch (err) {
            setError(err?.response?.data || "Something went wrong")

        }
    }


    return (
        <div className='flex justify-center my-10'>
            <div className="card card-border bg-base-100 w-96">
                <div className="card-body">
                    <h2 className="card-title justify-center">{iseLoginForm ? "Login" : "Sign Up"}</h2>
                    <div >
                        {!iseLoginForm && (<> <fieldset className="fieldset">
                            <legend className="fieldset-legend py-4">First Name</legend>
                            <input type="text" className="input" placeholder="Type here" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend py-4">Last Name</legend>
                                <input type="text" className="input" placeholder="Type here" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            </fieldset>
                        </>
                        )}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend py-4">Email ID</legend>
                            <input type="text" className="input" placeholder="Type here" value={emailId} onChange={(e) => setEmail(e.target.value)} />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend py-4">Password</legend>
                            <input type="password" className="input" placeholder="Type here" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </fieldset>
                    </div>
                    <p className='text-red-500'>{error}</p>
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary" onClick={iseLoginForm ? handleLogin : handleSignup}>
                            {iseLoginForm ? "Login" : "Sign Up"}
                        </button>

                    </div>
                    <p className='m-auto cursor-pointer' onClick={() => setIsLoginForm((value) => !value)}>
                        {iseLoginForm ? "New user? Sign up here" : "Existing user? Login here"}</p>

                </div>
            </div>
        </div>
    )
}

export default Login
