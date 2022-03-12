export interface Environment {
  apiKey: string,
  production: boolean,
  FbDbUrl: string
}

export interface FbAuthResponse {
  idToken: string,
  expiresIn: string
}

export interface FbCreateResponse {
  name: string
}
