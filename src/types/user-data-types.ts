type UserResetPasswordTypes = {
  email: string
}

type UserRegisterTypes = {
  email: string
  password: string
  name: string
}

type UserAuthTypes = {
  email: string
  password: string
}

export type UserDataTypes = UserResetPasswordTypes | UserRegisterTypes | UserAuthTypes