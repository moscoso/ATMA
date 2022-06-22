import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
    'providedIn': 'root'
})
export class ToastService {

    constructor(private toastController: ToastController) {}


    async dismiss() {
        const overlay = await this.toastController.getTop();
        if (overlay) {
            this.toastController.dismiss();
        }
    }

    /**
     * Creates a generic toast with primary color then presents it
     * @param message the message to appear on the toast
     * @param duration how long the toast should appear for (in ms)
     */
    async primary(message: string, duration = 3000): Promise < void > {
        const toast = await this.toastController.create({
            'message': message,
            'duration': duration,
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
    async success(message: string, duration = 3000): Promise < void > {
        const toast = await this.toastController.create({
            'message': message,
            'duration': duration,
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
    async failed(header: string, message: string, duration = 10000): Promise < void > {
        const toast = await this.toastController.create({
            'header': header,
            'message': message,
            'duration': duration,
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
    async ask(header: string, message: string, handler: () => boolean | void | Promise < boolean | void >, confirmText = "Ok" ) {
        const toast = await this.toastController.create({
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
