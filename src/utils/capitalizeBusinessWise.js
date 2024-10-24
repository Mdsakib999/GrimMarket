export const capitalizeBusinessWise = (str) => {
  if (str.split("").slice(0, 2).includes("-")) {
    return str
      .split("-") // Split the string by hyphen
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter, lowercase rest
      .join("-"); // Join the words with a space
  }

  return str
    .split("-") // Split the string by hyphen
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter, lowercase rest
    .join(" "); // Join the words with a space
};
