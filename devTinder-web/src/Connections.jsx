import axios from 'axios'
import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from './utils/connectionSlice';

const Connections = () => {
    const connections = useSelector((store) => store.connections)
    const dispatch = useDispatch();
    const fetchConnections = async () => {
        try {
            const res = await axios.get("http://localhost:3000/connections", { withCredentials: true });
            console.log(res.data.data)
            dispatch(addConnection(res.data.data))
        }
        catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchConnections()
    }, [])

    if (!connections) return;

    if (connections.length === 0) return <h1>No connections found</h1>
    return (
        <div className='flex justify-center my-10'>
            <h1 className='text-bold text-2xl'>Connections</h1>

            {connections.map((connection) => {
                const { firstName, lastName, age, gender, about, photoUrl } = connection

                return (
                    <div>
                        <img alt='photo' src={photoUrl} />
                        <h2>{firstName + " " + lastName}</h2>
                        <p>{about}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Connections
