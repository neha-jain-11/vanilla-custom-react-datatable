This package provides a capabilty to create custom datatable for the react application without using any external table libary.

Features :

1. Pagination (Fully customizable)
2. Sorting (Dyamically sorting on each column with persistence on refresh)  
3. Filtering on data (Dyamically filtering on any data with persistence on refresh)
4. Refresh functionality - Persist the last state of filters and sort using localstorage
5. It include the service to get the data for the table , which makes this package completely accessible without having any other dependency.

This package is deployed on production using Heroku account.
Url to run the application - https://neha-custom-datatable.herokuapp.com/

Steps to run in local -

1. Move to the root directory
2. npm i

It will load the dev dependency package for the application.

3. npm install > it will install the packages for both server and client

4. React applicaton is present in client folder and service is implemented in the server folder, you can install and run the application individually from the folder as well as from the root directory which is more handy.

At the root directory,
Run 'npm run start:app' - it will start server and app parallely


Note : If you want to update the data to get different ui experience, 

Follow the given steps below : 
1. cd server
2. change the data inside folder data > employee.json
      This is just an example data. For now, this package expects the data in this json form.
      Later, It will come up which will support multiple data structures from service.

P.S : The filter works with case sensitive data. 


