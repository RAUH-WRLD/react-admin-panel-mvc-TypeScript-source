import React from "react";
import {data} from "../data/data";
import {HashRouter, Routes, Route, Navigate} from "react-router-dom";
import NotFound404 from "../components/404/404";
import LoginViewScene from "../views/LoginViewScene";
import RegistrationViewScene from "../views/RegistrationViewScene";
import RegistrationModel from "../models/RegistrationModel";
import DashboardViewScene from "../views/DashboardViewScene";
import ResetViewScene from "../views/ResetViewScene";
import Unavailable from "../components/Unavailable/Unavailable";
export default class Router extends React.Component {
    state = {
        accounts: new RegistrationModel().registeredAccounts,
        loginStatus: false,
        shouldLogin: true,
        shouldLoginAfterGettingNewAccs: false,
        shouldRedirectToDashboard: false,
        account: {
            email: "",
            password: "",
        },
        didUserResetPassword: false,
        shouldRedirectToLogin: false,
    };
    getRegisteredAccounts = (accs: {email: string; password: string}[]) => this.setState({accounts: accs});
    setLoginStatus = (status: boolean) => {
        this.setState({loginStatus: status});
        return this.setState({shouldRedirectToDashboard: status});
    };
    setRedirectToDashboardStatus = (status: boolean) => this.setState({shouldRedirectToDashboard: status});
    setRedirectToLoginStatus = (status: boolean) => this.setState({shouldRedirectToLogin: status});
    setResetPasswordStatus = (status: boolean) => this.setState({didUserResetPassword: status});
    processLoginAfterGettingNewAccs = () => {
        this.setState({shouldLogin: false});
        return this.setState({shouldLoginAfterGettingNewAccs: true});
    };
    checkRegAccs = () => {
        if (this.state.accounts.length > 1 && this.state.shouldLogin) this.processLoginAfterGettingNewAccs();
        else return false;
    };
    checkLoginStatus = () => {
        if (this.state.accounts && this.state.loginStatus && this.state.shouldRedirectToDashboard) window.history.pushState(null, "", "/#/dashboard");
        else return false;
    };
    getAccount = (account: {email: string; password: string}) => this.setState({account});
    componentDidUpdate() {
        this.checkRegAccs();
        this.checkLoginStatus();
    }
    render() {
        return (
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" replace={true} />} />
                    {(this.state.accounts && !this.state.loginStatus && this.state.shouldLogin) || (this.state.shouldLoginAfterGettingNewAccs && !this.state.loginStatus) ? (
                        <Route path="/login" element={<LoginViewScene data={data.login} accounts={this.state.accounts} setLoginStatus={this.setLoginStatus} getAcc={this.getAccount} />} />
                    ) : (
                        <Route path="/login" element={<Navigate to="/dashboard" replace={true} />} />
                    )}
                    {!this.state.didUserResetPassword ? <Route path="/reset" element={<ResetViewScene data={data.reset} accounts={this.state.accounts} setResetPasswordStatus={this.setResetPasswordStatus} />} /> : <Route path="/reset" element={<Navigate to="/login" replace={true} />} />}
                    {this.state.shouldRedirectToLogin && !this.state.shouldRedirectToDashboard ? (
                        <Route path="/dashboard" element={<Navigate to="/login" replace={true} />} />
                    ) : (
                        <Route path="/dashboard" element={<DashboardViewScene data={data.dashboard} account={this.state.account} didUserConnect={this.state.shouldRedirectToDashboard} setRedirectToLoginStatus={this.setRedirectToLoginStatus} setConnectStatus={this.setRedirectToDashboardStatus} setLoginStatus={this.setLoginStatus} />} />
                    )}
                    <Route path="/registration" element={<RegistrationViewScene data={data.registration} getRegisteredAccounts={this.getRegisteredAccounts} />} />
                    <Route path="*" element={<NotFound404 data={data._404_} />} />
                    <Route path="/seo" element={<Unavailable data={data.unavailable} />} />
                    <Route path="/domains" element={<Unavailable data={data.unavailable} />} />
                    <Route path="/users" element={<Unavailable data={data.unavailable} />} />
                    <Route path="/invoices" element={<Unavailable data={data.unavailable} />} />
                    <Route path="/options" element={<Unavailable data={data.unavailable} />} />
                </Routes>
            </HashRouter>
        );
    }
}
