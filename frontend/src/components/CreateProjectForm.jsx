import { useState } from "react";
import { NavLink } from "react-router";
import { addProject } from "../services/userService";
import { z } from "zod";

export const CreateProjectForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const schema = z.object({
    title: z.string(),
    description: z.string(),
  });

  function handleSubmit(e) {
    e.preventDefault();

    const newProject = {
      title: title.trim(),
      description: description.trim(),
    };

    const data = schema.parse(data);

    addProject(newProject);
  }

  return (
    <div className="container">
      <nav>
        <NavLink
          to="/projects"
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          Projects
        </NavLink>
      </nav>
      <h2>Create New Project</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="name">Project Name</label>
        <input
          id="name"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-describedby="name-error"
        />

        <label htmlFor="description">Project Description</label>
        <textarea
          id="description"
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          aria-describedby="description-error"
        />

        <button type="submit" style={{ marginTop: "1rem" }}>
          Create Project
        </button>
      </form>
    </div>
  );
};
