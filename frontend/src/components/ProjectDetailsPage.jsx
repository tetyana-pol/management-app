import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { CreateTaskForm } from "./CreateTaskForm";

export const ProjectDetailsPage = () => {
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);

  const { projectId } = useParams();

  const navigate = useNavigate();

  const { data: project } = useQuery({
    queryKey: ["project", projectId],
    queryFn: async () =>
      await axios
        .get(`http://localhost:3000/projects/${projectId}`)
        .then((res) => {
          return res.data;
        }),
  });

  const { data: tasks } = useQuery({
    queryKey: ["tasks", projectId],
    queryFn: async () =>
      await axios
        .get(`http://localhost:3000/tasks/project/${projectId}`)
        .then((res) => {
          return res.data;
        }),
  });

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: async () =>
      await axios.get("http://localhost:3000/users").then((res) => {
        return res.data;
      }),
  });

  const handleStatusChange = async (id, value) => {
    try {
      await axios.patch(`http://localhost:3000/tasks/${id}`, { status: value });
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleAssignUser = async (id, value) => {
    try {
      await axios.patch(`http://localhost:3000/tasks/${id}/user`, {
        userId: +value,
      });
    } catch (error) {
      console.error("Error updating user assigment:", error);
    }
  };

  return (
    <div className="container">
      <div className="details">
        <button type="button" onClick={() => navigate("/")}>
          Home
        </button>
      </div>
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
                  <p>
                    <strong>{task.description}</strong>
                  </p>

                  <span>{task.status.replace("_", " ")}</span>
                </div>
                <small>Assigned to:</small>
                {users && (
                  <small>
                    {"  "}
                    {users.find((u) => u.id == task.user?.id)?.name ||
                      "  Unassigned"}
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
                  <p>
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
                  </p>
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
      {showAddTaskForm && <CreateTaskForm projectId={+projectId} />}
    </div>
  );
};
