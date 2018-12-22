# friday-feast

Whose turn is it?!?!

## Purpose

`Friday Feast` was created to keep track of whose turn it is to pick a place to eat every friday here at the place I work at.

## Tech
Built with React.js + Firebase

### Instructions

`yarn install` - to install packages

`yarn start` - to run development site

`yarn build` - to generate production site

`.env` file containing firebase credentials below needs to be manually created and placed in the root of the site.

    APP_APIKEY = "place credentials here"
    APP_AUTHDOMAIN = "place credentials here"
    APP_DATABASEURL = "place credentials here"
    APP_PROJECTID = "place credentials here"
    APP_STORAGEBUCKET = "place credentials here"
    APP_MESSAGINGSENDERID = "place credentials here"

## Firebase

### Authentication
An email type account needs to be created for the app admin area login

### Database
Database fields to be created as below

    friday-feasts
	    - activeUserKey
	    - users
	    - usersCurrentUID
	    - usersLength
### Functions
- A weekly cron job calling the `activeIndex` cloud function needs to be created to change the persons turn to pick for the week. https://cron-job.org/en/ was used.
- Firebase functions deployment instructions: https://firebase.google.com/docs/functions/manage-functions

 ### Deployment
 Instructions: https://firebase.google.com/docs/hosting/deploying