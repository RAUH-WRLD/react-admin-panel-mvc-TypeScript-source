import {AController} from "@eagerlogic/react-mvc";
import RegistrationModel from "../models/RegistrationModel";
import {data} from "../data/data";
export default class RegistrationController extends AController<RegistrationModel> {
    public documentTitleChange(title: string) {
        return (document.title = title);
    }
    public processForm(email: React.RefObject<HTMLInputElement>, password: React.RefObject<HTMLInputElement>, register: React.RefObject<HTMLAnchorElement>, confirm: React.RefObject<HTMLInputElement>) {
        const emailElement = email.current;
        const passwordElement = password.current;
        const registerButtonElement = register.current;
        const confirmElement = confirm.current;
        if (emailElement && passwordElement && registerButtonElement && confirmElement) {
            if (emailElement.value.length > 0 && passwordElement.value.length > 0 && emailElement.value.includes(`@`) && confirmElement.value.length > 0 && confirmElement.value === passwordElement.value) registerButtonElement.classList.remove("auth_disabled");
            else registerButtonElement.classList.add("auth_disabled");
        }
        this.render(this.model);
    }
    public registerAccount(email: React.RefObject<HTMLInputElement>, password: React.RefObject<HTMLInputElement>, getRegisteredAccounts: (accs: {email: string; password: string}[]) => void) {
        const emailElement = email.current;
        const passwordElement = password.current;
        if (emailElement && passwordElement) {
            if (emailElement.value === this.model.registeredAccounts[0].email && passwordElement.value === this.model.registeredAccounts[0].password) {
                return alert(data.registration.already_exist);
            } else {
                const new_account = {
                    email: emailElement.value,
                    password: passwordElement.value,
                };
                this.model.registeredAccounts.push(new_account);
                return getRegisteredAccounts(this.model.registeredAccounts);
            }
        }
        this.render(this.model);
    }
    protected createInitialModel(): RegistrationModel {
        return new RegistrationModel();
    }
}
