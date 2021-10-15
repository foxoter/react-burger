type TAuthFormDataKeys = 'name' | 'email' | 'password' | 'token';

type TAuthFormRecord<Value> = { [key in TAuthFormDataKeys]?: Value}

export type TAuthFormData = TAuthFormRecord<string>;