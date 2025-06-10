Mini Project Management App

## **Backend Stack**

NestJS
TypeORM
PostgreSQL
class-validator

## **Frontend Stack**

React (Vite)
TanStack Query
React Hook Form
Zod
Axios

## **Backend Features**

1. User Management
   Create, list, update, delete users
2. Project Management
   Create, list, update, delete projects
   Each project is owned by a user
3. Task Management
   Create, list, update, delete tasks
   Each task belongs to a project
   Each task is assigned to a user
   Task include status (e.g. TODO, IN_PROGRESS, DONE)
4. Validation
   Validate all incoming data using DTOs

## **Frontend Features**

1. Project List Page
   Show all projects
   Link to project details
2. Project Details Page
   View project info and its tasks
   Add task to the project
   Assign task to a user
   Update task status
3. Create Project Form
   Create a new project with validation
4. Task Form
   Create a task inside a project
5. Data Fetching & Forms
   Use TanStack Query for all data fetching/mutations
   Use React Hook Form + Zod for form handling and validation

## **Entities**

**User**
Name
Email
**Project**
Title
Description
Owner (User)
**Task**
Title
Description
Belongs to a Project
Assigned to a User
Status (e.g. todo, in progress, done)
