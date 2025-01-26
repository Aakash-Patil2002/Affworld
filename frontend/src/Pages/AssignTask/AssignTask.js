import React, { useState } from "react";
import axios from "axios";
import styles from "./AssignTask.module.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { Navigate } from "react-router-dom";
const AssignTask = ({ onTaskCreate }) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const user = localStorage.getItem("user");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskName || !taskDescription) {
      alert("Please fill in all fields.");
      return;
    }

    axios
      .post(
        "https://affworldtask.onrender.com/assigntask",
        { taskName, taskDescription, status: "Pending" },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      )
      .then((success) => {
        if (onTaskCreate) onTaskCreate();
      })
      .catch((error) => {
        console.log(error);
      });

    setTaskName("");
    setTaskDescription("");
  };

  return (
    <>
      {!user ? (
        <Navigate to="/login" />
      ) : (
        <div>
          <Navbar />
          <main className={styles.main}>
            <div className={styles.formContainer}>
              <h2 className={styles.heading}>Create Task</h2>
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                  <label className={styles.label} htmlFor="taskName">
                    Task Name:
                  </label>
                  <input
                    className={styles.input}
                    type="text"
                    id="taskName"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label} htmlFor="taskDescription">
                    Task Description:
                  </label>
                  <textarea
                    className={styles.textarea}
                    id="taskDescription"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                  />
                </div>
                <button className={styles.button} type="submit">
                  Add Task
                </button>
              </form>
            </div>
          </main>
          <Footer />
        </div>
      )}
    </>
  );
};

export default AssignTask;
