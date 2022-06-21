import { Directive, ElementRef } from '@angular/core';

import VanillaTilt from 'vanilla-tilt';

@Directive({
    selector: '[tilt]'
})
export class TiltDirective {
    constructor(private el: ElementRef) {
        VanillaTilt.init(el.nativeElement, {
            max: 25,
			reverse: true,
			"full-page-listening": true,
            speed: 400,
        });
    }
}
