// Import required modules and load environment variables
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Function to create a JWT token
export const CreateToken = (obj, type) => {
  // Generate a JWT token with the provided payload (obj) and additional Type property (type)
  // The token is signed using the PrivateKey obtained from the environment variables
  // The token will expire after 1 day (specified by expiresIn: "1d")
  return Jwt.sign(
    {
      id: obj.id, // Payload property containing the user ID
      Type: type, // Additional property indicating the type of token (e.g., "Teacher Reset Password")
    },
    process.env.PrivateKey, // Secret key used to sign the token
    { expiresIn: "1d" } // Token expiration time
  );
};

// Middleware to authenticate and verify JWT token
export const authToken = (req, res, next) => {
  // Extract the token from the request body, headers, or cookies
  const token = req.body.token || req.headers.token || req.cookies.token;

  // Check if the token is not provided or null
  if (token === undefined || token === null) {
    // If no token is provided, send a 401 Unauthorized status with an error message
    res.status(401).send("Unauthorized: No token provided");
    return;
  } else {
    // If a token is provided, verify its validity using the PrivateKey from the environment variables
    Jwt.verify(token, process.env.PrivateKey, function (err, decoded) {
      if (err) {
        // If the token is invalid or has expired, send a 401 Unauthorized status with an error message
        res.status(401).send("Unauthorized: Invalid token");
        return;
      } else {
        if (decoded.id) {
          // If the token is valid and contains the 'id' property, continue to the next middleware or route handler
          console.log(decoded.id); // Log the decoded user ID for debugging purposes
          req.body.id = decoded.id; // Add the decoded user ID to the request body
          req.body.Type = decoded.Type; // Add the decoded token type to the request body
          next();
        } else {
          // If the token is valid but does not contain the 'id' property, send a 401 Unauthorized status with an error message
          res.status(401).send("Unauthorized: Invalid token");
        }
      }
    });
  }
};
