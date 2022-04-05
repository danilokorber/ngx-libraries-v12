import { AuthConfig } from 'angular-oauth2-oidc';

export interface EasywareOAuthConfig extends AuthConfig {
  logoutOnExpiration?: boolean;
  silentRefreshBeforeExpiration?: number;
  onSuccessRedirectTo?: string;
  onDeniedRedirectTo?: string;
  onLogoutRedirectTo?: string;
}

export interface EasywareOAuthClaims {
  exp?: number;
  iat?: number;
  auth_time?: number;
  jti?: string;
  iss?: string;
  aud?: string;
  sub?: string;
  typ?: string;
  azp?: string;
  nonce?: string;
  session_state?: string;
  acr?: string;
  email_verified?: boolean;
  name?: string;
  groups?: string[];
  preferred_username?: string;
  given_name?: string;
  locale?: string;
  family_name?: string;
  email?: string;
  picture?: string;
  birthdate?: Date;
  phone_number?: string;
  address?: {
    street_address?: string;
    locality?: string;
    region?: string;
    postal_code?: string;
    country?: string;
  };
}
