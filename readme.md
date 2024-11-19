User Authentication Routes done

->POST /user/signup: Sign up a new User Authentication Routes done

->POST /user/signup: Sign up a new user. 
->POST /user/login: Log in a user and return a JWT.

User Movie Routes

->POST /user/movies: Create a new movie (requires JWT).
->GET /user/movies: Retrieve all movies posted by the authenticated user.
->PUT /user/movies/:id: Update a specific movie (requires JWT).
->DELETE /user/movies/:id: Delete a specific movie (requires JWT).

Global Movie Routes done

->GET /movies/all: Retrieve all movies posted by all users.
->GET /movies/user/:id: Retrieve all movies posted by a specific user.

Like Routes

->POST /user/movies/:id/like: Like a specific movie (requires JWT).
->DELETE /user/movies/:id/like: Unlike a specific movie (requires JWT).
->GET /user/likes: Retrieve all movies liked by the authenticated user.
