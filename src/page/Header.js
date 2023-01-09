import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { adminAuth, adminLogout } from "../admin/actions/register_login";
import { useNavigate } from "react-router-dom";
import { userAuth, userLogout } from "../client/actions/user_register_login";
function Header({ check, check1 }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(check);
  const [showUser, setShowUser] = useState(check1);
  // for admin
  const Logout = async () => {
    auth();
    const { resp, data } = await adminLogout();
    if (resp.status === 200) {
      if (location.pathname === "/user/testPage") {
        navigate("/user/testPage");
      } else {
        navigate("/admin/login");
      }
    } else {
      alert(data.message);
    }
    window.location.reload();
  };

  async function auth() {
    const { adminData, check } = await adminAuth();
    if (check.status === 200 && adminData.message.isVerified) {
      setShow(true);
    } else {
      setShow(false);
    }
  }

  // for user
  const UserLogoutBtn = async () => {
    userAuth();
    const { resp, data } = await userLogout();
    if (resp.status === 200) {
      navigate("/user/login");
      alert(data.message);
    } else {
      alert(data.message);
    }
    window.location.reload();
  };
  async function userAuthCheck() {
    const { userData, check } = await userAuth();
    if (check.status === 200 && userData.message.isVerified) {
      setShowUser(true);
    } else {
      setShowUser(false);
    }
  }
  useEffect(() => {
    auth();
    userAuthCheck();
    // eslint-disable-next-line
  }, [check, check1]);

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-mdb-toggle="collapse"
              data-mdb-target="#navbarExample01"
              aria-controls="navbarExample01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="fas fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarExample01">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item active">
                  <Link className="nav-link" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                {show ? (
                  <li className="nav-item active">
                    <button
                      className="btn btn-info nav-link"
                      aria-current="page"
                      onClick={() => Logout()}
                    >
                      Admin Logout
                    </button>
                  </li>
                ) : (
                  ""
                )}

                {showUser ? (
                  <li className="nav-item active mx-4">
                    <button
                      className="btn btn-info nav-link"
                      aria-current="page"
                      onClick={() => UserLogoutBtn()}
                    >
                      user Logout
                    </button>
                  </li>
                ) : (
                  ""
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
