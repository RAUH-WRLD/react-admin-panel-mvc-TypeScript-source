import LoginModel from "../models/LoginModel";
import {AScene} from "@eagerlogic/react-mvc";
import LoginController from "../controllers/LoginController";
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
    reset: string;
    reset_href: string;
    background: string;
    register: string;
    register_href: string;
    incorrect: string;
};
interface Props {
    data: Data;
    accounts: {email: string; password: string}[];
    setLoginStatus: (status: boolean) => void;
    getAcc: (account: {email: string; password: string}) => void;
}
export default class LoginViewScene extends AScene<Props, LoginModel, LoginController> {
    private emailRef: React.RefObject<HTMLInputElement>;
    private passwordRef: React.RefObject<HTMLInputElement>;
    private loginRef: React.RefObject<HTMLButtonElement>;
    constructor(props: Props) {
        super(props);
        this.emailRef = React.createRef();
        this.passwordRef = React.createRef();
        this.loginRef = React.createRef();
    }
    protected createControlller() {
        return new LoginController();
    }
    componentDidMount() {
        this.controller.documentTitleChange(this.props.data.documentTitle);
    }
    render() {
        const {documentTitle, logo, alt, status, email, password, reset, background, reset_href, register, register_href, incorrect} = this.props.data;
        const {accounts, setLoginStatus, getAcc} = this.props;
        const login = documentTitle;
        return (
            <React.Fragment>
                <Header className={"login"} text={documentTitle} />
                <main className="login__main auth__main">
                    <section className="login__background auth__background">
                        <div className="not-selectable login__background_item auth__background_item">
                            <img className="login__background_inner auth__background_inner" src={background} alt={alt} />
                        </div>
                    </section>
                    <section className="login__authorization auth__authorization">
                        <div className="not-selectable login__authorization_item auth__authorization_item">
                            <img className="login__authorization_logo auth__authorization_logo" src={logo} alt={alt} />
                        </div>
                        <form
                            action=""
                            className="login__authorization_form auth__authorization_form"
                            onChange={() => this.controller.processForm(this.emailRef, this.passwordRef, this.loginRef)}
                            onSubmit={(event) => {
                                event.preventDefault();
                                return this.emailRef.current && this.passwordRef.current
                                    ? this.controller.login(
                                          this.emailRef.current.value,
                                          this.passwordRef.current.value,
                                          {
                                              email: this.model.email,
                                              password: this.model.password,
                                          },
                                          accounts,
                                          setLoginStatus,
                                          incorrect,
                                          getAcc,
                                      )
                                    : false;
                            }}
                        >
                            <h2 className="login__authorization_status auth__authorization_status">{status}</h2>
                            <div className="login__authorization_input auth__authorization_input">
                                <p className="login__authorization_email auth__authorization_email">{email}</p>
                                <input className="login__authorization_email_input auth__authorization_email_input" type="email" ref={this.emailRef} />
                            </div>
                            <div className="login__authorization_input auth__authorization_input">
                                <p className="login__authorization_password auth__authorization_password">{password}</p>
                                <input className="login__authorization_password_input auth__authorization_password_input" type="password" ref={this.passwordRef} />
                            </div>
                            <div className="login__authorization_buttons auth__authorization_buttons">
                                <button className="login__authorization_login_button auth__authorization_login_button" disabled={true} ref={this.loginRef}>
                                    {login}
                                </button>
                                <Link to={reset_href} className="login__authorization_reset_button auth__authorization_reset_button">
                                    {reset}
                                </Link>
                                {accounts.length <= 1 ? (
                                    <Link to={register_href} className="login__authorization_registration_button auth__authorization_registration_button">
                                        {register}
                                    </Link>
                                ) : null}
                            </div>
                        </form>
                    </section>
                </main>
            </React.Fragment>
        );
    }
}
