interface RegisterPayload {
  name: string
  email:  string
  password: string
  password_confirmation: string
}

interface LoginPayload {
  email:  string
  password: string
}

type SocialLoginType = "google" | "facebook" | "telegram"

interface ResetUserPassword {
  token: string
  email: string
  password: string
  password_confirmation: string
}

interface ForgotUserPassword {
  email: string
}
