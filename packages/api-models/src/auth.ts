export interface AuthTokens {
  access_token: string;
}

export interface LoginWithEmailFP {
  email: string;
  password: string;
}

export interface LoginResponse {
  meta: AuthTokens;
}
