import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivateChild {


    constructor(private accountService: AccountService, private router: Router) {}

    canActivateChild(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> {
      const expectedRole = route.data.expectedRole;
      const userRole = this.accountService.getRoles();

      return this.accountService.currentUser$.pipe(
        map(auth => {
          if (userRole) {
            if (expectedRole && userRole !== expectedRole) {
              this.router.navigate(['/']);
              return false;
            } else {
              return true;
            }
          } else {
            this.router.navigate(['/account/login'], {queryParams: {returnUrl: state.url}})
            return false;
          }
      })
    );
  }
}
