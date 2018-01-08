[![Build Status](https://travis-ci.org/ipheghe/More-Recipes.svg?branch=development)](https://travis-ci.org/ipheghe/More-Recipes)  [![Coverage Status](https://coveralls.io/repos/github/ipheghe/More-Recipes/badge.svg?branch=development)](https://coveralls.io/github/ipheghe/More-Recipes?branch=development)  [![Code Climate](https://codeclimate.com/github/ipheghe/More-Recipes/badges/gpa.svg)](https://codeclimate.com/github/ipheghe/More-Recipes)  [![Issue Count](https://codeclimate.com/github/ipheghe/More-Recipes/badges/issue_count.svg)](https://codeclimate.com/github/ipheghe/More-Recipes)
# More-Recipes
More-Recipes provides a platform for users to share the awesome and exciting  recipe ideas they have invented or learnt.  Suppose a user comes up with a recipe,  he/she can post it on More-Recipes and  get feedback in form of reviews and votes from other users who explore that recipe. Users can also keep a list of their favorite recipes on the application.

## Table of Contents
- [Requirements](#requirements)
- [Application Features](#application-features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Endpoints](#endpoints)
- [API Documentation](#api-documentation)

# Requirements
Clone or Download the project. Open the command line and cd into the folder. Install dependencies npm install. You can install nodemon and run the nodemon command to run it or just type in node server.js. Run test npm test.

# Application Features
* Users can create accounts on the application
* Users can login to the application to access the full features
* Users can create and post recipes
* Users can edit and delete recipes they have posted
* Users can view top recipes 
* Users can view other users recipes, upvote, downvote, and post reviews
* Users can add recipes posted by other users to their favorite recipe list
* Users can create categories for their favorite recipes

# Technology Stack
* NodeJS
* Express
* Sequelize ORM
* Postgresql Relational Database
* HTML/CSS & Bootstrap4

## Getting Started
Get the app running locally in the following way:
```
# Clone the Repo
git clone https://github.com/ipheghe/More-Recipes.git

# Install dependencies
npm install

# Create database models
sequelize model:create --name User --attributes username:string,password:boolean
sequelize model:create --name Recipe --attributes recipeName:string,recipeDescription:boolean

# Migrate all database models
sequelize db:migrate

# Run the application
> npm start
> babel-node ./bin/www
> Server listening on port 8000
```
The server will now be running at `http://localhost:8000`

## Endpoints
- **<code>POST:</code>/api/v1/user/signup**
  - Creates user account
- **<code>POST:</code>/api/v1/user/signin**
  - Creates user login session
- **<code>POST:</code>/api/v1/recipe**
  - Creates recipe record
- **<code>PUT:</code>/api/v1/recipe/{recipeId}**
  - Updates an existing recipe record
- **<code>DELETE:</code>/api/v1/recipe/{recipeId}**
  - Deletes an existing recipe record
- **<code>GET:</code>/api/v1/recipes**
  - Retrieves list of all existing recipes
- **<code>POST:</code>/api/v1/recipe/{recipeId}/review**
  - Adds a post review for an existing recipe
- **<code>POST:</code>/api/v1/user/category**
  - Create category for user favorite recipes
- **<code>POST:</code>/api/v1/recipe/{recipeId}/{categoryId}/favorite**
  - Adds a recipe to user favorites
- **<code>GET:</code>/api/recipes?sort=upvotes&order=descending**
  - Retrieves list of all existing recipes by highest number of upvotes in descending order
  
## API Documentation
Access Swagger API documentation through this link [Here](https://more-recipes-ovie.herokuapp.com/api-docs)

  

