import { useState, useEffect } from "react";
import { getAllProjects } from "../services/userService";
import { NavLink } from "react-router-dom";

export const ProjectListPage = () => {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    getAllProjects().then((res) => setProjects(res.data));
  }, []);

  return (
    <div className="container">
      <h3>All projects</h3>
      <ul>
        {projects?.map((el) => (
          <li key={el.id}>
            <NavLink to={`projects/${el.id}`}>{el.title}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
