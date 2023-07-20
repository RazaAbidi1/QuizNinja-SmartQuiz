// Import the toSeconds function from the toSeconds.js file
import { toSeconds } from "./toSeconds.js";

// Calculate student answers for a test
export const CalculateAnswer = (testQuestions, teacher_id, id) => {
  // Initialize an array to store the answers
  let answers = [];
  
  // Get the current date and time
  var date = new Date();

  // Loop through each test question and create an answer object for each question
  for (let index = 0; index < testQuestions.length; index++) {
    // Create an answer object with the following properties:
    answers.push({
      question_id: testQuestions[index].question_id, // The ID of the question
      selected_answer: null, // The selected answer by the student (initialized to null)
      correct_answer: null, // The correct answer for the question (initialized to null)
      student__id: id, // The ID of the student attempting the test
      teacher__id: teacher_id, // The ID of the teacher who created the test
      start_time: date, // The start time of the question attempt (current date and time)
      end_time: toSeconds(testQuestions[index].question_time), // The end time of the question attempt, converted to seconds using the toSeconds function
    });

    // Update the date to the end time of the current question attempt plus 3 seconds (to account for any delay between questions)
    date = new Date() + testQuestions[index].question_time + 3;
  }

  // Return the array of answers
  return answers;
};
