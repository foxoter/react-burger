type TAuthFormDataKeys = 'name' | 'email' | 'password' | 'token';

export type TAuthFormData = {
  [key in TAuthFormDataKeys]?: string
}