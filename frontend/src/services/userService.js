import axios from "axios";

export function getAllUsers() {
  return axios.get("http://localhost:3000/users");
}

export function getAllProjects() {
  return axios.get("http://localhost:3000/projects");
}

export async function getOneProject(idProject) {
  const response = await axios.get(
    `http://localhost:3000/projects/${idProject}`
  );
  return response.data;
}

export async function addProject(data) {
  return await axios.post("http://localhost:3000/projects", data);
}

export function addTask(data) {
  return axios.post("http://localhost:3000/tasks", data);
}

export function updateTask(id, data) {
  return axios.post(`http://localhost:3000/projects/${id}`, data);
}

export function getTasksByProject(idProject) {
  return axios.get(`http://localhost:3000/tasks/project/${idProject}`);
}
