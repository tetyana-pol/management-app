import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { addTask } from "../services/userService";

export const ProjectDetailsPage = () => {
  const [tasks, setTasks] = useState(null);
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "TODO",
  });

  const { projectId } = useParams();

  const { data: project } = useQuery({
    queryKey: ["project", projectId],
    queryFn: async () =>
      await axios
        .get(`http://localhost:3000/projects/${projectId}`)
        .then((res) => {
          return res.data;
        }),
  });

  const { data } = useQuery({
    queryKey: ["tasks", projectId],
    queryFn: async () =>
      await axios
        .get(`http://localhost:3000/tasks/project/${projectId}`)
        .then((res) => {
          return res.data;
        })
        .then((res) => setTasks(res)),
  });

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: async () =>
      await axios.get("http://localhost:3000/users").then((res) => {
        return res.data;
      }),
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewTask((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addTask({ ...newTask, projectId: +projectId }).then(
      setShowAddTaskForm(false)
    );
  };

  const handleStatusChange = async (id, value) => {
    try {
      // Update the task status on the server
      await axios.put(`http://localhost:3000/tasks/${id}`, { status: value });
      // Update the local state
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, status: value } : task
        )
      );
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleAssignUser = async (id, value) => {
    try {
      // Update the task status on the server
      await axios.put(`http://localhost:3000/tasks/${id}`, { userId: +value });
      // Update the local state
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, userId: +value } : task
        )
      );
    } catch (error) {
      console.error("Error updating user assigment:", error);
    }
  };

  console.log("project", project);

  return (
    <div className="container">
      <h3>Details</h3>

      <div>Project description: {project?.description}</div>
      <div>
        <h3>Tasks</h3>
        {tasks && (
          <ul>
            {tasks.map((task) => (
              <li key={task.id} className="task">
                <div className="task-header">
                  <strong>{task.title}</strong>
                  <strong>{task.description}</strong>
                  <span>{task.status.replace("_", " ")}</span>
                </div>
                <small>Assigned to:</small>{" "}
                {users && (
                  <small>
                    {users.find((u) => u.id === task.userId)?.name ||
                      "Unassigned"}
                  </small>
                )}
                <div className="task-actions">
                  <label>
                    Update Status:
                    <select
                      value={task.status}
                      onChange={(e) =>
                        handleStatusChange(task.id, e.target.value)
                      }
                      style={{ marginLeft: "0.5rem" }}
                    >
                      <option value="TODO">TODO</option>
                      <option value="IN_PROGRESS">IN_PROGRESS</option>
                      <option value="DONE">DONE</option>
                    </select>
                  </label>
                  <label>
                    Assign User:
                    <select
                      value={task.userId || ""}
                      onChange={(e) =>
                        handleAssignUser(task.id, e.target.value)
                      }
                      style={{ marginLeft: "0.5rem" }}
                    >
                      <option value="">Select user</option>
                      {users?.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {!showAddTaskForm && (
        <button
          onClick={() => {
            setShowAddTaskForm(true);
          }}
        >
          Add task
        </button>
      )}
      {showAddTaskForm && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={newTask.title}
            onChange={handleChange}
          />
          <input
            type="text"
            name="description"
            value={newTask.description}
            onChange={handleChange}
          />
          <button>Create new task</button>
        </form>
      )}
    </div>
  );
};
