# OKT TRACKER

This repository contains the front and backend code for an application I made for logging hikes on the National Blue Trail of Hungary, originally created as an exam project at Codecool.

![landing page](https://github.com/agolautner/okt-tracker-fs-petproject/blob/main/images/loggedout.png?raw=true)

The app utilizes the Google OpenID flow for user authentication, and relies on a MongoDB server for storing user data, as well as information about the official stamping locations on the trail.

![google login flow](https://github.com/agolautner/okt-tracker-fs-petproject/blob/main/images/google.png?raw=true)

When displaying the individual stamping locations, an API call is made to the Google Maps Static Image API, and the returned PNG image is displayed for each location.

![displaying stamps](https://github.com/agolautner/okt-tracker-fs-petproject/blob/main/images/stamps.png?raw=true)

![interface for adding new hike logs to the user's profile](https://github.com/agolautner/okt-tracker-fs-petproject/blob/main/images/hikelog.png?raw=true)

The frontend uses the NPM package react-bootstrap to easily implement a responsive design.

[A detailed documentation of the API is available on SwaggerHub](https://app.swaggerhub.com/apis/AGOSTON/OKT/1.0.0).

## Frontend

The frontend is a simple React app. It can be started up on the localhost by installing the dependencies, then calling the run command. To put it more simply, all you need to get the frontend running locally on your computer is:

- npm i
- npm start

## Backend

### System requirements:

- nodejs
- npm

### Environment variables

The backend folder contains the code of the API, running on Express.js. In order for it to work properly, a **.env** file needs to be added to the root of this folder, containing the following values:

- PORT={port}
- APP_URL={url-of-frontend}
- JWT_SECRET={secret}
- CONNECTION_STRING={mongo-connection-string}

To utilize the errorHandler middleware, Logflare needs to be configured properly with the following values:

- LOGFLARE_SOURCE_ID={source-id}
- LOGFLARE_API_KEY={api-key}

The following values are needed in order for Google authentication to work:

- GOOGLE_CLIENT_ID={client-id}
- GOOGLE_CLIENT_SECRET={client-secret}
- GOOGLE_REDIRECT_URI={url-of-frontend}/callback/google
- GOOGLE_TOKEN_ENDPOINT=https://oauth2.googleapis.com/token
- GOOGLE_USER_ENDPOINT=null
- GOOGLE_USER_ID=null
- SCOPE=openid

Finally, the app needs to be able to access the API key for the Google Maps Static Image API:

- MAPS_API_KEY={maps-static-image-api-key}

### Starting the app

After properly setting up the **.env** file, the app can be fired up using these commands:

- npm i
- npm start
