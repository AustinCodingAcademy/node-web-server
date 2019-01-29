# My First Web Server

A starter repo for the ACA Advanced `My First Web Server` project.


## Part 1.
*** 1) Give your server the ability to respond to a GET request with a path "/users" and return the users array from state.js
*** 2) Give your server the ability to respond to a GET request with a path "/users/1" and return the first user object from the users array from state.js
*** 3) Give your server the ability to respond to a POST request with a path "/users" and just add a hard coded user object to the users array from state.js. .json() the last user in the array to send it back to the client. (if you do another GET request you should see this added)
* 4)  Give your server the ability to respond to a PUT request with a path "/users/1" and just change any key value on the first user object in the users array in state.js. .json() this user to send it back to the client.
* 5) Give your server the ability to respond to a DELETE request with a path "/users/1" and remove one item from the users array. send() back a messsage "deleted"


## Part 2. Body
* 6) Give your server the ability to handle a POST request with a path "/users" and add the body from the client to the users array
*** 7) Assign an _id property to the user object that is a number that increments by 1 each time.
* 8) Send the newly created user object back to the client

## Part 3. Use path variables
*** 9) Give your server the ability to respond to a GET request with a path `/users/:userId` and return the user object from the users array that has the _id == userId
* 10) Give your server the ability to respond to a PUT request with a path `/users/:userId` and just change any key value on the user object with this _id 
* 11) Give your server the ability to respond to a DELETE request with a path `/users/:userId` and find the user with this id from the array. give this user object a new key value isActive:false.  send() back a messsage "deleted"
