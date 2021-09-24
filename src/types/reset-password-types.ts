type resetPasswordRequestTypes = {
  email: string
}

type confirmPasswordResetTypes = {
  password: string
  token: string
}

export type resetPasswordTypes = resetPasswordRequestTypes | confirmPasswordResetTypes