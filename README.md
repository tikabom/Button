# Button
### Button's Full stack coding challenge

Basic administration dashboard built with React and Webpack through which users can:
1. view users in a namespace
2. add a new user
3. delete an existing user
4. view transfers for a user in a namespace
5. create a new transfer

All source code is contained in Button/src. The application's entry point is index.js. Button/src/views contain the Candidate, UserView and TransferView components. These display the lists of candidates, users and transfers.

Since, there is no direct endpoint to obtain the list of candidates, all users are retrieved using candidate=FULLSTACK.
These users are filtered to get unique candidates (using the Javascript Set datatype).

src/api.js handles the GET, POST and DELETE requests to the Fake Button API.

To run the application:
1. cd into the root folder (Button)
2. run npm install (you might need to install Node on your machine)
3. run npm run dev
4. type in localhost:8080 in the browser to access application root
