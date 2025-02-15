export class DialogData {
    title: string;
    message: string;
    closeButtonName: string;
    titleIcon: string = '';

    constructor(title: string,
        message: string,
        closeButtonName: string,
        titleIcon: string
    ) {
        this.title = title;
        this.message = message;
        this.closeButtonName = closeButtonName
        this.titleIcon = titleIcon
    }
}