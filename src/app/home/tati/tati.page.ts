import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-tati.page',
    templateUrl: './tati.page.html',
    styleUrls: ['./tati.page.scss']
})
export class TatiPage {

    playlist = [
    {
        'name': `Te Aho Nui - 5 Minute Ote'a Warm Up (Fall '21).mp3`,
        'link': `https://firebasestorage.googleapis.com/v0/b/atma-church.appspot.com/o/Te%20Aho%20Nui%20-%205%20Minute%20Ote'a%20Warm%20Up%20(Fall%20'21).mp3?alt=media&token=a65a7f1c-3894-4ab5-9025-39b968366a4e`,
    },
    {
        'name': `Te Aho Nui - O 'Urataetae Iti E - Mevina Liufau.mp3`,
        'link': `https://firebasestorage.googleapis.com/v0/b/atma-church.appspot.com/o/Te%20Aho%20Nui%20-%20O%20'Urataetae%20Iti%20E%20-%20Mevina%20Liufau.mp3?alt=media&token=13c04924-8c22-4ea0-ba1a-10f644a8d712`,
    },
    {
        'name': `Te Aho Nui - Ote'a Hi'irere - Warm Up Combo (Fall '21).mp3`,
        'link': `https://firebasestorage.googleapis.com/v0/b/atma-church.appspot.com/o/Te%20Aho%20Nui%20-%20Ote'a%20Hi'irere%20-%20Warm%20Up%20Combo%20(Fall%20'21).mp3?alt=media&token=06834bb4-956b-4a11-b09f-78396ca3ec4e`,
    },
    {
        'name': `Te Aho Nui - Pehe a Hine - O Tahiti E (Fall '21).mp3`,
        'link': `https://firebasestorage.googleapis.com/v0/b/atma-church.appspot.com/o/Te%20Aho%20Nui%20-%20Pehe%20a%20Hine%20-%20O%20Tahiti%20E%20(Fall%20'21).mp3?alt=media&token=a0b9dea2-5612-49dc-964b-c2cff160cb14`,
    },
    {
        'name': `Te Aho Nui - Samba - Tahitian Beat.mp3`,
        'link': `https://firebasestorage.googleapis.com/v0/b/atma-church.appspot.com/o/Te%20Aho%20Nui%20-%20Samba%20-%20Tahitian%20Beat.mp3?alt=media&token=82b2654e-7a43-49e9-a54f-7281a320b24a`,
    },
    {
        'name': `Te Aho Nui - Shark Ote'a.mp3`,
        'link': `https://firebasestorage.googleapis.com/v0/b/atma-church.appspot.com/o/Te%20Aho%20Nui%20-%20Shark%20Ote'a.mp3?alt=media&token=ad5439fe-b89c-4577-be24-ad31f3095293`,
    },
    {
        'name': `Te Aho Nui - Ta'aroa Ote'a.mp3`,
        'link': `https://firebasestorage.googleapis.com/v0/b/atma-church.appspot.com/o/Te%20Aho%20Nui%20-%20Ta'aroa%20Ote'a.mp3?alt=media&token=964fbda0-1ca3-44ab-ba6c-4134aa2c2674`,
    },
    {
        'name': `Te Aho Nui - Warm Up Ote'a Spring '22.mp3`,
        'link': `https://firebasestorage.googleapis.com/v0/b/atma-church.appspot.com/o/Te%20Aho%20Nui%20-%20Warm%20Up%20Ote'a%20Spring%20'22.mp3?alt=media&token=a781c256-e96c-45ae-b97f-d7a9dcc3ba4b`,
    },
    {
        'name': `Te Aho Nui - Warm Up Ote'a Winter '22.mp3`,
        'link': `https://firebasestorage.googleapis.com/v0/b/atma-church.appspot.com/o/Te%20Aho%20Nui%20-%20Warm%20Up%20Ote'a%20Winter%20'22.mp3?alt=media&token=2b67b1ff-c668-4037-b40c-9d2d206801b9`,
    }, ]

    constructor(private router: Router) {}

    goToHome() {
        this.router.navigateByUrl('/')
    }

}
