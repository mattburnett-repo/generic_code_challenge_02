# Generic Coding Challenge 02

## About

This is the repo for generic code challenge #2.

It calls a 3rd party API as a data source. The API accesses data about estimated solar panel production and is briefly described below.
The requested data is retrieved, a simple transformation is made to that data, and this data is displayed in the client UI.

It consists of one repo, which contains code for both the [backend](./backend) and the [frontend](./frontend).

The required modules for both the frontend and backend must first be installed.

This project uses Typescript / React / Node as the main elements of its stack.

## Dev Notes

- The 3rd party API is described at this url: [https://doc.forecast.solar/doku.php?id=api:estimate](https://doc.forecast.solar/doku.php?id=api:estimate).
  - This API provides a solar production estimate for specific location (defined by latitude and longitude) and a specific plane orientation (defined by declination and azimuth) for an installed module power. Basically 'where the solar panel is' and 'in which direction the solar panel is pointing'.
  - To keep things simple, calls to this API receive a solar production estimate as JSON for 52° north, 12° east, for a installation with a declination of 37° looking south (0°) with 5.67 kWp.
    - Further refinement of this application should allow an end user to specify lat / log values, as well as declination / other variables.

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

## To Do

- Everything can always be better.
- Use TypeScript `<Record>` type.
- More / better typing in frontend components (refer to TODO's in files).
- Add UI functionality to allow end user to specify lat / long values and other possible variables.
- Docker container.
- Replace data fetch in frontend/AppContainer.tsx with useQuery().
- Clean up the minor TODO's in the files.
- Incorporate more API's and combine them using graphQL.
- Tests?
  - For a project this small, tests are a bit of overkill.
