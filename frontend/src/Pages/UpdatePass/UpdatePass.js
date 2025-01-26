import React, { useRef, useState } from "react";
import { IoIosLock } from "react-icons/io";
import style from "./UpdatePass.module.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";

function UpdatePass() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const emailval = useRef();
  const { email } = useParams();
  const handleSubmit = (e) => {
    e.preventDefault();

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    setPasswordError(
      !passwordRegex.test(newPassword) || newPassword !== confirmPassword
    );

    if (passwordRegex.test(newPassword) && newPassword === confirmPassword) {
      axios
        .post("https://affworldtask.onrender.com/update-password", {
          newPassword,
          email: emailval.current.value,
        })
        .then((result) => {
          alert("password updated successfully");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <>
      <Navbar />
      <main>
        <div className={style.login_page}>
          <form className={style.login_form} onSubmit={handleSubmit}>
            <h2 className={style.login_heading}>Update Password</h2>

            <input type="hidden" ref={emailval} value={email} />

            <div className=" input-group mb-4">
              <span className="input-group-text">
                <IoIosLock />
              </span>
              <input
                type="password"
                value={newPassword}
                className={style.inp1 + " form-control"}
                placeholder="Enter New Password"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className=" input-group mb-4">
              <span className="input-group-text">
                <IoIosLock />
              </span>
              <input
                type="password"
                className={style.inp1 + " form-control"}
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {passwordError && (
              <p className={style.error}>
                Passwords do not match or are invalid
              </p>
            )}

            <button type="submit" className={style.btn}>
              Update Password
            </button>

            <div className={style.extra_links}>
              <p className={style.swipe}>
                Remembered your password?{" "}
                <Link to={"/login"} className={style.login}>
                  Log In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default UpdatePass;
