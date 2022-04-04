import ResetModel from "../models/ResetModel";
import {AScene} from "@eagerlogic/react-mvc";
import ResetController from "../controllers/ResetController";
import React from "react";
import Header from "../components/Header/Header";
import {Link} from "react-router-dom";
interface Props {
    data: {
        documentTitle: string;
        background: string;
        alt: string;
        logo: string;
        email: string;
        login: string;
        login_href: string;
    };
    accounts: {email: string; password: string}[];
    setResetPasswordStatus: (status: boolean) => void;
}
export default class ResetViewScene extends AScene<Props, ResetModel, ResetController> {
    private emailRef: React.RefObject<HTMLInputElement>;
    private resetRef: React.RefObject<HTMLButtonElement>;
    constructor(props: Props) {
        super(props);
        this.emailRef = React.createRef();
        this.resetRef = React.createRef();
    }
    protected createControlller() {
        return new ResetController();
    }
    componentDidMount() {
        const {data} = this.props;
        this.controller.documentTitleChange(data.documentTitle);
    }
    render() {
        const {documentTitle, background, alt, logo, email, login, login_href} = this.props.data;
        const {accounts, setResetPasswordStatus} = this.props;
        const reset = documentTitle;
        return (
            <React.Fragment>
                <Header className={"reset"} text={documentTitle} />
                <main className="reset__main auth__reset_main auth__main">
                    <section className="reset__background auth__reset_background">
                        <div className="not-selectable reset__background_item auth__reset_background_item">
                            <img className="reset__background_inner auth__reset_background_inner" src={background} alt={alt} />
                        </div>
                    </section>
                    <section className="reset__authorization auth__reset_authorization">
                        <div className="not-selectable reset__authorization_item auth__authorization_item">
                            <img className="reset__authorization_logo auth__authorization_logo" src={logo} alt={alt} />
                        </div>
                        <form
                            action=""
                            className="reset__authorization_form auth__authorization_form"
                            onChange={() => this.controller.processForm(this.emailRef, this.resetRef)}
                            onSubmit={(event) => {
                                event.preventDefault();
                                this.controller.reset(accounts, this.emailRef, setResetPasswordStatus);
                            }}
                        >
                            <h2 className="reset__authorization_status auth__authorization_status">{reset}</h2>
                            <div className="reset__authorization_input auth__authorization_input">
                                <p className="reset__authorization_email auth__authorization_email">{email}</p>
                                <input className="reset__authorization_email_input auth__authorization_email_input" type="email" ref={this.emailRef} />
                            </div>
                            <div className="reset__authorization_buttons auth__authorization_buttons">
                                <button className="reset__authorization_reset_button" disabled={true} ref={this.resetRef}>
                                    {reset}
                                </button>
                                <Link to={login_href} className="reset__authorization_login_button">
                                    {login}
                                </Link>
                            </div>
                        </form>
                    </section>
                </main>
            </React.Fragment>
        );
    }
}
