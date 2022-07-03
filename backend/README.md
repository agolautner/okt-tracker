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
