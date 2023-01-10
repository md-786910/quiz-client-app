import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { adminAuth, login } from "../actions/register_login";
import Loader from "../../components/Loader";
function Login(props) {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({
    email: "",
    password: "",
  });
  const [loader, setLoader] = useState(false);
  const handleAdminText = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAdmin({ ...admin, [name]: value });
  };
  const loginAdmin = async () => {
    setLoader(true);
    const { data, resp } = await login(admin);
    const { adminData, check } = await adminAuth();
    if (resp.status === 200) {
      if (check.status === 200 && adminData.message.isVerified) {
        props.checkAdmin(adminData.message.isVerified);
        navigate("/admin/create");
        setLoader(false);
      } else {
        alert(adminData.message);
      }
    } else {
      alert(data.message);
    }
  };

  return (
    <>
      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Admin Sign in
                      </p>

                      <form className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="email"
                              id="form3Example3c"
                              className="form-control"
                              name="email"
                              value={admin.email}
                              onChange={handleAdminText}
                            />
                            <label className="form-label" for="form3Example3c">
                              Your Email
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              id="form3Example4c"
                              className="form-control"
                              name="password"
                              value={admin.password}
                              onChange={handleAdminText}
                            />
                            <label className="form-label" for="form3Example4c">
                              Password
                            </label>
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="button"
                            className="btn btn-primary btn-lg"
                            onClick={() => loginAdmin()}
                          >
                            Sign in
                          </button>
                        </div>

                        <div className="newtouser">
                          new user to create account ?{" "}
                          <Link to="/admin/register">Sign up</Link>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sample"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {loader ? <Loader /> : ""}
      </section>
    </>
  );
}

export default Login;
