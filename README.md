# Steps to setup the project and install dependencies
## 1.Clone the project and go to terminal
## 2.Type **"npm install"**
## 3. After it installs dependencies, create an .env file in the same directory
## 4. Paste the following content
       MONGODB_URI=mongodb+srv://shivamsingh226:<mypassword>@piepayassignment.fqqw1zb.mongodb.net/
       PORT=5000
## 5. Now, type:
      npx nodemon index.js


# Assumptions made for the project
## I am fetching the largest discount which I can fetch for a given price. I am not trying to calculate here or do the maths for what the final price would be. I just fetch the largest discount which is available. 
## Also, to keep my project simple. I am copying the response from the flipkart API and pasting it on the Postman for the POST request. I will work further to automate this process further.

# Design Choices
## I chose Node.js backend service for because it is simpler, handle Promises well, do the asynchronous processes easily and we can integrate it with frontend services like ReactJS, ElectronJS seamlessly. 
## With MongoDB as a backend service, it handles JSON Data very well as it stores data in Binary JSON. For Horizontal Scaling, MongoDB is considered an ideal choice instead of PostgreSQL. And, the offers which usually come on E-commerce platforms are quite varied, so it gives us flexibility to evolve our schemas.
## As MongoDB supports sharding, voluminous writes can be handled very efficiently and nested data can be retrieved in no time.

# To handle efficiently the GET /highest-discount route
### We can use load-balancer like nginx which will distribute loads across many servers to stop a server from getting overwhelmed. We can use NGINX-> Any load balancer to streamline proper authentication and authorization. As we know, nginx is better suited to serve static content, API-level logic and business concerns can be handled with API Gateway.
### Using Redis can be a good option too for caching as user will regularly fetch which is a better discount so it could save the server being bombarded with too many requests.

# If I had more time to complete the project
### I would be building a backend service which would automatically fetches the data from the flipkart API and self-authorizes itself to hit the both the routes. Also, I would try to build a low-weight extension from which users can benefit.
