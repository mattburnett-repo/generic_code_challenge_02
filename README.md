![repo header](public/header.png?raw=true "Generic FSE Code Challenge 02")

# Generic Coding Challenge 02

## About

This is the repo for generic code challenge #2.

It calls a 3rd party API as a data source. The API accesses data about estimated solar panel production and is briefly described below.
The requested data is retrieved, a simple transformation is made to that data, and this data is displayed in the client UI.

It consists of one repo, which contains code for both the [backend](./backend) and the [frontend](./frontend).

This project uses Typescript / React / Node as the main elements of its stack.

You can [start the Docker container](#docker) for a simple start-up of the project. If you don't want to do this, the required modules for both the frontend and backend [must first be installed](#installation).

## Dev Notes

- The 3rd party API is described at this url: [https://doc.forecast.solar/doku.php?id=api:estimate](https://doc.forecast.solar/doku.php?id=api:estimate).
  - This API provides a solar production estimate for specific location (defined by latitude and longitude) and a specific plane orientation (defined by declination and azimuth) for an installed module power. Basically 'where the solar panel is' and 'in which direction the solar panel is pointing'.
  - To keep things simple, calls to this API receive a solar production estimate as JSON for 52° north, 12° east, for a installation with a declination of 37° looking south (0°) with 5.67 kWp.
    - Further refinement of this application should allow an end user to specify lat / long values, as well as declination / other variables.

## Installation

First, you need to clone the repo and move to the root directory:

- Clone the repo:

```sh
git clone https://github.com/mattburnett-repo/generic_code_challenge_02
```

- Change to the `generic_code_challenge_02` directory:

```sh
cd generic_code_challenge_02
```

From here you can avoid the installation steps by [starting the Docker container](#docker) for this project.

That being said, here is how to install and start the pieces of this project:

### Backend

After cloning the repo and changing to its root directory, you can install the backend, compile it to TypeScript, and start it.

- Install the backend modules:

```sh
cd backend
yarn
```

- Copy the `.sample.env` to the `.env` file:

```sh
cp .sample.env .env
```

- The backend uses a 3rd party API to retrieve data for a given search term. The URL for this API is provided in the `.env` file

You will need to run the Typescript compiler to create the JavaScript files for the backend.

- In the `backend` directory, type

```sh
yarn tsc
```

- This should run the TypeScript complier, which emits JavaScript files to the `dist` folder.
- The backend runs from code in the `dist` folder.

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

Open a separate terminal window and cd to the `generic_code_challenge_02` directory.

Change to the frontend directory and install the frontend modules:

```sh
cd frontend
yarn
```

Copy the `.sample.env` to the `.env` file:

```sh
cp .sample.env .env
```

Start the frontend:

```sh
yarn start
```

You should find the frontend app in your browser at `http://localhost:3000`

## Docker

You can start the entire project by using Docker. That way you don't have to go through all of the install steps listed above.

The following steps assume that you have already cloned the repo and are in the `generic_code_challenge_02` directory.

First, create the `.env` files

```sh
cd backend
copy .sample.env .env
```

```sh
cd frontend
copy .sample.env .env
```

In the `generic_code_challenge_02` directory

```sh
docker compose up
```

- You should find the app in your browser at `http://localhost:3000`

To stop the Docker container, you can either

```sh
docker compose down
```

in another terminal, or just Ctrl+C in the terminal that is running the container.

## To Do

- Everything can always be better.
- More / better linting.
  - TS, mostly.
- Figure out how to intercept errors sent from the server to Axios, rather than showing the user a generic Axios error.
- Change estimate display layout to grid format, instead of stacking each estimate on top of each other.
- Use TypeScript `<Record>` type.
- More / better typing in frontend components (refer to TODO's in files).
- Add UI functionality to allow end user to specify lat / long values and other possible variables.
- Upload Docker container to Dockerhub.
- Replace data fetch in frontend/AppContainer.tsx with useQuery().
- Clean up the minor TODO's in the files.
- Incorporate more API's and combine them using graphQL.
- Logging.
- Tests
  - For a project this small, tests are overkill. But it could be a good excercise to build out tests.
