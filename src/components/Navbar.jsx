import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { removeUser } from '../utils/userSlice';

const Navbar = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(removeUser());
        navigate('/login', { replace: true })
    }
    return (
        <header>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="flex-1">
                    <Link to="/feed" className="btn btn-ghost text-xl">DevTinder-Web</Link>
                </div>
                {user && <div className="flex-none">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li>
                                <Link to='/profile' className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </Link>
                            </li>
                            <li><Link to='/connections'>Connections</Link></li>
                            <li><Link to='/requests'>Requests
                                <span className="badge">10+</span>
                            </Link></li>
                            <li>
                                <button onClick={handleLogout}>Logout</button>
                            </li>
                        </ul>
                    </div>
                </div>}
            </div>
        </header>
    )
}

export default Navbar
