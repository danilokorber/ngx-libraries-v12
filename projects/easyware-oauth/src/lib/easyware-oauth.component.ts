import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EasywareOAuthService } from './easyware-oauth.service';

@Component({
  selector: 'post-login',
  template: '',
  styleUrls: [],
})
export class PostLoginComponent implements OnInit {
  isAuthenticated: Subscription | undefined;

  constructor(private wenService: EasywareOAuthService, private router: Router) {}

  ngOnInit(): void {
    let r = this.router;
    let w = this.wenService;
    this.isAuthenticated = this.wenService.isAuthenticated().subscribe({
      next(hasValidToken) {
        if (hasValidToken) r.navigate([w.currentConfig.onSuccessRedirectTo]);
      },
    });
  }

  ngOnDestroy(): void {
    this.isAuthenticated?.unsubscribe();
  }
}
