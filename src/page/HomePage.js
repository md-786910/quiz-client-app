import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <header>
        <div
          id="intro-example"
          className="p-5 text-center bg-image"
          style={{
            backgroundImage:
              "url('https://mdbcdn.b-cdn.net/img/new/slides/041.webp')",
          }}
        >
          <div
            className="mask"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
          >
            <div className="d-flex justify-content-center align-items-center h-100">
              <div className="text-white">
                <h1 className="mb-3">Give Quizz Test online</h1>
                <h5 className="mb-4">free create test and conduct online</h5>
                <Link
                  to="/admin/register"
                  className="btn btn-outline-light btn-lg m-2"
                  role="button"
                >
                  Admin panel
                </Link>
                <Link
                  to="/user/register"
                  className="btn btn-outline-light btn-lg m-2"
                  role="button"
                >
                  user panel
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default HomePage;
