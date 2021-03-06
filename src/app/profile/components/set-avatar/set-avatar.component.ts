import { Component, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { RouterStoreDispatcher } from 'src/app/core/state/router/router.dispatcher';
import { ProfileFacade } from 'src/app/core/state/profile/profile.facade';
import { Profile } from 'src/app/core/state/profile/profile.model';
import { ImageInputComponent } from 'src/app/storage/image-input/image-input.component';

@Component({
    'selector': 'set-avatar',
    'templateUrl': './set-avatar.component.html',
    'styleUrls': ['./set-avatar.component.scss'],
})
export class SetAvatarComponent implements OnInit {

    photoURL: string;
    profile: Profile;

    @ViewChild(ImageInputComponent) input: ImageInputComponent;

    constructor(
        public routerService: RouterStoreDispatcher,
        public profileService: ProfileFacade,
    ) {}

    ngOnInit(): void {
        this.initAvatar();
    }

    async initAvatar() {
        const router = await this.routerService.selectState().pipe(first()).toPromise();
        const routeID = router.state.params.id;
        let profile: Profile;
        if (routeID) {
            profile = await this.profileService.selectProfile(routeID).pipe(first(p => p != null)).toPromise();
        } else {
            profile = await this.profileService.selectUserAsProfile().pipe(first(p => p != null)).toPromise();
        }
        this.profile = profile;
        this.photoURL = profile.photoURL;
    }


    getAvatar(): string {
        return this.profileService.getInitialsAvatar(this.profile);
    }

    changeAvatar() {
        this.profileService.update(this.profile.id, {'photoURL': this.photoURL});
    }

    onFileUploaded(event: any) {
        this.photoURL = event;
    }

    clearInput() {
        this.photoURL = null;
        this.input.clear();
    }
}
