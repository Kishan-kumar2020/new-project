import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { addUser } from "../utils/slices/userSlice";
import { BASE_URL } from "../utils/constants";

const Body = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchUser = async () => {
        try {
            const res = await axios.get(BASE_URL + 'auth/me', {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            })
            dispatch(addUser(res.data.user));
        } catch (err) {
            console.log(err);
            if (err.response?.status === 401) {
                navigate('/login');
            }
        }
    };

    useEffect(() => {
        if (!user) fetchUser();
    }, []);

    return (
        <div className="grid h-screen grid-rows-[auto_1fr_auto]">
            <Navbar />
            <main className="p-4 flex justify-center items-start"><Outlet /></main>
            <Footer />
        </div>
    );
};

export default Body;
