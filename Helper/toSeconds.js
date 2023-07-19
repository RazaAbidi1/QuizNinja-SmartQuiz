export const toSeconds = (str) => {
  // Split the time string into hours, minutes, and seconds
  const [hours, minutes, seconds] = str.split(":");

  // Calculate the total seconds
  const totalSeconds = +hours * 3600 + +minutes * 60 + +seconds;
  return totalSeconds;
};
