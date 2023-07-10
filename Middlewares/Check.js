export const TeacherCheck = (req, res, next) => {
  console.log(req.body.Type);
  if (req.body.Type === "Teacher") {
    next();
    return;
  }
  res.status(403).json({
    success: false,
    message: "Access Not Allowed",
    result: {},
  });
};
export const StudentCheck = (req, res, next) => {
  if (req.body.Type === "Student") {
    console.log(req.body.Type);
    next();
    return;
  }
  res.status(403).json({
    success: false,
    message: "Access Not Allowed",
    result: {},
  });
};

export const TeacherPasswordReset = (req, res, next) => {
  if (req.body.Type === "Teacher Reset Password ") {
    console.log(req.body.Type);
    next();
    return;
  }
  res.status(403).json({
    success: false,
    message: "Access Not Allowed",
    result: {},
  });
};
export const StudentPasswordReset = (req, res, next) => {
  if (req.body.Type === "Student Reset Password ") {
    console.log(req.body.Type);
    next();
    return;
  }
  res.status(403).json({
    success: false,
    message: "Access Not Allowed",
    result: {},
  });
};
