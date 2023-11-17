<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
[![LinkedIn][linkedin-shield]][linkedin-url]



<div align="center">
  <h3 align="center">fullstack-spirit-halloween</h3>

  <p align="center">
    A fullstack application that allows users to explore which department stores became home to Spirit Halloween locations in 2023.
    <br />
    <a href="https://github.com/StephenODea54/fullstack-spirit-halloween"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://fullstack-spirit-halloween.vercel.app/">View Application</a>
    ·
    <a href="https://github.com/StephenODea54/fullstack-spirit-halloween/issues/new?assignees=&labels=bug&projects=&template=bug_report.md&title=Bug">Report Bug</a>
    ·
    <a href="https://github.com/StephenODea54/fullstack-spirit-halloween/issues/new?assignees=&labels=enhancement&projects=&template=feature_request.md&title=Feature+Request">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

This project is inspired by [this reddit post](https://www.reddit.com/r/dataisbeautiful/comments/17klmfq/the_decline_of_department_stores_illustrated_by/) and the work of Cody Huff and Jon Kropko from the University of Virginia.

Spirit Halloween is a seasonal retailer that sells Halloween decorations, costumes, and accessories. It is the largest Halloween retailer in North America, with over 1,450 pop-up locations. Often the availability of these locations for the pop-up stores are a result of the former business shutting down.

This project is a web-based dashboard that allows users to explore simple summary statistics of the former U.S. stores that became home to Spirit Halloween locations in 2023.

The server for this application is hosted on [Render](https://render.com/docs) and the web application is hosted on [Vercel](https://vercel.com/docs). Please check out the live verson of the application [here!](https://fullstack-spirit-halloween.vercel.app/)

<p align="right">(<a href="#readme-top">Back to top</a>)</p>



### Built With

* [![React][React.js]][React-url]
* [![Node][Node.js]][Node-url]
* [![Sqlite][Sqlite.db]][Sqlite-url]
* [![Express][Express.js]][Express-url]
* [![Typescript][Typescript.ts]][Typescript-url]
* [![Python][Python.py]][Python-url]
* [![Tailwind][Tailwind.css]][Tailwind-url]
* [![Jest][Jest.js]][Jest-url]
* [![Testing-Library][Testing-Library.js]][Testing-Library-url]

<p align="right">(<a href="#readme-top">Back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these steps:

### Prerequisites

You will need node, pnpm, and python installed to run this project locally.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/StephenODea54/fullstack-spirit-halloween.git
   ```
2. Database Module
     - If working on the database python scripts, you will need to install the required packages:
       ```sh
       pip install -r db/requirements.txt
       ```
3. Frontend Module
     - Install required packages:
       ```sh
       cd web && pnpm install
       ```
4. Backend Module
     - Install required packages:
       ```sh
       cd api && pnpm install
       ```
5. Husky
     - Husky is used to automate testing, linting and formatting for any commits pushed to this repository.
     - If planning to contribute, please set the execute permission of the husky file to be run as a program by running the following command in both the `web` and `api` directories: 
       ```sh
       chmod +x ./.husky/pre-commit
       ```
6. You may notice that the frontend and backend make use of environment variables. You do not need to worry about these as the node servers will work out of the box without you having to configure them.

<p align="right">(<a href="#readme-top">Back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Project Structure

This project is broken down into three main parts:

1. The `db` directory is responsible for scraping the data from Spirit Halloween's API and storing that data inside of a SQLite database.
     - The `extract` directory holds the script for making calls to the api and storing the information as a csv file to the `output` directory. The api uses a query parameter `search` that returns results based on zip code. In order to make the data as exhaustive as possible, all of the available U.S. zip codes were taken from [opendatasoft.com](https://data.opendatasoft.com) and are used as inputs for this query parameter. You can find the csv file for these zip codes in the `input` directory.
     - The `transform` directory makes cleans and normalizes the data and writes them to csv files in the `output` directory.
     - The `load` directory uses [SQLAlchemy](https://docs.sqlalchemy.org/en/20/) to write the data to the database, which is exported to `api/database.db`.

2. The `api` directory is responsible for serving the api for client use.
     - The api is an express server with different routes that request data from the SQLite database.
     - Directory Structure:
       - `config`: Uses [`dotenv`](https://www.dotenv.org/docs/quickstart) to manage .env files and exports them.
       - `db`: Creates the database connection and defines the schema using the [drizzle](https://orm.drizzle.team/) ORM.
       - `logging`: Simple logging middleware for Express.
       - `routes`: Defines all of the api endpoints, which are:
           - `api/businesses`: returns a list of all of the business names.
           - `api/businesses/counts`: returns a list of businesses and how many Spirit Halloween locations they had. Takes two optional query parameters:
                - `sort`: Use this to return the results in ascending or descending order. Valid values are `ASC` and `DESC`. Defaults to `DESC`.
                - `limit`: Controls how many results are returned. Defaults to 10.
           - `api/businesses/max`: returns the business with the highest amount of locations.
           - `api/locations`: returns a list of all the address information for the different business locations.
           - `api/locations/total`: returns the total amount of locations.
           - `api/states`: returns a list of the states.
       - `services`: Defines functions for retrieving the data from the database for use in the router.
       - `tests`: Unit tests using Jest.
       - `types`: TypeScript type used throught the application.
       - `app.tsx`: The actual express app (broken into its own file to play nicely with Jest)
       - `index.tsx`: The entry point of the application.
3. The `web` directory is responsible for serving the web application.
     - `components`: Reusable UI elements. Also contain their unit tests.
         - This project uses the [Tremor Component Library](https://www.tremor.so/) so not a whole lot of action going on here.
     - `config`: Same purpose as defined in the api.
     - `contexts`: Stores React Context Providers.
     - `features`: Stores the [`react-query`](https://tanstack.com/query/v4/docs/react/overview) api calls and all of the components and types associated with them. This is where the bulk of the code lives.
     - `hooks`: Stores custom hooks.
     - `lib`: Util functions.
     - `pages`: Stores the components that represent the "pages" of the application.
     - `providers`: Stores the components that need to wrap the `App.tsx` file (`react-query`, `react-helmet-async`, etc.)
     - `types`: Same purpose as defined in the api.
     - `App.tsx`: Entry point of the application.


<!-- ROADMAP -->
## Roadmap

- [ ] Add Frontend Dockerfile
- [ ] Fix data persistency in Dockerfile for Backend
- [ ] Add docker-compose
- [ ] Add docker install for local setup (since we do not need it for production purposes)

See the [open issues](https://github.com/StephenODea54/fullstack-spirit-halloween/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">Back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">Back to top</a>)</p>



<!-- CONTACT -->
## Contact

Stephen O'Dea - odeastephen1@gmail.com

Project Link: [https://github.com/StephenODea54/fullstack-spirit-halloween](https://github.com/StephenODea54/fullstack-spirit-halloween)

<p align="right">(<a href="#readme-top">Back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/stephenodea54/
[product-screenshot]: images/screenshot.png
[Express.js]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[Express-url]: https://expressjs.com/
[Jest.js]: https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white
[Jest-url]: https://jestjs.io/docs/getting-started
[Node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/en/docs
[Python.py]: https://img.shields.io/badge/Python-14354C?style=for-the-badge&logo=python&logoColor=white
[Python-url]: https://docs.python.org/3/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Sqlite.db]: https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white
[Sqlite-url]: https://www.sqlite.org/docs.html
[Tailwind-url]: https://tailwindcss.com/blog/tailwindcss-v3
[Tailwind.css]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Testing-Library.js]: https://img.shields.io/badge/testing%20library-323330?style=for-the-badge&logo=testing-library&logoColor=red
[Testing-Library-url]: https://testing-library.com/docs/react-testing-library/intro/
[Typescript-url]: https://www.typescriptlang.org/
[Typescript.ts]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[Vercel.js]: https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white
[Vercel-url]: https://vercel.com/docs
