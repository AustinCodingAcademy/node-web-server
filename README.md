# My First Web Server

A starter repo for the ACA 311 `My First Node Web Server` project.
As you do each part, you can remove the code from the previous part or do each part in different files.
This is not for a grade.


## Part 1.
* Give your server the ability to respond to a GET request with a path "/users" and return the users array from state.js
* Give your server the ability to respond to a GET request with a path "/users/1" and return the first user object from the users array from state.js
* Give your server the ability to respond to a POST request with a path "/users" and just add a hard coded user object to the users array from state.js. .json() the last user in the array to send it back to the client. (if you do another GET request you should see this added)
* Give your server the ability to respond to a PUT request with a path "/users/1" and just change any key value on the first user object in the users array in state.js. .json() this user to send it back to the client.
* Give your server the ability to respond to a DELETE request with a path "/users/1" and remove one item from the users array. send() back a messsage "deleted"


## Part 2. Body
* Give your server the ability to handle a POST request with a path "/users" and add the body from the client to the users array
* Assign an id property to the user object that is a number that increments by 1 each time.
* Send the newly created user object back to the client

## Part 3. Use more flexible code - Use split to get the id from the path 
* Give your server the ability to respond to a GET request with a path `/users/:userId` and return the user object from the users array that has the _id == userId.
* Give your server the ability to respond to a PUT request with a path `/users/:userId` and just change any key value on the user object with this _id. 
* Give your server the ability to respond to a DELETE request with a path `/users/:userId` and find the user with this id from the array. give this user object a new key value isActive:false.  send() back a messsage "deleted"
 
 
 ## Part 4. Do the same thing for products
