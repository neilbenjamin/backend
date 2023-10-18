# Start Backend
Navigate to the directory labelled backend and type in npm install to install all the express 
dependencies. Open a browser and type in http://localhost:8080/ and you will see the welcome message.
## Start Frontend
Navigate to the directory labelled frontend and type npm install to install all the frontend 
dependencies. Then type npm start to launch react on port 3000, which will open the iTunes search app.
## Using the app
Search for something using form field and ajoining selector dropdown and add to favourites.
### Security & API Key
I installed helmet to assist with securing the app using the content security policy software which dictates
which sites and sources are valid for the app to communicate and transfer to to/from. There was no requirents from the iTunes API for Api Keys. So we 
built one using the dotenv env method which sets up a new api call to the backend upon mounting (ueseEffect), who in turn GET's the api from the .env file, and 
responds back to the client with the api key, meaning that no-one on the front end is able to find teh key in the console. Uncomment the console.log in the useEffect to see the api key logging to console to test when the server starts.
#### Test
In the terminal, type in npm test to run the unit & snapshot test concurrently.
##### Github Link
The gitHub repository can be found here: 
###### Heroku Link
The Express Backend Server can be found live on Heroku, here: https://fullstackproject-fa7dd187ee87.herokuapp.com/ and I am still trying to figure out how to get the actually application on react to load. 
