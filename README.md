# Generic Coding Challenge 02


## Assignment
This is the repo for generic code challenge #2.

It consists of one repo, which contains code for both the [backend](./backend) and the [frontend](./frontend).

The required modules for both the frontend and backend must first be installed.

This project uses Typescript / React / Node as the main elements of its stack.

It calls a 3rd party API as a data source. The data for a requested domain name is retrieved, and a simple risk calculation is made from that data.

## Installation / Getting Started
First, clone the repo:
```sh
git clone https://github.com/mattburnett-repo/generic_code_challenge_02
```
Then, change to the `generic_code_challenge_02` directory:
```sh
cd generic_code_challenge_02
```
### Backend
After cloning the repo and changing to its root directory, you can install the backend, compile it to TypeScript, and start the backend.

* Install the backend modules:
```sh
cd backend
yarn
```
* Copy the .sample.env file:
```sh
cp .sample.env .env
```

* The backend uses a 3rd party API to retrieve DNS information for a given domain. 
* This API requires a key, which for security reasons is not included in this repo. The key for this API is provided separately.
* Copy the api key into the `.env` file as the `DNS_API_KEY` value.

You will need to run the Typescript compiler to create the JavaScript files for the backend.

* When you are in the `backend` directory, type
```sh
yarn tsc
```
* This should run the TypeScript complier, which emits JavaScript files to the `dist` folder.
* The backend runs from code in the `dist` folder.

To start the backend in development mode (using nodemon):
```sh
yarn start:dev
```

To start the backend without nodemon:
```sh
yarn start
```

You should find the backend app at `http://localhost:4000`

## Frontend
Open a separate terminal window and cd to the `coding-challenge-mattburnett-repo` directory.

Change to the frontend directory and install the frontend modules:
```sh
cd frontend
yarn
```

Start the frontend:
```sh
yarn start
```

You should find the frontend app in your browser at `http://localhost:3000`

## To Do
* Everything can always be better.
* Docker container.
* CSS for the text in ResponseDisplay.tsx (font weight and color). 
* Replace data fetch in frontend/AppContainer.tsx with useQuery().
* Clean up the minor TODO's in the files.
* Incorporate more API's and combine them using graphQL.