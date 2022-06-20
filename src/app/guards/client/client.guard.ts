import { first } from 'rxjs/operators';
import { AuthFacade } from 'src/app/core/state/auth/auth.facade';
import { ClientFacade } from 'src/app/core/state/client/client.facade';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree
} from '@angular/router';

/**
 * A route guard that checks if the user is a valid Client before activating the route
 */
@Injectable({
    'providedIn': 'root'
})
export class ClientGuard implements CanActivate {
    constructor(
        private router: Router,
        private toaster: ToastService,
        private clientService: ClientFacade,
        private authService: AuthFacade,
    ) {}
    async canActivate(
        _next: ActivatedRouteSnapshot,
        _state: RouterStateSnapshot
	): Promise < boolean | UrlTree > {
        this.clientService.loadAll();
        await this.clientService.selectRequestInProgress().pipe(first(requestInProgress => requestInProgress === false)).toPromise();
        await this.authService.selectUserData().pipe(first(userData => userData != null)).toPromise();
        return this.clientService.selectClientBelongsToUser()
            .pipe(
                first(),
            ).toPromise()
            .then(async (client) => {
                if (client) {
                    return true;
                } else {
                    await this.toaster.primary('Please subscribe to continue!');
                    return this.router.parseUrl('/choose-membership');
                }
            }).catch((reason) => {
                this.toaster.failed(
                    'Client failed to load. Check your internet connection and refresh the page', reason);
                return false;
            });
    }
}
