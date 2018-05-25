export default message => {
  const error =
    message === void 0 ? new Error("something is wrong!") : new Error(message);
  throw error;
};
