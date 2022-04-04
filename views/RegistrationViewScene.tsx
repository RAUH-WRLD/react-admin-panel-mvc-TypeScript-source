import RegistrationModel from "../models/RegistrationModel";
import {AScene} from "@eagerlogic/react-mvc";
import RegistrationController from "../controllers/RegistrationController";
import React from "react";
import {Link} from "react-router-dom";
import Header from "../components/Header/Header";
type Data = {
    documentTitle: string;
    logo: string;
    alt: string;
    status: string;
    email: string;
    password: string;
    confirm: string;
    sign: string;
    sign_href: string;
    login: string;
    login_href: string;
    background: string;
    already_exist: string;
};
interface Props {
    data: Data;
    getRegisteredAccounts: (accs: {email: string; password: string}[]) => void;
}
export default class RegistrationViewScene extends AScene<Props, RegistrationModel, RegistrationController> {
    private emailRef: React.RefObject<HTMLInputElement>;
    private passwordRef: React.RefObject<HTMLInputElement>;
    private passwordConfirmRef: React.RefObject<HTMLInputElement>;
    private registerRef: React.RefObject<HTMLAnchorElement>;
    constructor(props: Props) {
        super(props);
        this.emailRef = React.createRef();
        this.passwordRef = React.createRef();
        this.passwordConfirmRef = React.createRef();
        this.registerRef = React.createRef();
    }
    protected createControlller() {
        return new RegistrationController();
    }
    componentDidMount() {
        this.controller.documentTitleChange(this.props.data.documentTitle);
    }
    render() {
        const {documentTitle, logo, alt, status, email, password, confirm, sign, sign_href, login, login_href, background} = this.props.data;
        const {getRegisteredAccounts} = this.props;
        return (
            <React.Fragment>
                <Header className={"registration"} text={documentTitle} />
                <main className="registration__main auth__main">
                    <section className="registration__authorization auth__authorization">
                        <div className="not-selectable registration__authorization_item auth__authorization_item">
                            <img className="registration__authorization_logo auth__authorization_logo" src={logo} alt={alt} />
                        </div>
                        <form action="" className="registration__authorization_form auth__authorization_form" onChange={() => this.controller.processForm(this.emailRef, this.passwordRef, this.registerRef, this.passwordConfirmRef)} onSubmit={(event) => event.preventDefault()}>
                            <h2 className="registration__authorization_status auth__authorization_status">{status}</h2>
                            <div className="registration__authorization_input auth__authorization_input">
                                <p className="registration__authorization_email auth__authorization_email">{email}</p>
                                <input className="registration__authorization_email_input auth__authorization_email_input" type="email" ref={this.emailRef} />
                            </div>
                            <div className="registration__authorization_input auth__authorization_input">
                                <p className="registration__authorization_password auth__authorization_password">{password}</p>
                                <input className="registration__authorization_password_input auth__authorization_password_input" type="password" ref={this.passwordRef} />
                            </div>
                            <div className="registration__authorization_input auth__authorization_input">
                                <p className="registration__authorization_password auth__authorization_password">{confirm}</p>
                                <input className="registration__authorization_password_input auth__authorization_password_input" type="password" ref={this.passwordConfirmRef} />
                            </div>
                            <div className="registration__authorization_buttons auth__authorization_buttons">
                                <Link to={sign_href} className="registration__authorization_sign_button auth__authorization_sign_button auth_disabled" ref={this.registerRef} onClick={() => this.controller.registerAccount(this.emailRef, this.passwordRef, getRegisteredAccounts)}>
                                    {sign}
                                </Link>
                                <Link to={login_href} className="registration__authorization_account_button auth__authorization_account_button">
                                    {login}
                                </Link>
                            </div>
                        </form>
                    </section>
                    <section className="registration__background auth__background">
                        <div className="not-selectable registration__background_item auth__background_item">
                            <img className="registration__background_inner auth__background_inner" src={background} alt={alt} />
                        </div>
                    </section>
                </main>
            </React.Fragment>
        );
    }
}
