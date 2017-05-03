export class User {
    s_userName:string;
    s_userPassword:string;
    d_currentDate: Date;

    s_userLocked:string;
    s_userGender:string;
    d_userBirthDate:Date;
    i_userCreateID:number;
    d_userCreateDate:Date;
    i_userDeleteID:number;
    d_userDeleteDate:Date;
    i_userUpdateID:number;
    d_userUpdateDate:Date;
    s_userActive:string;
    i_userLevelID:number;
    s_userLevelName:string;
    s_countryCode:string;
    s_countryName:string;

    constructor(s_userName:string,
                s_userPassword:string,d_currentDate:Date,
                s_userLocked?:string, s_userGender?:string, d_userBirthDate?:Date, i_userCreateID?:number,
                d_userCreateDate?:Date, i_userDeleteID?:number, d_userDeleteDate?:Date, i_userUpdateID?:number, d_userUpdateDate?:Date,
                s_userActive?:string, i_userLevelID?:number, s_userLevelName?:string, s_countryCode?:string, s_countryName?:string) {
        this.s_userName = s_userName;
        this.s_userPassword = s_userPassword;
        this.d_currentDate = d_currentDate;
        this.s_userLocked = s_userLocked;
        this.s_userGender = s_userGender;
        this.d_userBirthDate = d_userBirthDate;
        this.i_userCreateID = i_userCreateID;
        this.d_userCreateDate = d_userCreateDate;
        this.i_userDeleteID = i_userDeleteID;
        this.d_userDeleteDate = d_userDeleteDate;
        this.i_userUpdateID = i_userUpdateID;
        this.d_userUpdateDate = d_userUpdateDate;
        this.s_userActive = s_userActive;
        this.i_userLevelID = i_userLevelID;
        this.s_userLevelName = s_userLevelName;
        this.s_countryCode = s_countryCode;
        this.s_countryName = s_countryName;
    }
}
