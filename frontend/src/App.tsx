import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { ProjectListPage } from "./components/ProjectListPage";
import { ProjectDetailsPage } from "./components/ProjectDetailsPage";
import { CreateProjectForm } from "./components/CreateProjectForm";
import { NotFound } from "./components/NotFound";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ProjectListPage />} />
          <Route path="/projects/:projectId" element={<ProjectDetailsPage />} />
          <Route path="/create-project" element={<CreateProjectForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
