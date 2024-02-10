export function formatDate(inputDate) {
  const date = new Date(inputDate);

  // Function to get the day suffix (e.g., "st", "nd", "rd", "th")
  const getDaySuffix = (day) => {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    const lastDigit = day % 10;
    switch (lastDigit) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  // Get day, month, and year
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear().toString();

  // Get the day suffix
  const daySuffix = getDaySuffix(day);

  // Format the date
  const formattedDate = `${day}${daySuffix} ${month} ${year}`;

  return formattedDate;
}
