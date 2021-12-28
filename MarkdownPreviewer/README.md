# Markdown Previewer - Project 2

[Demo](https://74c5.github.io/demos/FEDL/MarkdownPreviewer/)

Project 2 of freecodecamp.org 'Front End Developement Libraries' course. 

The project goal of the project is utilise several front end libraries (and interdependencies) to implement a clone (ish) of https://codepen.io/freeCodeCamp/full/GrZVVO.

Libraries used:
- [React](https://reactjs.org)
- [Redux](https://redux.js.org) (for global state)
- [Sass](https://sass-lang.com) (Javascript based - not used much)
- [Google Fonts](https://fonts.google.com)
- ... and all their associated dependencies

## Lessons Learned / Observations

Definitely did (a bit) more of a deep dive on React and Redux for this project.

I figured out how to use [custom hooks](https://reactjs.org/docs/hooks-custom.html) and functional components.
I prefer the functional components style to React Classes - they seem cleaner. But then I've always found javascript classes a little clunky.
Created my own hook to make my UI responsive to screen size.
I could do in pure CSS (with @media queries), but then this way provided flexibility to later allow a user to choose a preferred layout.

I ditched bootstrap and added styling using SASS on a per component basis (i.e. each component can import it's own styling).
I've yet to see how this idea scales and what interesting clashes and priority issues might arise from doing it this way though.

## Creation Notes

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

It then stripped back to a simple app, with SASS and bootstrap support added.

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
