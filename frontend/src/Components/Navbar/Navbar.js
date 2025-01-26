import {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Topbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isArrow, setIsArrow] = useState(true);
  const user = localStorage.getItem('user');
  const navigate = useNavigate();

  
  const logout = () => {
    if (window.confirm("Are you sure to logout")) {
      localStorage.setItem("jwt", "");
      localStorage.setItem("user","");
      navigate("/");
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsArrow(!isArrow);
  };



  return (
    <header>
      <nav className={styles.nav}>
        <div className='container'>
          <div className={styles.top}>
            <div className={styles.topLeft}>
              <Link to="/" className={styles.logo}>
                AFFWORLDTASK
              </Link>
            </div>
            <div className={styles.topCenter}>
              <ul className={styles.topList}>
                <li className={styles.topListItem}>
                  <Link className={styles.link} to="/">
                    HOME
                  </Link>
                </li>
                <li className={styles.topListItem}>
                  <Link className={styles.link} to="/addPost">
                    ADD POST
                  </Link>
                </li>
                <li className={styles.topListItem}>
                  <Link className={styles.link} to="/assignTask">
                    ASSIGN TASK
                  </Link>
                </li>
                <li className={styles.topListItem}>
                  <Link className={styles.link} to="/mytask">
                    MY TASKS
                  </Link>
                </li>
              </ul>
            </div>
            <div className={styles.topRight}>
              {user ? (
                <div className={styles.userMenu}>
                  <span className={styles.userName} onClick={toggleDropdown}>
                     {user}{" "}
                    {isArrow ? (
                      <i className="fa-solid fa-caret-down ms-1"></i>
                    ) : (
                      <i className="fa-solid fa-caret-up ms-1"></i>
                    )}
                  </span>
                  {isDropdownOpen && (
                    <ul className={styles.dropdown}>
                      <li>
                        <span className={styles.dropdownLink} onClick={logout}>
                          <i className="fa-solid fa-right-from-bracket me-1"></i> LOGOUT
                        </span>
                      </li>
                    </ul>
                  )}
                </div>
              ) : (
                <ul className={`${styles.topList}`}>
                  <li className={styles.topListItem}>
                    <Link className={styles.link} to="/login">
                      LOGIN
                    </Link>
                  </li>
                  <li className={styles.separator}>|</li>
                  <li className={styles.topListItem}>
                    <Link className={styles.link} to="/register">
                      REGISTER
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
