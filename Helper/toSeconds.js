// Convert a time string to seconds
export const toSeconds = (str) => {
  // Split the time string into hours, minutes, and seconds using the ":" as the separator
  const [hours, minutes, seconds] = str.split(":");

  const totalSeconds = +hours * 3600 + +minutes * 60 + +seconds;

  // Return the total number of seconds
  return totalSeconds;
};
