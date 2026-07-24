import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest, removeRequest } from './utils/requestSlice';
import { useEffect } from 'react';

function Requests() {
    const requests = useSelector((store) => store.request)
    const dispatch = useDispatch();

    const reviewRequest = async (status, _id) => {
        try {

            const res = await axios.post("http://localhost:3000/request/review/" + status + "/" + _id, {}, { withCredentials: true })
            dispatch(removeRequest(_id))
        }
        catch(err){
            console.error(err);
        }
    }

    const fetchRequests = async () => {
        try {
            const res = await axios.get("http://localhost:3000/requests/received", { withCredentials: true });
            console.log(res)
            dispatch(addRequest(res.data.data))
        } catch (err) { }
    }

    useEffect(() => {
        fetchRequests()
    }, [])
    if (!requests) return;

    if (
        requests.length === 0) return <h1>No requests found</h1>
    return (
        <div className='flex justify-center my-10'>
            <h1 className='text-bold text-2xl'>Connection requests</h1>

            {requests.map((request) => {
                const { _id, firstName, lastName, age, gender, about, photoUrl } = request.fromUserId

                return (
                    <div>
                        <div key={_id}>
                            <img alt='photo' src={photoUrl} />
                            <h2>{firstName + " " + lastName}</h2>
                            <p>{about}</p>
                        </div>
                        <div>

                            <button className="btn btn-primary" onClick={reviewRequest("accepted", request._id)}>Accept</button>
                            <button className="btn btn-secondary" onClick={reviewRequest("rejected", request._id)}>Reject</button>
                        </div>
                    </div>

                )
            })}
        </div>
    )
}

export default Requests
