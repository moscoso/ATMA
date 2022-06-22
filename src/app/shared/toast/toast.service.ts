import { Injectable } from '@angular/core';
import { ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
    'providedIn': 'root'
})
export class ToastService {

    constructor(private toastController: ToastController) {}

	DEFAULT_DURATION = 3000;
	DEFAULT_ERROR_DURATION = 10000;


    async dismiss(id?: string) {
        const overlay = await this.toastController.getTop();
        if (overlay) {
            this.toastController.dismiss(undefined, undefined, id);
        }
    }

    /**
     * Creates a generic toast with primary color then presents it
     * @param message the message to appear on the toast
     * @param duration how long the toast should appear for (in ms)
     */
    async primary(message: string, options: ToastOptions = undefined): Promise < void > {
		if (options?.id) {
			this.dismiss(options.id);
		}

        const toast = await this.toastController.create({
			...options,
            'message': message,
            'duration': options?.duration ?? this.DEFAULT_DURATION,
            'color': 'primary',
            'buttons': [{
                'text': 'Ok',
                'role': 'cancel'
            }],
        });
        toast.present();
    }

    /**
     * Creates a generic toast with the success color then presents it
     * @param message the message to appear on the toast
     * @param duration how long the toast should appear for (in ms)
     */
    async success(message: string, options: ToastOptions = undefined): Promise < void > {
		if (options?.id) {
			this.dismiss(options.id);
		}
        const toast = await this.toastController.create({
			...options,
            'message': message,
            'duration': options?.duration ?? this.DEFAULT_DURATION,
            'color': 'success',
            'buttons': [{
                'text': 'Ok',
                'role': 'cancel'
            }],
        });
        toast.present();
    }

    /**
     * Creates a generic failed toast with the failed color then presents it
     * @param message the message to appear on the toast
     * @param duration how long the toast should appear for (in ms)
     */
    async failed(header: string, message: string, options: ToastOptions = undefined): Promise < void > {
		if (options?.id) {
			this.dismiss(options.id);
		}
        const toast = await this.toastController.create({
			...options,
            'header': header,
            'message': message,
            'duration': options?.duration ?? this.DEFAULT_ERROR_DURATION,
            'color': 'danger',
            'buttons': [{
                'text': 'Ok',
                'role': 'cancel'
            }],
        });
        toast.present();
    }

	/**
     * Creates a toast that prompts the user for confirmation. If the user confirms a handler function will be called
	 * @param header the header to appear on the toast
	 * @param message the message to appear on the toast
	 * @param handler the function to call if the user confirms
	 * @param confirmText text for the confirmation button
	 */
    async ask(header: string, message: string, handler: () => boolean | void | Promise < boolean | void >, confirmText = "Ok" , options: ToastOptions = undefined) {
		if (options?.id) {
			this.dismiss(options.id);
		}
        const toast = await this.toastController.create({
			...options,
            'header': header,
            'message': message,
            'color': 'primary',
            'buttons': [
            {
                'text': confirmText,
                'handler': handler
            }, {
                'text': 'Cancel',
                'role': 'cancel'
            }],
        });
        toast.present();
    }
}
