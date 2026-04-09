const formatDate = (date) => {
  const formatedDate = new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  return formatedDate
};
export default formatDate;
