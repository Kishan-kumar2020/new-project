import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';

const Login = () => {

    const [userLogin, setUserLogin] = useState({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'John@123',
        about: 'This is the default about for the user!',
    })

    const [error, setError] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);

    const { name, email, password } = userLogin;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignUp = async () => {
        try {
            const res = await axios.post(BASE_URL + 'auth/signup', userLogin, {
                headers: { 'Content-Type': 'application/json' },
            });
            const data = res.data;
            console.log(data);
            if (res.status === 200) {
                localStorage.setItem('token', data.token);
            } else {
                setError(data.message || "Error Occurred");
            }
        }
        catch (err) {
            console.log(err);
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("Error Occurred");
            }
        }
    };


    const handleSubmit = async () => {
        try {
            const res = await axios.post(BASE_URL + 'auth/login', {
                email,
                password
            }, {
                headers: { 'Content-Type': 'application/json' },
            });
            const data = res.data;
            console.log(data);
            if (res.status === 200) {
                localStorage.setItem('token', data.token);
                dispatch(addUser(data.user));
                navigate('/home', { replace: true });
            }
            else {
                setError("Error Occured");
            }
        }
        catch (err) {
            console.log(err);
            setError("Error Occured");
        }
    }

    return (
        <div className='w-full my-4 flex justify-center'>
            <div className="card bg-base-200 w-96 shadow-sm">
                <div className="card-body">
                    <h1 className="text-2xl text-center">{isSignUp ? 'SignUp' : 'Login'}</h1>
                    {isSignUp && <label className="w-full input validator my-2">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                            </g>
                        </svg>
                        <input type="text" placeholder="Name" required value={name} onChange={(e) => setUserLogin({ ...userLogin, name: e.target.value })} />
                    </label>}
                    <label className="w-full input validator my-2">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                            </g>
                        </svg>
                        <input type="email" placeholder="Email" required value={email} onChange={(e) => setUserLogin({ ...userLogin, email: e.target.value })} />
                    </label>
                    <label className="w-full input validator my-2">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <path
                                    d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                                ></path>
                                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                            </g>
                        </svg>
                        <input
                            type="password"
                            required
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setUserLogin({ ...userLogin, password: e.target.value })}
                            // minlength="8"
                            // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                        />
                    </label>
                    {!isSignUp && <div className="card-actions justify-center">
                        <button onClick={handleSubmit} className="btn btn-block btn-primary">Login</button>
                    </div>}
                    {/* If no user let's sign up */}
                    {isSignUp ? <div className="card-actions justify-center my-4">
                        <button onClick={handleSignUp} className="btn btn-block btn-accent">SignUp</button>
                    </div> : <div className="card-actions justify-center my-4">
                        <button onClick={() => setIsSignUp(true)} className="btn btn-block btn-accent">Not! Signed up?</button>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default Login
