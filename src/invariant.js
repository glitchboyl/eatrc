export default text => {
  const error =
    text === void 0 ? new Error("Something is wrong !") : new Error(text);
  throw error;
};
