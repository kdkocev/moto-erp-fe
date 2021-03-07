export const setErrorsIfAny = (setErrors, either) => {
  if (either && either.isEither) {
    either.fold(setErrors, () => {});
  }
};
