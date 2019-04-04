import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Users(props) {
    const [users, setUsers] = useState([]);

    // I want to trigger a side effect
    // empty array makes it like component did mount
    // except I can split component did mount into several compact units
    useEffect(() => {
        // no token? Redirect to login screen!
        if (!localStorage.getItem('token')) {
            props.history.push('/');
        }
    }, []);

    useEffect(() => {
        // fetch users
        axios.get('http://localhost:3000/api/users', {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
            .then(res => {
                setUsers(res.data)
            })
            .catch(error => {
                console.log(error)
            });
    }, []);

    return (
        <div className='users'>
            {users.map(u => (
                <li key={u.id}>
                    {u.username}
                </li>
            ))}
        </div>
    );
}
