import { Observable } from 'rxjs';
import { distinct, first, pluck } from 'rxjs/operators';
import { firstNonNullValue } from 'src/util/operator/Operators';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { FireAuthService } from '../../firebase/auth/auth.service';
import { AppState } from '../app.state';
import { StateModule } from '../state.module';
import * as AuthActions from './auth.actions';
import { AuthModel } from './auth.model';
import { selectAuthenticated, selectState, selectUserData, selectUserID } from './auth.selector';

/**
 * This service is responsible for dispatching actions to the Store
 * and selecting data from the Store related to Auth
 */
@Injectable({ 'providedIn': StateModule })
export class AuthFacade {

	lastCommitted: any;

    constructor(
        protected store: Store < AppState > ,
        protected fireAuth: FireAuthService,
        protected firestore: AngularFirestore,
    ) {
        this.fireAuth.getUser$().pipe(distinct()).subscribe(async (authenticatedUser) => {
            if (authenticatedUser) {
                const userInfo = this.scrapeUserInfo(authenticatedUser);
                this.store.dispatch(new AuthActions.Authenticated(userInfo));
                this.listenToClaims(authenticatedUser);
            } else {
                this.store.dispatch(new AuthActions.NotAuthenticated());
            }
        });

    }

    public listenToClaims(user: any) {
        this.firestore
            .collection('user-claims')
            .doc(user.uid)
            .snapshotChanges().subscribe((snapshot) => {
				if(typeof (snapshot as any).data !== "function") return;

                const data = (snapshot as any).data()
                console.log('New claims doc\n', data)
                if (data._lastCommitted) {
                    if (this.lastCommitted && !data._lastCommitted.isEqual(this.lastCommitted)) {
                        // Force a refresh of the user's ID token
                        console.log('Refreshing token')
                        user.getIdToken(true)
                    }
                    this.lastCommitted = data._lastCommitted
                }
            })
    }

    /** Dispatch a LoginWithEmailAttempted action to the store */
    public login(email: string, password: string): void {
        this.store.dispatch(new AuthActions.LoginWithEmailAttempted(email, password));
    }

    /** Dispatch a LoginWithEmailAsNewAccountAttempted action to the store */
    public loginAsNewAccount(email: string, password: string, plan: any): void {
        this.store.dispatch(new AuthActions.LoginWithEmailAsNewAccountAttempted(email, password, plan));
    }

    /** Dispatch a SignUpRequested action to the store */
    public signup(email: string, password: string): void {
        this.store.dispatch(new AuthActions.SignupRequested(email, password));
    }

    /** Dispatch a PasswordResetRequested action to the store */
    public resetPassword(email: string): void {
        this.store.dispatch(new AuthActions.PasswordResetRequested(email));
    }

    /** Dispatch a LogoutRequested action to the store */
    public logout(): void {
        this.store.dispatch(new AuthActions.LogoutRequested());
    }

    /** Dispatch a LoginAsGuestRequested action to the store */
    public signInAnonymously(): void {
        this.store.dispatch(new AuthActions.LoginAsGuestRequested());
    }

    /** Dispatch a LoginWithFacebookRequested action to the store */
    public loginWithFacebook(): void {
        this.store.dispatch(new AuthActions.LoginWithFacebookRequested());
    }

    /** Dispatch a LoginWithGoogleRequested action to the store */
    public loginWithGoogle(): void {
        this.store.dispatch(new AuthActions.LoginWithGoogleRequested());
    }

    public getUserID(): Promise < string > {
        return this.selectUserData().pipe(firstNonNullValue, pluck('uid')).toPromise();
    }

    public selectUserData(): Observable < any > {
        return this.store.select(selectUserData);
    }

    public isAuthenticated(): Promise < boolean > {
        return this.selectAuthenticated().pipe(first()).toPromise();
    }

    public selectAuthenticated(): Observable < boolean > {
        return this.store.select(selectAuthenticated);
    }

    public selectState(): Observable < AuthModel > {
        return this.store.select(selectState);
    }

    public selectUserID(): Observable < string > {
        return this.store.select(selectUserID);
    }

    public magicSignIn(email, name) {
        return this.fireAuth.sendSignInLinkToEmail(email, name);
    }

    /**
     * Scrape the provided firebase.User object into a POJO matching the UserData interface.
     * @param authenticatedUser an authenticated user account
     */
    private scrapeUserInfo(authenticatedUser): any {
        const userInfo: any = {
            'displayName': authenticatedUser.displayName,
            'email': authenticatedUser.email,
            'phoneNumber': authenticatedUser.phoneNumber,
            'providerId': authenticatedUser.providerId,
            'uid': authenticatedUser.uid,
            'photoURL': authenticatedUser.photoURL,
        };
        return userInfo;
    }
}
