# Random Quote Machine - Project 1

[Demo](https://74c5.github.io/FCC_FrontEndDevelopmentLibraries/RandomQuoteMachine/snapshot/)

Project 1 of freecodecamp.org 'Front End Developement Libraries' course. 

The project goal of the project is utilise several front end libraries (and interdependencies) to implement clone of https://codepen.io/freeCodeCamp/full/qRZeGZ.

Libraries used:
- [React](https://reactjs.org)
- [Redux](https://redux.js.org) (for global state)
- [Sass](https://sass-lang.com) (Javascript based - not used much)
- [Bootstrap](https://getbootstrap.com)
- [Bootstrap Icons](https://icons.getbootstrap.com)
- [Google Fonts](https://fonts.google.com)
- ... and all their associated dependencies

I used 'https://api.quotable.io/random?tags=technology' as a rest API for random quotes.


## Lessons Learned

Initially, tried to deploy with minimal inclusion of scripts in base html, but quickly ran into problems with adding Redux.
Thus developed the template project using 'create-react-app' as a base.

I'm not a fan of bootstrap. I can see how it's convenient to code functionality (e.g. buttons) straight into the html and there is almost no CSS/SASS. For simple sites this could be really useful. But...
- I found the layouts system non-intuitive. 
- It took just as long to look up how to do things in bootstrap as it would have don't to code in SASS or CSS in the first place.
- I had issues getting buttons inside collumns to line up - this would have been easy, if I'd just used grid or flex-box.
- Also my html looks really cluttered, making it harder to somewhat hard to figure out what is going on. It would be worse if I was altering my layout significantly for different screen sizes. It's just a mess of classes.

## Notes

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
