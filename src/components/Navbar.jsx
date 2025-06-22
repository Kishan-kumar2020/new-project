import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { BASE_URL } from "../utils/constants";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const requestsRecieved = useSelector((state) => state.requests);
  const getconnections = useSelector((state) => state.connections);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + "auth/logout",
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch({ type: "RESET_APP" });
      navigate("/login", { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <Link to="/feed" className="btn btn-ghost text-xl">
            DevTinder-Web
          </Link>
        </div>
        {user ? (
          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <span className="absolute w-2 h-2 rounded-full bg-amber-500 top-0 right-0"></span>
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    // src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    src={user.photoURL}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/connections">
                    Connections
                    {getconnections && (
                      <span className="badge text-[0.7875rem]">
                        {getconnections.length}
                      </span>
                    )}
                  </Link>
                </li>
                <li>
                  <Link to="/requests">
                    Requests
                    {requestsRecieved && (
                      <span className="badge text-[0.7875rem]">
                        {requestsRecieved.length}
                      </span>
                    )}
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default Navbar;
