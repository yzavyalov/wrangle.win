export interface RegisterPayload {
  name: string
  email:  string
  password: string
  password_confirmation: string
}

export interface LoginPayload {
  email:  string
  password: string
}
