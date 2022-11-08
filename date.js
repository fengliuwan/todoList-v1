
// export the function as object
exports.getDate = function() {
  const today = new Date();
  // format Date
  // https://stackoverflow.com/questions/3552461/how-do-i-format-a-date-in-javascript
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  };
  // format based on locale and options
  return today.toLocaleDateString("en-US", options);
}

exports.getDay = function() {
  const today = new Date();
  // format Date
  // https://stackoverflow.com/questions/3552461/how-do-i-format-a-date-in-javascript
  const options = {
    weekday: 'long'
  };
  // format based on locale and options
  return today.toLocaleDateString("en-US", options);
}
