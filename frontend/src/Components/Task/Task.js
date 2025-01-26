import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./Task.module.css";
import { Navigate } from "react-router-dom";

function Task() {
  const [tasks, setTasks] = useState([]);
  const user = localStorage.getItem("user");
 
  useEffect(() => {
    if(user){
      axios
        .get("https://affworldtask.onrender.com/mytasks", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        })
        .then((mytask) => {

          setTasks(mytask.data.mytask);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  const DeleteTask = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirmDelete) {
      axios
        .delete(`https://affworldtask.onrender.com/mytask/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        })
        .then((isedeletd) => {
          setTasks(tasks.filter((task) => task._id !== id));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
    }
  };

  const handleDragStart = (e, task) => {
    e.dataTransfer.setData("taskId", task._id);
  };

  const handleDrop = (e, status) => {
    const taskId = e.dataTransfer.getData("taskId");
    const updatedTasks = tasks.map((task) => {
      if (task._id === taskId) {
        task.status = status;
        return task;
      }
      return task;
    });

    setTasks(updatedTasks);
    updateTaskStatus(taskId, status);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const updateTaskStatus = (taskId, status) => {
    axios
      .put(
        `https://affworldtask.onrender.com/mytask/${taskId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      )
      .then((response) => {
        if (response) {
          alert("task status updated successfully");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {!user ? (
        <Navigate to="/login" />
      ) : (
        <main className={styles.main}>
          <div className="container">
            <div className="row">
              <div className="col-4">
                <div
                  className={`${styles.column} ${styles.pending}`}
                  onDrop={(e) => handleDrop(e, "Pending")}
                  onDragOver={handleDragOver}
                >
                  <h2>Pending</h2>
                  {tasks
                    .filter((task) => task.status === "Pending")
                    .map((task) => (
                      <div
                        className={styles.task}
                        draggable
                        onDragStart={(e) => handleDragStart(e, task)}
                        key={task._id}
                      >
                        <h3 className={styles.taskname}>{task.taskName}</h3>
                        <p>Status: {task.status}</p>
                        <button onClick={() => DeleteTask(task._id)}>
                          Delete
                        </button>
                      </div>
                    ))}
                </div>
              </div>

              <div className="col-4">
                <div
                  className={`${styles.column} ${styles.completed}`}
                  onDrop={(e) => handleDrop(e, "Completed")}
                  onDragOver={handleDragOver}
                >
                  <h2>Completed</h2>
                  {tasks
                    .filter((task) => task.status === "Completed")
                    .map((task) => (
                      <div
                        className={styles.task}
                        draggable
                        onDragStart={(e) => handleDragStart(e, task)}
                        key={task._id}
                      >
                        <h3 className={styles.taskname}>{task.taskName}</h3>
                        <p>Status: {task.status}</p>
                        <button onClick={() => DeleteTask(task._id)}>
                          Delete
                        </button>
                      </div>
                    ))}
                </div>
              </div>

              <div className="col-4">
                <div
                  className={`${styles.column} ${styles.done}`}
                  onDrop={(e) => handleDrop(e, "Done")}
                  onDragOver={handleDragOver}
                >
                  <h2>Done</h2>
                  {tasks
                    .filter((task) => task.status === "Done")
                    .map((task) => (
                      <div
                        className={styles.task}
                        draggable
                        onDragStart={(e) => handleDragStart(e, task)}
                        key={task._id}
                      >
                        <h3 className={styles.taskname}>{task.taskName}</h3>
                        <p>Status: {task.status}</p>
                        <button onClick={() => DeleteTask(task._id)}>
                          Delete
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
}

export default Task;
