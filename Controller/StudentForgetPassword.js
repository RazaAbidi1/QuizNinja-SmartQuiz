// Importing required modules
import { CreateToken } from "../Middlewares/auth.js";
import { Student } from "../Models/Student.model.js";
import { generateRandomNumber } from "../Helper/CodeGeneration.js";
import { SendEmail } from "../Helper/SendEamail.js";

// Function to verify the student's email and send a verification code
export const Verify_Email_Student = async (req, res) => {
  try {
    const { email } = req.body;
    if (email) {
      // Check if the email exists in the Student model
      Student.findByEmail(email, (err, result1) => {
        if (err) throw err; // Throw an error if there's a database error
        else {
          if (result1.Found === true) {
            // Generate a random verification code and send it to the student's email
            const code = generateRandomNumber();
            const Text = `The Code to reset your Password is :\n\ ${code}`;
            SendEmail(email, "Re-set Password", Text, (err, info) => {
              
              if (err) throw err;  // Handle email sending error if any
              else {
                // If the email is sent successfully, update the student's default password with the generated code
                Student.setDefaultPasswordStudent(
                  email,
                  { student_default_password: code },
                  (err, result) => {
                    if (err) {
                      res.send({ err }).status(401); // Unauthorized response
                      return;
                    } else {
                      if (result.insertId) {
                        res.send({ insertId: result.insertId }).status(200);  // If the default password is updated successfully, send the response with status code 200
                        return;
                      }
                    }
                  }
                );
              }
            });
          } else {
            res.status(400).send({ err: "Incorrect Email" }); // If the email doesn't exist in the database, send an error response with status code 400  (an error caused by an invalid request)
          }
        }
      });
    } else {
      res.send({ err: "Email Required" }).status(400); // If the email is missing, send an error response with status code 400 ( an error caused by an invalid request)
    }
  } catch (error) {
    console.log(error); // Log any unexpected errors from server
    res.status(500).json({
      success: false,
      message: "An error occurred",
      error: error.message,
    }); // Send a generic error response with status code 500
  }
};

// Function to authenticate the student using the verification code
export const AuthUser_Student = async (req, res) => {
  try {
    const { code, email } = req.body;
    if (code) {
      // Find the default password for the given email in the Student model
      Student.findDefaultPasswordStudent(email, (err, result) => {
        if (err) {
          res.send({ err }).status(403); // If there's an error, send an error response with status code 403 (Forbidden error: the server understands the request but can't provide additional access)
        } else {
          if (result.Found && result[0].student_default_password) {
            if (result[0].student_default_password === code) {
              // If the verification code matches the default password, create a token and send the response with status code 200
              const token = CreateToken({ id: email }, "Student Reset Password ");
              res.send({ response: "Correct Code", token: token }).status(200);
            } else {
              res.send({ err: "Wrong Code Entered" }).status(400); // If the verification code is incorrect, send an error response with status code 400 (an error caused by an invalid request)
            }
          } else {
            res
              .send({ err: "Email Not Found Or Reset Is Not Required" })
              .status(400); // If the email is not found or reset is not required, send an error response with status code 400 (an error caused by an invalid request)
          }
        }
      });
    } else {
      res.send({ err: "Code Required" }).status(400); // If the verification code is missing, send an error response with status code 400 (an error caused by an invalid request)
    }
  } catch (error) {
    console.log(error); // Log any unexpected errors from server
    res.status(500).json({
      success: false,
      message: "An error occurred",
      error: error.message,
    }); // Send a generic error response with status code 500
  }
};

// Function to reset the student's password
export const Reset_Password_Student = async (req, res) => {
  try {
    const { id, password } = req.body;
    // Update the student's password using the Student model
    Student.updateByEmail(id, { student_password: password }, (err, result) => {
      if (err) res.send({ err }).status(400); // If there's an error, send an error response with status code 400 (an error caused by an invalid request)
      else {
        // After resetting the password, set the default password to null in the Student model
        Student.setDefaultPasswordStudent(
          id,
          { student_default_password: null },
          (err, info) => {
            if (err) res.send({ err }).status(400); // If there's an error, send an error response with status code 400 (an error caused by an invalid request)
            else {
              // If password reset is successful, send the response with status code 200 (OK)
              res
                .send({ msg: "Password re-set has been done. Now Login" })
                .status(200);
            }
          }
        );
      }
    });
  } catch (error) {
    console.log(error); // Log any unexpected errors from server
    res.status(500).json({
      success: false,
      message: "An error occurred",
      error: error.message,
    }); // Send a generic error response with status code 500
  }
};
