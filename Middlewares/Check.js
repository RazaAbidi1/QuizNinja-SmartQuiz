// Middleware to check if the user is a teacher
export const TeacherCheck = (req, res, next) => {
  console.log(req.body.Type); // Log the Type property from the request body to the console for debugging purposes
  if (req.body.Type === "Teacher") {
    // If the Type property is "Teacher", continue to the next middleware or route handler
    next();
    return;
  }
  // If the Type property is not "Teacher", send a 403 Forbidden status and an error response
  res.status(403).json({
    success: false,
    message: "Access Not Allowed",
    result: {},
  });
};

// Middleware to check if the user is a student
export const StudentCheck = (req, res, next) => {
  if (req.body.Type === "Student") {
    // If the Type property is "Student", continue to the next middleware or route handler
    console.log(req.body.Type); // Log the Type property from the request body to the console for debugging purposes
    next();
    return;
  }
  // If the Type property is not "Student", send a 403 Forbidden status and an error response
  res.status(403).json({
    success: false,
    message: "Access Not Allowed",
    result: {},
  });
};

// Middleware to check if the user is performing a teacher password reset
export const TeacherPasswordReset = (req, res, next) => {
  if (req.body.Type === "Teacher Reset Password ") {
    // If the Type property is "Teacher Reset Password", continue to the next middleware or route handler
    console.log(req.body.Type); // Log the Type property from the request body to the console for debugging purposes
    next();
    return;
  }
  // If the Type property is not "Teacher Reset Password", send a 403 Forbidden status and an error response
  res.status(403).json({
    success: false,
    message: "Access Not Allowed",
    result: {},
  });
};

// Middleware to check if the user is performing a student password reset
export const StudentPasswordReset = (req, res, next) => {
  if (req.body.Type === "Student Reset Password ") {
    // If the Type property is "Student Reset Password", continue to the next middleware or route handler
    console.log(req.body.Type); // Log the Type property from the request body to the console for debugging purposes
    next();
    return;
  }
  // If the Type property is not "Student Reset Password", send a 403 Forbidden status and an error response
  res.status(403).json({
    success: false,
    message: "Access Not Allowed",
    result: {},
  });
};

// Middleware to check if the user is starting a test
export const startTest = (req, res, next) => {
  if (req.body.Type === "Start Test") {
    // If the Type property is "Start Test", continue to the next middleware or route handler
    console.log(req.body.Type); // Log the Type property from the request body to the console for debugging purposes
    next();
    return;
  }
  // If the Type property is not "Start Test", send a 403 Forbidden status and an error response
  res.status(403).json({
    success: false,
    message: "Access Not Allowed",
    result: {},
  });
};
