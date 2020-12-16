# Trial task for fullstack developer

In this trial task, you are asked to create an application that provides a simple create-and-retrieve interface for a cars inventory. The application is required to be designed as a SPA based on React.JS for frontend and any node.js HTTP server for backend. The application must feature a grid suitable to represent a paged sorted list of cars (total number of cars in the inventory might exceed 10000 items). Besides that, the application must provide a form that allows to add a new car into the inventory. The frontend must take a reasonable time to load the data and render it, delays longer than 5 seconds are not acceptable.

Please use the data dump provided within the repository to have a reference of the application's domain model.

Your submission must contain the following artifacts besides the application code:

* Two test suites, one for the frontend and one for the backend
* Two Dockerfile descriptors for each part of the application
* docker-compose.yml descriptor that would allow to run both parts of the application locally

Please consider using PostgreSQL as the database engine. You are free to alter database schema as you need - adding indices, triggers, functions, etc.

# Suggestions for the frontend
* Use TypeScript (Don't need to be strict)
* Develop using NextJS framework
* Use SASS and TailwindCSS for styling
* Use hooks and functional-style code as much as possible
* GraphQL would be a plus

# Submission delivery

Please fork this repository and create a pull request once your submission is ready.
