/**
 * Either Monad implemenation by using Left and Right
 *
 * Left is considered to be the Error path.
 * Right is considered to be the Correct path.
 */

export const Left = (x) => ({
  map: () => this,
  isEither: true,
  isLeft: true,
  isRight: false,
  fold: (f, g) => f(x),
  getOrElse: (y) => y
});

export const Right = (x) => ({
  map: (f) => new Right(f(x)),
  isEither: true,
  isLeft: false,
  isRight: true,
  fold: (f, g) => g(x),
  getOrElse: (y) => x
});
