# GameHub

Welcome to GameHub, a social network built by [Michael Chen](https://github.com/metamonkey8), [Kyle McGourty](https://github.com/kylemcgourty), [Sam Richards](https://github.com/samrrichards), and [Gina Zhou](https://github.com/g1na1011) that allows you to connect with other people based on similar gaming interests!

We use React/Redux and Bootstrap to render and style content and store our information in a PostgreSQL database, which we query using Knex.js and Bookshelf.js. Auth0 ensures a secure login process, using either usernames and passwords or Google and Facebook account information. Messaging is made possible with Socket.io, which runs on our Node.js/Express server. 

## Getting Started

To get started, just open up the terminal, navigate to the root folder of our project, and enter the following commands (preferably in two different windows):

npm run devBuild
npm run dev

Once you've done all that, wait a few seconds and navigate to http://localhost:8000/. You should be able to load the app there!
