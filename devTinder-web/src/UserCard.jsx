import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from './utils/feedSlice';

const UserCard = ({ user }) => {
    console.log(user);
    const { _id, firstName, lastName, age, gender, about, photoUrl } = user
    const dispatch = useDispatch()
    const handleRequest = async (status, userId) => {
        try {
            const res = await axios.post("http://localhost:3000/request/send/" + status + "/" + userId, {}, { withCredentials: true });
            dispatch(removeUserFromFeed(userId))
        }
        catch (err) {
            console.log("Status:", err.response?.status);
            console.log("Response:", err.response?.data);
            console.error(err);
            console.log(err.response?.data);
        }
    }


    return (
        <div>
            <div className="card bg-base-300 w-96 h-100 my-20 shadow-sm">
                <figure>
                    <img
                        src={user.photoUrl}
                        alt="photo" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{firstName + " " + lastName}</h2>
                    {age && gender && <p>{age + " " + gender}</p>}
                    <p>{about}</p>
                    <div className="card-actions justify-center my-4">
                        <button className="btn btn-primary" onClick={() => handleRequest("ignored", _id)}>Ignore</button>
                        <button className="btn btn-secondary" onClick={() => handleRequest("interested", _id)}>Interested</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCard
