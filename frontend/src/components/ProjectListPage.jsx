import { NavLink, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const ProjectListPage = () => {
  const navigate = useNavigate();

  const { data: projects } = useQuery({
    queryKey: ["projects"],
    queryFn: async () =>
      await axios.get("http://localhost:3000/projects").then((res) => {
        return res.data;
      }),
  });

  return (
    <div className="container">
      <div className="details">
        <button type="button" onClick={() => navigate("/create-project")}>
          New project
        </button>
      </div>
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
