import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import { PostLoginComponent } from './easyware-oauth.component';
import { EasywareOAuthService } from './easyware-oauth.service';

@NgModule({
  declarations: [PostLoginComponent],
  imports: [
    HttpClientModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: [
          'https://localhost:8080',
          'https://platypus.korber.com.br',
        ],
        sendAccessToken: true,
      },
    }),
  ],
  providers: [OAuthService],
  exports: [PostLoginComponent],
})
export class EasywareOAuthModule {
  static forRoot(): any {
    return {
      ngModule: EasywareOAuthModule,
      providers: [
        {
          provide: EasywareOAuthService,
        },
      ],
    };
  }
}
