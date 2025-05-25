import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Body = () => {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    
    useEffect(() => {
        if(!user) {
            navigate('/login');
        }
    }, []);

    return (
        <div>
            <Navbar />
            <div className="flex flex-col">
                <div className="flex-1"><Outlet /></div>
                <Footer />
            </div>
        </div>
    );
};

export default Body;
