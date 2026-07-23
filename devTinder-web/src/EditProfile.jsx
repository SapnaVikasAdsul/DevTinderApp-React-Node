import React from 'react'
import { useState } from 'react';
import UserCard from './UserCard';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from './utils/userSlice';
const EditProfile = ({ user }) => {
    const [firstName, setName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl)
    const [age, setAge] = useState(user.age)
    const [gender, setGender] = useState(user.gender)
    const [about, setAbout] = useState(user.about)
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const [showToast, setShowToast] = useState(false)

    const saveProfile = async () => {
        setError("")
        try {
            const res = await axios.patch("http://localhost:3000/profile/edit",
                { firstName, lastName, photoUrl, age, gender, about },
                { withCredentials: true })

            dispatch(addUser(res?.data?.data))
            setShowToast(true)
            setTimeout(() => {
                setShowToast(false)
            }, 3000);

        }
        catch (err) {
            setError(err.response.data)
        }
    }

    return (
        <>
            <div className='flex justify-center my-10'>
                <div className='flex justify-center my-10'>
                    <div className="card card-border bg-base-100 w-96">
                        <div className="card-body">
                            <h2 className="card-title justify-center">Edit Profile</h2>
                            <div >
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend py-4">First Name</legend>
                                    <input type="text" className="input" placeholder="Type here" value={firstName} onChange={(e) => setName(e.target.value)} />

                                </fieldset>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend py-4">Last Name</legend>
                                    <input type="text" className="input" placeholder="Type here" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                </fieldset>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend py-4">PhotoURL</legend>
                                    <input type="text" className="input" placeholder="Type here" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
                                </fieldset>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend py-4">Age</legend>
                                    <input type="text" className="input" placeholder="Type here" value={age} onChange={(e) => setAge(e.target.value)} />
                                </fieldset>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend py-4">Gender</legend>
                                    <input type="text" className="input" placeholder="Type here" value={gender} onChange={(e) => setGender(e.target.value)} />
                                </fieldset>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend py-4">About</legend>
                                    <input type="text" className="input" placeholder="Type here" value={about} onChange={(e) => setAbout(e.target.value)} />
                                </fieldset>
                            </div>
                            <p className='text-red-500'>{error}</p>
                            <div className="card-actions justify-center">
                                <button className="btn btn-primary" onClick={saveProfile}>Save Changes</button>

                            </div>

                        </div>
                    </div>
                </div>

                <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
            </div>

            {showToast && (<div className="toast toast-top toast-center">
                <div className="alert alert-success">
                    <span>Profile updated successfully.</span>
                </div>
            </div>)}
        </>
    )
}

export default EditProfile
