# Authentication and authorization

The user registration and authorization interface is implemented.
The profile picture is displayed depending on the user's role (admin or user).

### Stack:

- Node.js
- Express.js
- MongoDb
- React
- Redux

## Run the project

Clone the repository.

Being in the root directory of the project, install all the necessary dependencies with the command:

```sh
npm install
```

Go to the client directory and install the client-side dependencies:

```sh
cd client
npm install
```

Go back to the root directory and run the project:

```sh
cd ..
npm run dev
```

_Note: make sure ports 5000 and 3000 are free._

Next, go to the browser on [http://localhost:3000/](http://localhost:3000/).

### Deployment
The project is deployed [here](https://auth-node-react-mongo.herokuapp.com/).
