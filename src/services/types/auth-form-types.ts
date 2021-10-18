export type TResetPasswordRequestData = {
  email: string
}

export type TConfirmPasswordResetData = {
  password: string;
  token: string;
}

export type TNewUserData = {
  email: string;
  name: string;
}

export type TUserRegisterData = {
  email: string
  password: string
  name: string
}

export type TUserAuthData = {
  email: string
  password: string
}

export type TAuthFormData =
  TResetPasswordRequestData
  | TConfirmPasswordResetData
  | TNewUserData
  | TUserRegisterData
  | TUserAuthData

