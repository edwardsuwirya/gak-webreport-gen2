export class CommonResponse {
    responseCode:string;
    responseDescription:string;

    constructor(responseCode:string, responseDescription) {
        this.responseCode = responseCode;
        this.responseDescription = responseDescription;
    }
}
