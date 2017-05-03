/**
 * Created by edo on 20/04/2017.
 */
export class UserToken {
    userId:string;
    password:string;
    clientAddress:string;

    constructor(userId:string,
                password:string,
                clientAddress:string) {
        this.userId = userId;
        this.password = password;
        this.clientAddress = clientAddress;
    }
}