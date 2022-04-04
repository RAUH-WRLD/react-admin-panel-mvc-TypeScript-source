import {AController} from "@eagerlogic/react-mvc";
import ResetModel from "../models/ResetModel";
export default class ResetController extends AController<ResetModel> {
    protected createInitialModel(): ResetModel {
        return new ResetModel();
    }
    public documentTitleChange(title: string) {
        return (document.title = title);
    }
    public reset(accounts: {email: string; password: string}[], emailElement: React.RefObject<HTMLInputElement>, setResetPasswordStatus: (status: boolean) => void) {
        const email = emailElement.current?.value;
        const processNewPassword = (new_password: string, account: {email: string; password: string}) => {
            account.password = new_password;
            alert(this.model.success);
            return setResetPasswordStatus(true);
        };
        const checkEmail = (account: {email: string; password: string}) => {
            if (email === account.email) {
                const new_password = prompt(this.model.exist_account);
                return new_password ? processNewPassword(new_password, account) : alert(this.model.error);
            } else alert(this.model.not_exist_account);
        };
        console.log(accounts);
        accounts.forEach((account: {email: string; password: string}, index: number) => (index === accounts.length - 1 ? checkEmail(account) : false));
        this.render(this.model);
    }
    public processForm(email: React.RefObject<HTMLInputElement>, reset: React.RefObject<HTMLButtonElement>) {
        const emailElement = email.current;
        const resetButtonElement = reset.current;
        if (emailElement && resetButtonElement) {
            if (emailElement.value.length > 0 && emailElement.value.includes("@")) resetButtonElement.disabled = false;
            else resetButtonElement.disabled = true;
        }
        this.render(this.model);
    }
}
