import React, { useState } from 'react'

function Login() {
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const handleLogin=async()=>{
        // try{
        //     const post=await axios.post("")
        // }


    }

    return (
        <div className='flex justify-center my-10'>
            <div className="card card-border bg-base-100 w-96">
                <div className="card-body">
                    <h2 className="card-title justify-center">Login</h2>
                    <div >
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend py-4">Email ID</legend>
                            <input type="text" className="input" placeholder="Type here" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend py-4">Password</legend>
                            <input type="password" className="input" placeholder="Type here" value={password} onChange={(e)=>setPassword(e.target.value)}/>
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
