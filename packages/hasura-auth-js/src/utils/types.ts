import {
  AuthClient,
  AuthOptions,
  ErrorPayload,
  PasswordlessOptions,
  Provider,
  ProviderOptions,
  RedirectOption,
  SignUpOptions,
  StorageGetter,
  StorageSetter,
  User
} from '@nhost/core'
export type { AuthClient, Provider, StorageGetter, StorageSetter, User }
export interface NhostAuthConstructorParams extends AuthOptions {
  url: string
  start?: boolean
  /** @internal @deprecated @alias autoSignIn - use autoSignIn instead  */
  autoLogin?: boolean
}

// TODO remove and use NhostSession instead
export interface Session {
  accessToken: string
  accessTokenExpiresIn: number
  refreshToken: string
  user: User | null
}

// Sign Up
export interface SignUpEmailPasswordParams {
  email: string
  password: string
  options?: SignUpOptions
}

export type SignUpParams = SignUpEmailPasswordParams

export type SignUpResponse =
  | { session: null; error: ErrorPayload }
  | { session: Session | null; error: null }

// Sign In

export interface SignInResponse {
  session: Session | null
  mfa: {
    ticket: string
  } | null
  error: ErrorPayload | null
  providerUrl?: string
  provider?: string
}
export interface SignInEmailPasswordParams {
  email: string
  password: string
}

export interface SignInEmailPasswordOtpParams {
  otp: string
  ticket?: string
}

export interface SignInPasswordlessEmailParams {
  email: string
  options?: PasswordlessOptions
}

export interface SignInPasswordlessSmsParams {
  phoneNumber: string
  options?: PasswordlessOptions
}

export interface SignInPasswordlessSmsOtpParams {
  phoneNumber: string
  otp: string
}
export interface SignInWithProviderOptions {
  provider: Provider
  options?: ProviderOptions
  redirectTo?: string
}

export type SignInParams =
  | SignInEmailPasswordParams
  | SignInEmailPasswordOtpParams
  | SignInPasswordlessEmailParams
  | SignInPasswordlessSmsOtpParams
  | SignInPasswordlessSmsParams
  | SignInWithProviderOptions

export interface ResetPasswordParams {
  email: string
  options?: RedirectOption
}

export interface ChangePasswordParams {
  newPassword: string
}

export interface SendVerificationEmailParams {
  email: string
  options?: RedirectOption
}

export interface ChangeEmailParams {
  newEmail: string
  options?: RedirectOption
}

export type DeanonymizeParams =
  | ({
      signInMethod: 'email-password'
    } & SignUpParams)
  | ({
      signInMethod: 'passwordless'
      connection: 'email'
    } & SignInPasswordlessEmailParams)
  | ({
      signInMethod: 'passwordless'
      connection: 'sms'
    } & SignInPasswordlessSmsParams)

export interface SignInReponse {
  session: Session | null
  error: ErrorPayload | null
  mfa?: {
    enabled: boolean
    ticket: string
  }
  providerUrl?: string
  provider?: string
}

export type AuthChangeEvent = 'SIGNED_IN' | 'SIGNED_OUT'

export type AuthChangedFunction = (event: AuthChangeEvent, session: Session | null) => void

export type OnTokenChangedFunction = (session: Session | null) => void
export interface Headers {
  Authorization?: string
}
export interface Mfa {
  ticket: string
}

export type ApiSignUpEmailPasswordResponse =
  | { session: null; error: ErrorPayload }
  | { session: Session; error: null }

export interface ApiSignInData {
  session: Session
  mfa: Mfa | null
}
export type ApiSignInResponse =
  | {
      data: ApiSignInData
      error: null
    }
  | { data: null; error: ErrorPayload }

export type ApiRefreshTokenResponse =
  | { session: null; error: ErrorPayload }
  | { session: Session; error: null }

export interface ApiSignOutResponse {
  error: ErrorPayload | null
}

export interface ApiResetPasswordResponse {
  error: ErrorPayload | null
}

export interface ApiChangePasswordResponse {
  error: ErrorPayload | null
}

export interface ApiSendVerificationEmailResponse {
  error: ErrorPayload | null
}

export interface ApiChangeEmailResponse {
  error: ErrorPayload | null
}

export interface ApiDeanonymizeResponse {
  error: ErrorPayload | null
}
