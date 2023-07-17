import { Feedback } from "../Models/Feedback.model.js";

export const AddFeedback = (req, res) => {
  try {
    const { id, teacher_id, text, test_id, rating } = req.body;
    if (id && teacher_id && text && test_id) {
      const feedback = new Feedback({
        id,
        teacher_id,
        text,
        test_id,
        rating,
      });
      feedback.create((err, result) => {
        if (err) {
          res.status(401).json({
            success: false,
            message: { err },
            result: {},
          });
        } else if (result.insertId !== undefined) {
          res.send({ insertId: result.insertId }).status(200);
        } else {
          res.status(400).send({ message: "something went wrong" });
        }
      });
    } else {
      res.send({ message: "Incomplete parameters" }).status(400);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "An error occurred",
      error: error.message,
    });
  }
};

export const TeacherViewFeedback = (req, res) => {
  try {
    const { id } = req.body;
    Feedback.Teacher_View(id, (err, result) => {
      if (err) {
        throw err;
      } else {
        res.send({ result }).status(200);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "An error occurred",
      error: error.message,
    });
  }
};
