
// A function which will generate a random code for Forget password Email
export const generateRandomNumber = () => {
  // Define the minimum and maximum values for the random number range
  const min = 1000000; // The minimum value (inclusive)
  const max = 9999999; // The maximum value (inclusive)

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

 // Generate a random number within the specified range using Math.random() and Math.floor() functions
  // Math.random() generates a random decimal number between 0 and 1 (exclusive)
  // We then multiply it by (max - min + 1) to get a range of random decimal numbers from 0 to (max - min)
  // Finally, we add min to the result to get a random decimal number within the range of (min) to (max - min) and then add 1 to make the range (min) to (max - min + 1)
  // Math.floor() rounds down the random decimal number to the nearest integer, giving us a random integer within the desired range
