export const isValueValid = ({ value, name }) => {
  const captionRegEx = /^[a-zA-Z_ ]*$/g;
  const amountRegEx = /^([1-9][0-9]{0,4}|100000)$/;

  return name === "caption"
    ? captionRegEx.test(value)
    : amountRegEx.test(value);
};
