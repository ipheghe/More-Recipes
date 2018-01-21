[![Build Status](https://travis-ci.org/ipheghe/More-Recipes.svg?branch=development)](https://travis-ci.org/ipheghe/More-Recipes)  [![Coverage Status](https://coveralls.io/repos/github/ipheghe/More-Recipes/badge.svg?branch=development)](https://coveralls.io/github/ipheghe/More-Recipes?branch=development)  [![Code Climate](https://codeclimate.com/github/ipheghe/More-Recipes/badges/gpa.svg)](https://codeclimate.com/github/ipheghe/More-Recipes) [![Test Coverage](https://api.codeclimate.com/v1/badges/cd2896896faf04e6e605/test_coverage)](https://codeclimate.com/github/ipheghe/More-Recipes/test_coverage)
# More-Recipes
More-Recipes provides a platform for users to share the awesome and exciting  recipe ideas they have invented or learnt.  Suppose a user comes up with a recipe,  he/she can post it on More-Recipes and  get feedback in form of reviews and votes from other users who explore that recipe. Users can also keep a list of their favorite recipes on the application.

## Table of Contents
- [Application Features](#application-features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Endpoints](#endpoints)
- [API Documentation](#api-documentation)
- [Running the tests](#running-the-tests)
- [Contributing to the Project](#contributing-to-the-Project)
- [FAQ](#faq)

# Application Features
* Unauthenticated users can create accounts on the application
* Unauthenticated users can login to the application to access the full features
* Authenticated users can create and post recipes
* Authenticated users can edit and delete recipes they have posted
* Authenticated users can view top recipes 
* Authenticated users can view other users recipes, upvote, downvote, and post reviews
* Authenticated users can add recipes posted by other users to their favorite recipe list
* Authenticated users can create categories for their favorited recipes

# Technology Stack
* NodeJS
* Express
* Sequelize ORM
* Postgresql Relational Database
* HTML/CSS & Bootstrap4
* React JS
* Redux JS

## Getting Started
Get the app running locally in the following way:
```
# Clone the Repo
git clone https://github.com/ipheghe/More-Recipes.git

# Install all dependencies
npm install

# Run Database migrations
sequelize db:migrate

# Run the application
> npm start

# Open running application
> http:localhost:8000/
```
The server will now be running at `http://localhost:8000`
  
## API Documentation
Access Application API documentation through this link [Here](https://more-recipes-ovie.herokuapp.com/api-docs)

## Running the tests
The application uses the following libraries for testing:
-   Mochai/Chai and Supertest for backend testing
-   Enzyme and Jest for front end testing
-   NightWatch for End-2-End testing
Instructions to test the application:
-   Run server-side test with `npm test`
-   Run client-side test with `npm run test:client`
-   For end to end test: 
    -  Run `npm run e2e-server` to start up nightwatch standalone server
    -  Run `npm run test:e2e` to run end to end test

## Contributing to the Project
Contributions are welcome and appreciated. To contribute

-  Fork this repository [here](https://github.com/ipheghe/More-Recipes/)
-  Open a terminal and execute the following command to make a local copy
`$ git clone https://github.com/ipheghe/More-Recipes.git`
-  Run this code to navigate into the folder `cd more-recipes`
-  Make your contributions to your local copy of the project
-  Run `git add` and `git commit` to commit your contributions to the project
-  Run `git push` to push your changes to your copy of the repository
-  If you feel you've made a contribution that will improve the project, raise a pull Request against the development branch.
- Be descriptive enough about your contributions so other contributors will understand what you've done
-  I look forward to your pull requests!

## FAQ
#### Is this an Open-Source Application?

    Yes it is, and contributing to the development of this
    application is by raising PRs
    

#### Who can contribute?

    Anyone!. This application is open to all those who want to
    contribute to open-source development and are willing to follow
    set standards for contributing.
    
#### Is there a set standard for PRs to this repository?

    Yes, there are set conventions for PRs to this repository and can be found
    in the project wiki.
    
#### What language was used to develop this application?

    This project is a full stack Javascript application
    
#### Can I clone this application for personal use?

    Yes!. This application is licensed under MIT, and is open for
    whatever you may choose to use it for.

## Credits

  Ovie Ipheghe, Andela Fellowship

## License
  This project is available for use and modification under the MIT License. See the LICENSE file for more details.

  

