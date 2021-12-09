# 25 and 5 timer - Project 5

[Demo](https://74c5.github.io/FCC_FrontEndDevelopmentLibraries/TwentyFiveAndFiveTimer/snapshot/)

Project 5 of freecodecamp.org 'Front End Developement Libraries' course. 

The project goal of the project is utilise several front end libraries (and interdependencies) to implement a clone (ish) of https://codepen.io/freeCodeCamp/full/wgGVVX.

This time around we're going to have a bit of a play with [Next.js](https://nextjs.org/)

Libraries used:
- [Next.js](https://nextjs.org)
    - with [React](https://reactjs.org) included
- [Redux](https://redux.js.org) (for global state)
- ... and all their associated dependencies

## Credits / Attributions

Fonts:
- [DA FONT](https://www.dafont.com/faq.php)
    - Alarm Clock by David J Patterson
    - Conthrax by Typodermic Fonts
- [Mixkit](https://mixkit.co/) for audio clips, search
    - alarm tone
    - repeating arcade beep
 

## Lessons Learned / Observations

There was a fair bit of jiggery pokery to get next.js and redux to play nicely. I don't really need an accurate rendering on the server side.

There are some design decisions that I would not take, if the rubrik did not force me to. E.g. hiding the settings modal offscreen when not shown (react allows you to just return 'null' instead).

## Creation Notes

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

It was then stripped back to a simple app, .

Manual setting of path in `next.config.js` is for html export deployment to github pages. Remove these options for Vercel deployment.

## Available Scripts

- `npm init && npm install`
    - installs all dependencies and setup up project directory
- `npm run dev`
    - Runs the app in the development mode.
    - Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
    - The page will reload if you make edits.<br />
    - You will also see any lint errors in the console.
- `npm build`
    - Builds the static app for production to the `out` folder. Using `next build` and `next export`
    - It correctly bundles React in production mode and optimizes the build for the best performance.
    - The build is minified and the filenames include the hashes.<br />
    - Your app is ready to be deployed!
- `npm start`
    - starts a server, for testing the static production build.
- Installing vercel server - `npm i -g serve` - allows serving of exported site locally using `serve out`.
     

## Resources/Ackknowledgements

- To learn more about nextjs, see [Next.js documentation](https://nextjs.org/docs/getting-started).
- To learn more about React, check out the [React documentation](https://reactjs.org/).
- To learn more a about redux see [their documentation](https://redux-toolkit.js.org/usage/usage-guide).

#### Modal dialog is hacked from
- https://www.netlify.com/blog/2020/12/17/react-children-the-misunderstood-prop/
- https://daveceddia.com/open-modal-in-react/



## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
