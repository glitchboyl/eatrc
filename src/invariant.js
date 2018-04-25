export default message => {
  const error =
    message === void 0 ? new Error("Something is wrong!") : new Error(message);
  throw error;
};
