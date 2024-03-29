# Drum Machine - Project 3

[Demo](https://74c5.github.io/demos/FEDL/DrumMachine/)

Project 3 of freecodecamp.org 'Front End Developement Libraries' course. 

The project goal of the project is utilise several front end libraries (and interdependencies) to implement a clone (ish) of https://codepen.io/freeCodeCamp/full/MJyNMd.

Though, it is more of a sound board really.

Libraries used:
- [React](https://reactjs.org)
- [Redux](https://redux.js.org) (for global state)
- [Sass](https://sass-lang.com) (Javascript based - not used much)
- [FontAwesome](https://fontawesome.com/)
- [Google Fonts](https://fonts.google.com)
- ... and all their associated dependencies

## Credits / Attributions

- [Mixkit.co](from https://mixkit.co/free-sound-effects/cow/)
    - sounds for board
- [Audacity](https://www.audacityteam.org/)

## Lessons Learned / Observations

Preformed (a bit) more of a deep dive on Redux for this project.

Eventually, came out with a model-view-controller pattern after mixing state access in my redux stores - which turns out to be something of an anti-pattern.
This did make the code somewhat cleaner.

Worked out how to impliment slice reducers in reduce - which meant that I could write mutating reducers, because of the use of Immer in the background.
Not sure the added complexity was worth it for so simple a project, but the switch forced me to create a more correct MVC architecture and come up with a coherant data flow.


## Creation Notes

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

It then stripped back to a simple app, with SASS support added.

A template project can be found in ../template

## Available Scripts

- `npm init && npm install`
    - installs all dependencies and setup up project directory
- `npm start`
    - Runs the app in the development mode.
    - Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
    - The page will reload if you make edits.<br />
    - You will also see any lint errors in the console.
- `npm test` (not currently used)
    - Launches the test runner in the interactive watch mode.<br />
- `npm run build`
    - Builds the app for production to the `build` folder.<br />
    - It correctly bundles React in production mode and optimizes the build for the best performance.
    - The build is minified and the filenames include the hashes.<br />
    - Your app is ready to be deployed!
    - See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
- `npm run eject`
    - **Note: this is a one-way operation. Once you `eject`, you can’t go back!**

## Resources

- You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
- To learn React, check out the [React documentation](https://reactjs.org/).
- To learn more a about redux see [their documentation](https://redux-toolkit.js.org/usage/usage-guide).
