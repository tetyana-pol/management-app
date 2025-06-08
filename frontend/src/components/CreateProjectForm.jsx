import { useState } from "react";
import { useNavigate } from "react-router";
import { addProject } from "../services/userService";
// import { z } from "zod";

export const CreateProjectForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  /* const schema = z.object({
    title: z.string(),
    description: z.string(),
  }); */

  function handleSubmit(e) {
    e.preventDefault();

    const newProject = {
      title: title.trim(),
      description: description.trim(),
    };

    addProject(newProject);

    setTitle("");
    setDescription("");
  }

  return (
    <div className="container">
      <div className="details">
        <button type="button" onClick={() => navigate("/")}>
          Home
        </button>
      </div>
      <h2>Create New Project</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="name">Project Name </label>
          <input
            id="name"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-describedby="name-error"
          />
        </div>
        <div style={{ marginTop: "1rem" }}>
          <label htmlFor="description">Project Description </label>
          <textarea
            id="description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            aria-describedby="description-error"
          />
        </div>

        <div>
          <button
            type="submit"
            style={{ marginTop: "1rem", border: "1px solid" }}
          >
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
};
