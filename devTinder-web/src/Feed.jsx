import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from './utils/feedSlice';
import { useEffect } from 'react';
import axios from 'axios';
import UserCard from './UserCard';

const Feed = () => {
    const feed = useSelector((store) => store.feed)
    console.log(feed)
    const dispatch = useDispatch()
    const getFeed = async () => {
        if (feed) return;
        try {
            const res = await axios.get("http://localhost:3000/feed", { withCredentials: true });
            console.log((res))
            dispatch(addFeed(res?.data?.data))
        }
        catch (err) {
            console.error(err)
        }
    }
    useEffect(() => {
        getFeed()
    }, [])
    return (
        feed && (<div className='flex justify-center ny-10'>
            <UserCard user={feed[0]} />
        </div>)
    )
}

export default Feed
