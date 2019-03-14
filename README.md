# AAD - API

AAD-API that is the backend for AAD-UI.
Provides back-end RESTful services for users to post reviews and reports to be generated
from user provided metrics.

## Getting Started

### Prerequisites

The following are required to stand up a development environment.

* [[NPM & Node]](https://www.npmjs.com/get-npm) - Needed to download packages and run server.
```
// To verify node install
node -v

// To verify npm is installed
npm -v
```
* [[PostgreSQL]](https://www.postgresql.org/download/macosx/) - Requires local DB instance.
```
//Default Connection Information
database: 'postgres',
user: 'postgres',
password: 'example',
port: 5432
```

### Environment Variables
Create a `.env` file at directory root to override defaults.
````
NODE_ENV:           [development]
PUBLIC_URL:         [http://localhost:3001] #Incoming Calls
SECRET:             [secret]
PORT:               [3000] #Express internal port

#DOCKER-ENV-VARIABLES
EXPOSED_PORT:       [3000] #Docker port to expose
````

### Installing Locally
1. Clone this repo.  [[AAD-API GITHUB]](https://github.com/sofwerx/AAD-API).
2. Alter `knexfile.js` with postgres login credentials.
3. `npm install` to install all required dependencies.
4. `npm run db:migrate` to stand-up database schema.
5. `npm run db:load` to input database with seed data.
6. `npm run dev` Starts an instance that performs ongoing code quality analysis.

Should be able to hit a sample endpoint.
`localhost:3000/tools/`

### Additional commands
* `npm run dev:nolint` Starts an instance without lint support.
* `npm run apidoc` Generates API docs available at `localhost:3000/apidoc`.

### Database commands
* `npm run db:migrate` - Creates and/or updates DB schema.
* `npm run db:rollback` - Rollback DB Schema.
* `npm run db:load` - Performs DB seed. CAUTION: Wipes data.
* `npm run db:currentVersion` - Returns current DB version.

## Docker Setup
To test docker functionality. You will need to install [Docker](https://docs.docker.com/compose/install/) locally.
* `docker-compose build` - Builds aad-postgres and aad-api containers
* `docker-compose up` - Creates and attaches container instances.
* `docker-compose down` - Stop Container instances.
* `docker exec aad-api knex seed:run` - Necessary on initial setup.

## Application Structure

- `app.js` - The entry point to our application. This file defines our express server and connects it to PostgreSQL using Knex. It requires the route .js files as an entry point to our application.
- `db/` - This folder contains database configuration/setup information including seeds, migrations, and sample_data that can be loaded using knex.
- `server/` - Houses the server logic for the API in a tiered architecture. Routes > Controllers > Models.
- `server/routes` - route.js files perform basic express routing logic.
- `server/controllers` - controller.js files perform tasks in a particular model domain.
- `server/models` - model.js files define db models and extend knex-model-helper.js(provides common db functionality).
- `server/docs` - apidoc.js files conform to apiDoc standard that generates API Documentation.

## ESLint Code Styles
To maintain javascript code quality. An ESLint plugin is configured to use 
`airbnb-base` as the standard for it's analysis. Recommended to use `npm run dev`
to provide ongoing analysis.

## Production Deployment
[![Build Status](https://travis-ci.org/sofwerx/AAD-API.svg?branch=master)](https://travis-ci.org/sofwerx/AAD-API)

## Built With

* [Node](https://nodejs.org/en/docs/) - JavaScript Runtime Engine
* [NPM](https://docs.npmjs.com/about-npm/) -  Javascript package manager
* [Express](https://expressjs.com/) - Web framework for Node.js
* [Knex](https://knexjs.org/) -  SQL query builder for Postgres

## Dev Dependency Packages

* [ESLint](https://www.npmjs.com/package/eslint) - Code Quality Tool
* [apiDoc](https://www.npmjs.com/package/apidoc) - RESTful API Documentation
* [Morgan](https://www.npmjs.com/package/morgan) - HTTP request logger

## Authorization/Authentication Packages

* [bcryptjs](https://www.npmjs.com/package/bcryptjs) - Used for Password Encryption
* [express-jwt](https://www.npmjs.com/package/express-jwt) - Express JWT Solution
* [express-session](https://www.npmjs.com/package/express-session) - Express Session Handler
* [passport](https://www.npmjs.com/package/passport) - JWT Strategy Handler
* [passport-local](https://www.npmjs.com/package/passport-local) - Passport Strategy to handle authentication
