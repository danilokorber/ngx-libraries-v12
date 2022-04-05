import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { BehaviorSubject, Observable } from 'rxjs';
import { defaultConfig } from './easyware-oauth.config';
import {
  EasywareOAuthClaims,
  EasywareOAuthConfig,
} from './easyware-oauth.interface';

@Injectable({
  providedIn: 'root',
})
export class EasywareOAuthService {
  private authSubject = new BehaviorSubject<boolean>(false);
  private _currentConfig: EasywareOAuthConfig = defaultConfig;

  public get currentConfig(): EasywareOAuthConfig {
    return this._currentConfig;
  }

  constructor(private oauthService: OAuthService) {}

  init(customConfig?: EasywareOAuthConfig): void {
    this._currentConfig = {
      ...defaultConfig,
      ...customConfig,
    };

    this.oauthService.configure(this.currentConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
    this.updateObservable();
  }

  private updateObservable(): void {
    setInterval(() => {
      let isTokenValid: boolean =
        this.oauthService.hasValidAccessToken() ||
        this.oauthService.hasValidIdToken() ||
        false;

      if (!isTokenValid && this.currentConfig.logoutOnExpiration) {
        this.logout();
      }

      if (
        isTokenValid &&
        this.currentConfig.useSilentRefresh &&
        this.expiresInSeconds() <
          (this.currentConfig.silentRefreshBeforeExpiration || 15)
      ) {
        this.oauthService.refreshToken().catch(() => this.logout());
      }

      this.authSubject.next(isTokenValid);
    }, 1000);
  }

  login(params?: any): void {
    this.oauthService.initCodeFlow(undefined, params);
  }

  isAuthenticated(): Observable<boolean> {
    return this.authSubject.asObservable();
  }

  logout(): void {
    sessionStorage.clear();
    this.authSubject.next(false);
    this.oauthService.revokeTokenAndLogout();
  }

  getIdentityClaims(): EasywareOAuthClaims {
    return <EasywareOAuthClaims>this.oauthService.getIdentityClaims();
  }

  getToken(): string {
    return this.oauthService.getAccessToken();
  }

  hasValidToken(): boolean {
    return (
      this.oauthService.hasValidAccessToken() ||
      this.oauthService.hasValidIdToken()
    );
  }

  tokenExpiresOn(): Date {
    return new Date(
      this.oauthService.getAccessTokenExpiration() ||
        this.oauthService.getIdTokenExpiration()
    );
  }

  private expiresInSeconds(): number {
    var t1 = this.tokenExpiresOn();
    var t2 = new Date();
    var dif = t1.getTime() - t2.getTime();

    var Seconds_from_T1_to_T2 = dif / 1000;
    var Seconds_Between_Dates = Math.floor(Seconds_from_T1_to_T2);
    return Seconds_Between_Dates;
  }
}
