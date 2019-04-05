import React, { useState, useRef } from 'react';
import axios from 'axios';

// Hooks! Functional components can hold state.
export default function Register(props) {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const departmentRef = useRef();
    const [flash, setFlash] = useState(''); // [sliceofstate, setstate] = initial value ''

    const submit = () => {
        // attempt register!
        // on success, set token to local storage, set a flash message
        // on failure, set a flash message with the error
        axios.post('http://localhost:3000/api/auth/register', {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
            department: departmentRef.current.value,
        })
            .then(res => {
                // axios puts it in res.data
                setFlash(`${res.data.saved.username} has registered and logged in!`);
                localStorage.setItem('token', res.data.token);
                props.history.replace('/users');
            })
            .catch(err => {
                setFlash(`Something bad happened ${err.response.data.message}`)
            })
    };

    return (
        <div className='register'>
            <div className='register-inputs'>
                username <input ref={usernameRef} type="text" /> <br />
                department <input ref={departmentRef} type="text" /> <br />
                password <input ref={passwordRef} type="text" /> 
            </div>

            <div>
                <button onClick={submit}>
                    Register
                </button>

                <div className='flash'>{flash}</div>
            </div>
        </div>
    );
}
// if register fails/succeeds you'll get a flash message...