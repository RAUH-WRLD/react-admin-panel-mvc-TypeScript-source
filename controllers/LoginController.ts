import {AController} from "@eagerlogic/react-mvc";
import LoginModel from "../models/LoginModel";
interface Account {
    email: string;
    password: string;
}
export default class LoginController extends AController<LoginModel> {
    public documentTitleChange(title: string) {
        return (document.title = title);
    }
    public processForm(email: React.RefObject<HTMLInputElement>, password: React.RefObject<HTMLInputElement>, login: React.RefObject<HTMLButtonElement>) {
        const emailElement = email.current;
        const passwordElement = password.current;
        const loginButtonElement = login.current;
        if (emailElement && passwordElement && loginButtonElement) {
            if (emailElement.value.length > 0 && passwordElement.value.length > 0 && emailElement.value.includes(`@`)) loginButtonElement.disabled = false;
            else loginButtonElement.disabled = true;
        }
        this.render(this.model);
    }
    public login(email: string, password: string, account: Account, accounts: {email: string; password: string}[], setLoginStatus: (status: boolean) => void, incorrect: string, getAcc: (account: {email: string; password: string}) => void) {
        const denyAccess = () => {
            alert(incorrect);
            getAcc({email: "", password: ""});
            return setLoginStatus(false);
        };
        const allowAccess = () => {
            getAcc({
                email: email,
                password: password,
            });
            return setLoginStatus(true);
        };
        const checkAccess = (registeredAccount: {email: string; password: string}, index: number) => ((email === account.email && password === account.password) || (email === registeredAccount.email && password === registeredAccount.password) || (email === accounts[index].email && password === accounts[index].password) ? allowAccess() : denyAccess());
        accounts.forEach((registeredAccount: {email: string; password: string}, index: number) => (index === accounts.length - 1 ? checkAccess(registeredAccount, index) : false));
        this.render(this.model);
    }
    protected createInitialModel(): LoginModel {
        return new LoginModel();
    }
}
