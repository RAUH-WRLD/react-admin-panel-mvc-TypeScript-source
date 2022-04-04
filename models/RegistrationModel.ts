import {data} from "../data/data";
export default class RegistrationModel {
    public registeredAccounts: {email: string; password: string}[] = [
        {
            email: data.login.emailLogin,
            password: data.login.passwordLogin,
        },
    ];
}
