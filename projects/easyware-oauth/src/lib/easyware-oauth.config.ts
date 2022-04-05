import { EasywareOAuthConfig } from './easyware-oauth.interface';

export const defaultConfig: EasywareOAuthConfig = {
  redirectUri: window.location.origin + '/Login-Success',
  postLogoutRedirectUri: window.location.origin + '/Logout-Success',
  clientId: 'angular_code_client',
  scope: 'openid profile email',
  responseType: 'code',
  sessionChecksEnabled: true,
  showDebugInformation: true,
  oidc: true,
  disableAtHashCheck: true,
  logoutOnExpiration: false,
  useSilentRefresh: true,
  silentRefreshBeforeExpiration: 30,
  onSuccessRedirectTo: '/Home',
};
