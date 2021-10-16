export type TNewUserData = {
  email: string;
  name: string;
}

type TUserRegisterData = {
  email: string
  password: string
  name: string
}

type TUserAuthData = {
  email: string
  password: string
}

export type UserDataTypes = TUserRegisterData | TUserAuthData