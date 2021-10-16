type TResetPasswordRequestData = {
  email: string
}

type TConfirmPasswordResetData = {
  password: string
  token: string
}

export type ResetPasswordTypes = TResetPasswordRequestData | TConfirmPasswordResetData