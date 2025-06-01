import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchUser = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('Please Login');
            navigate('/login');
            return;
        }

        try {
            const res = await axios.get(BASE_URL + 'auth/me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            dispatch(addUser(res.data.user));
        } catch (err) {
            console.log(err);
            if (err.response?.status === 401) {
                localStorage.removeItem('token');
                navigate('/login');
            }
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div className="grid h-screen grid-rows-[auto_1fr_auto]">
            <Navbar />
            <main className="p-4 flex justify-center items-start overflow-auto"><Outlet /></main>
            <Footer />
        </div>
    );
};

export default Body;
