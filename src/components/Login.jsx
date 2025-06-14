import { useState } from 'react'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';

const Login = () => {

    const [form, setForm] = useState({
        name: '',
        email: 'rahulgandhi@example.com',
        password: 'Rahul@123',
        about: '',
        photoURL: '',
        age: '',
        gender: '',
    });

    const [isSignUp, setIsSignUp] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { name, email, photoURL, about, age, gender, password } = form;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleAuth = async () => {
        const url = isSignUp ? 'signup' : 'login';
        const payload = isSignUp ? form : { email: email, password: password };

        try {
            const { data, status } = await axios.post(`${BASE_URL}auth/${url}`, payload, {
                withCredentials: true,
            });

            if (status === 200 || status === 201) {
                console.log(data);
                if (!isSignUp) {
                    dispatch(addUser(data.user));
                    navigate('/feed', { replace: true });
                } else {
                    setIsSignUp(false);
                    setError('');
                    setMessage(data.message);
                }
            } else {
                setError(data.message || 'unexpected Error');
            }
        } catch (err) {
            const errMsg = err?.response?.data?.errors ? err?.response?.data?.errors[0]?.message : err?.response?.data?.message;
            setError(errMsg);
        }
    };

    return (
        <div className="card bg-base-200 w-96 shadow-sm self-center">
            <div className="card-body">
                <h1 className="text-2xl text-center">{isSignUp ? 'SignUp' : 'Login'}</h1>

                <p className={`${error ? 'text-red-500' : 'text-green-500'} text-sm text-center mb-2`}>{error ? error : message}</p>

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
                    <input name='name' type="text" placeholder="Name" required value={name} onChange={handleChange} />
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
                    <input name='email' type="email" placeholder="Email" required value={email} onChange={handleChange} />
                </label>
                {isSignUp &&
                    <>
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
                            <input name='age' type="number" min="18" max="100" placeholder="Age" required value={age} onChange={handleChange} />
                        </label>
                        <div className="relative w-full">
                            <textarea
                                id="about"
                                name="about"
                                rows={4}
                                maxLength={3000}
                                placeholder="Tell us a little about yourself..."
                                className="textarea textarea-bordered w-full resize-none pr-10"
                                value={about}
                                onChange={handleChange}
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 text-gray-400 absolute right-3 top-3 pointer-events-none"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 11l5-5 3.536 3.536-5 5H9v-3.536z" />
                            </svg>
                        </div>
                        <label className="w-full input validator my-2">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <path d="M4 7h16l-1.5-2h-13L4 7zM21 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7m3 0l2-3h8l2 3"></path>
                                    <circle cx="12" cy="13" r="3" />
                                </g>
                            </svg>
                            <input
                                name="photoURL"
                                type="url"
                                placeholder="Photo URL"
                                required
                                value={photoURL}
                                onChange={handleChange}
                            />
                        </label>
                    </>
                }
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
                        name='password'
                        type="password"
                        required
                        placeholder="Password"
                        value={password}
                        onChange={handleChange}
                        // minlength="8"
                        // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                    />
                </label>
                <div className='card-actions mt-4'>
                    <button
                        onClick={handleAuth}
                        className={`btn btn-block ${isSignUp ? 'btn-accent' : 'btn-primary'}`}>
                        {isSignUp ? 'Sign Up' : 'Login'}
                    </button>
                </div>

                <div className='card-actions mt-2'>
                    <button
                        onClick={() => {
                            setIsSignUp(!isSignUp);
                            setError('');
                        }}
                        className='btn btn-block btn-secondary'>
                        {isSignUp ? 'Already have an account' : 'Not signed up yet?'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login
