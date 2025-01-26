import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import style from "./Login.module.css";
import axios from "axios";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false)

  const navigate = useNavigate();
  const loginHandler = (e) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (emailRegex.test(email)) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
    if (passwordRegex.test(password)) {
      setPassError(false);
    } else {
      setPassError(true);
    }

    if (emailRegex.test(email) && passwordRegex.test(password)) {
      axios
        .post("https://affworldtask.onrender.com/login", { email, password })
        .then((result) => {
          if (result) {
            localStorage.setItem("user",result.data.user);
            localStorage.setItem("jwt", result.data.token);
          }
          navigate('/');
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    }

  };
  return (
    <>
      <Navbar />
      <main>
        <div>
          <div className={style.login_page}>
            <form className={style.login_form} onSubmit={loginHandler}>
              <h2 className={style.login_heading}>Login</h2>
              <div className=" input-group">
                <span className="input-group-text">
                  <FaUserCircle />
                </span>
                <input
                  type="text"
                  value={email}
                  className={style.inp1 + " form-control"}
                  placeholder="Enter Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <p className={emailError ? `${style.error}` : `${style.hideError}`}>Email is Require...!</p>

              <div className="input-group">
                <span className="input-group-text">
                  <IoIosLock />
                </span>
                <input
                  value={password}
                  type={showPass ? "text" : "password"}
                  className={style.inp1 + " form-control"}
                  placeholder="Enter Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="input-group-text eye_img"
                  onMouseDown={() => setShowPass(true)}
                  onMouseUp={() => setShowPass(false)}
                >
                  {showPass ? <IoEye /> : <IoEyeOff />}
                </span>
              </div>
              <p className={passError ? `${style.error}` : `${style.hideError}`}>Password is Require...!</p>

              <button type="submit" className={style.btn + " mt-1"}>
                Login
              </button>
              <div className="d-flex justify-content-between">
                <p className={style.swipe}>
                  New here? <span><Link to="/register">Sign up</Link></span>
                </p>
                <p className={style.forget}><Link to={'/forgetPass'} className={style.forget}>Forgot password?</Link></p>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Login;
