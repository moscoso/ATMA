import { first } from 'rxjs/operators';
import { FireAuthService } from 'src/app/core/firebase/auth/auth.service';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree
} from '@angular/router';

/**
 * A route guard that checks if the user is not authenticated before activating the route
 */
@Injectable({
    'providedIn': 'root'
})
export class NoAuthGuard implements CanActivate {
    constructor(
		private authService: FireAuthService, 
		private router: Router, 
		private toast: ToastService
	) {}
    
	async canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
	): Promise < boolean | UrlTree > {
        const user = await this.authService.getUser().pipe(first()).toPromise();
        if (user) {
            return this.router.parseUrl('/profile');
        } else {
            return true;
        }
    }
}
