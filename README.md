# React frontend boilerplate 3.0.0

In order to use the boilerplate you will need NodeJS to be installed on your system.

## Setup Node.js

In order to setup NodeJS you need to follow the current steps:

### Mac OS X

- Step1: Install Home brew

```
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

$ brew -v
```

- Step2: Install Node using Brew

```
$ brew install node

$ node -v

$ npm -v
```

### Linux Systems

- Step1: Install Node using apt-get

```
$ sudo apt-get install curl python-software-properties

$ curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -

$ sudo apt-get install nodejs

$ node -v

$ npm -v
```

## Setup React Frontend Boilerplate Application

- Step1: Git clone the application

```
$ git clone https://github.com/deakin-launchpad/react-frontend-boilerplate.git

$ cd react-frontend-boilerplate
```

- Step2: Install node modules

```
$ npm i

or

$ npm install
```

- Step3: Start the application

```
For Development Mode

$ npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Configuration

The basic configuration of the application is defined in JSON files. In the future, these files can be used to define application configuration during development. The config files are already created with basic configuration to start with.

- Developer Settings

  1. File location: `src/constants/devMode.json`.
  2. The Dev mode button allows users to login into an application without entering login credentials. Instead, they can be configured by updating `user & password` keys and will be auto-filled for quick login. This will only work when the application is connected to a server and the user already is registered inside the database.
  3. The dev mode button position can be configured using keys namely `verticlePosition` which accepts `top or bottom` value & `horizontalPosition` accepts `left or right` value.

- Layout Settings

  1.  File location `src/constants/layout.js`.
  2.  The application side menu can be configured easily using a JSON file to avoid writing long lines of code.

  ```
  {
  	items: [
  		{
  			"name": Name of button,
  			"type": "button",
  			"icon": "mdi:home", // COMMENT: Add icon name you would like to display
  			"helpingAttribute": "/home", // COMMENT: Add path name to you view
  			"customTitle": "This is my custom title" // COMMENT: The title will be displayed along with icon in side menu
  }
  ```

  3.  You can find icon names from [Iconify.design](https://iconify.design/icon-sets/).

- IndexedDB settings

  1. File location `src/helpers/database/idb/config.json`.
  2. The idb uses IndexedDB API to store a significant amount of structured data, including files/blobs.
  3. The boilerplate provides the basic configuration for idb where the main configurable key is `dbName`. The name provided in the file will be used for storage in the client browser.

- Connection Settings
  1.  File Location `src/constants/connection.js`
  2.  During development, the login using server can be skipped by changing `"bypassBackend": false` to `"bypassBackend": true` .
  3.  The boilerplate already has socket client which can be enabled by changing `"initSocket": false` to `"initSocket": true`
  4.  If the socket requires to use the access token verification it can also be enabled by changing `"accessTokenVerification":false` to `"accessTokenVerification":true`
  5.  Any other socket options can be defined on the `"socketDefaultOptions"` variable in the configuration.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>

Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
