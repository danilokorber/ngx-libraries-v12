import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { EasywareOAuthService } from './easyware-oauth.service';

@Injectable({
  providedIn: 'root',
})
export class EasywareOAuthGuard implements CanActivate {
  constructor(public wenService: EasywareOAuthService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let res: boolean = this.wenService.hasValidToken();
    if (!res) this.router.navigate([route.data.ifDeniedRedirectTo || '/']);
    return res;
  }
}
