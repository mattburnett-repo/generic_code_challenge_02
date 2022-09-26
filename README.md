# Baobab Insurance - Coding Challenge


## Assignment
This is the repo for the Baobab Insurance coding challenge.

It follows the instructions provided [here](./instructions.md).

It consists of one repo, which contains code for both the [backend](./backend) and the [frontend](./frontend).

The required modules for both the frontend and backend must first be installed.

## Installation / Getting Started

### Backend
After cloning the repo, you can install the backend, compile it to TypeScript, and start the backend.

First, change to the `coding-challenge-mattburnett-repo`directory
```sh
cd coding-challenge-mattburnett-repo 
```

Install the backend modules:
```sh
cd backend
yarn
```
Copy the .sample.env file
```sh
cp .sample.env .env
```

The backend uses a 3rd party API to retrieve DNS information for a given domain. 

This API requires a key, which for security reasons is not included in this repo. The key for this API is provided separately.

Copy the api key into the `.env` file as the `dns_api_key` value.

You will need to run the Typescript compiler to create the JavaScript files for the backend.

When you are in the `backend` directory, type
```sh
yarn tsc
```
This should run the TypeScript complier, which emits files to the `dist` folder.\ 
The backend runs from code in the `dist` folder

If you want to start the backend in development mode (using nodemon)
```sh
yarn dev:start
```

To start the backend without nodemon
```sh
yarn start
```

## Frontend

