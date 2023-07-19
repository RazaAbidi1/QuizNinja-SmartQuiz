import { toSeconds } from "./toSeconds.js";

export const CalculateAnswer = (testQuestions, teacher_id, id) => {
  let answers = [];
  var date = new Date();
  for (let index = 0; index < testQuestions.length; index++) {
    answers.push({
      question_id: testQuestions[index].question_id,
      selected_answer: null,
      correct_answer: null,
      student__id: id,
      teacher__id: teacher_id,
      start_time: date,
      end_time: toSeconds(testQuestions[index].question_time),
    });
    date = new Date() + testQuestions[index].question_time + 3;
  }
  return answers;
};
