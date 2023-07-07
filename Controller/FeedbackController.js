import { Feedback } from "../Models/Feedback.model.js";

export const AddFeedback = (req, res) => {
  const { id, teacher_idd, text } = req.body;
  if (id || teacher_idd || text) {
    const feedback = new Feedback({
      id,
      teacher_idd,
      text,
    });
    feedback.create((err, result) => {
      console.log(result.insertId);
      if (err) {
        res.status(401).json({
          success: false,
          message: { err },
          result: {},
        });
      } else if (result.insertId) {
        res.send({ insertId: result.insertId }).status(200);
      } else res.send({ message: "something went wrong" }).status(400);
    });
  } else {
    res.send({ message: "Incomplete parameters" }).status(400);
  }
};
export const TeacherViewFeedback = (req, res) => {
  const { id } = req.body;
  Feedback.Teacher_View(id, (err, result) => {
    if (err) res.send({ err }).status(403);
    else res.send({ result }).status(200);
  });
};
export const StudentViewFeedback = (req, res) => {
  const { id } = req.body;
  Feedback.Student_View(id, (err, result) => {
    if (err) res.send({ err }).status(403);
    else res.send({ result }).status(200);
  });
};
