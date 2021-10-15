export type TNewUser = {
  email: string;
  name: string;
}

type UserRegisterTypes = {
  email: string
  password: string
  name: string
}

type UserAuthTypes = {
  email: string
  name?: string
  password: string
}

export type UserDataTypes = UserRegisterTypes | UserAuthTypes