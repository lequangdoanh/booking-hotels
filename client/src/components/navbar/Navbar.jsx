import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import { MdHotelClass } from "react-icons/md";
import {GiShoppingCart} from "react-icons/gi"
import {CiLogin} from "react-icons/ci"


const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleRedictLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    // localStorage.removeItem("room-user");
    navigate("/login");
  };


  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">
            <MdHotelClass />
            Tiffany 
          </span>
          <span className="logo-fi">.com</span>
        </Link>

        {user ? (
          <div className="wrap-user">

            

            <button className="logo-user">
              <img className="cellImg" src={"https://scontent.fdad1-2.fna.fbcdn.net/v/t39.30808-6/332695244_904344317358321_648652383037994004_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=KTalalji73cAX9xT12O&_nc_ht=scontent.fdad1-2.fna&oh=00_AfAr_IJW_LOqqB40wHwv8zlEnVgnG2wDBl2BxprWSQ2d6g&oe=647F8784"} alt="avatar" />
              <p className="logo-username">{user.username}
                <br /><span className="genius">Genius cấp 1</span>
              </p>
            </button>

            <button className="shop" onClick={() => navigate("/my-room")}>
              <GiShoppingCart/>
            </button>
            
            
            <button className="shop" onClick={handleLogout}>
              <CiLogin/>
            </button>
          </div>
        ) : (
          <>
            <button className="headerBtn" onClick={handleRedictLogin}>
              Sign in / Register
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
