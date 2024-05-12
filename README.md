# my-web-app.

## Getting started

1. Install Node.js v18.17.1 or higher. We recommend [installing Volta](https://docs.volta.sh/guide/getting-started)
   to auto switch Node.js versions between projects seamlessly.
2. `npm i`
3. `cp .env.local.example .env.local` and fill in the empty values
4. `npm run dev` and visit `http://localhost:3001`

## Project Structure 
For this project, we are implementing Structure of the following:
-  `components`: global scoped reusable UI components.
-  `lib`: global scoped variables, common helpers (fetch, hooks, mock), and Typescript definition.
-  `page`: path that can be accessed from browser URL (NextJS built-in routing system)
-  `public`: asset-related files are placed here.

## Project Architecture 
For this project, we are implementing Architecture of the following:
-  `Repository (our fetch common helper)`: the goal of this layer is only to call the API endpoints without needing to know any API Payload-related and UI-related business logic.
-  `Domain (services folder)`: the goal of this layer is to perform API Payload-related computation, meaning this layer doesn't know about UI-related business logic.
-  `Presentational (UI and react-query)`: the goal of this layer is to perform UI flow based on required business logic. This layer will operate based on the data from Domain Layer AND also generate an output of the required data for Domain Layer.

## Learn more

The project is mostly Next.js with helpers/configurations set up for our use.

To learn more about Next.js, head over to their [docs](https://nextjs.org/docs/getting-started)

### Contributions

Everyone is welcome to contribute to this project. Feel free to open an issue if you have question or found a bug.

### License

Licensed under the MIT License, Copyright © 2022

See [LICENSE](LICENSE) for more information.
