import logo from "../assets/images/main/logo.jpg";
import loginBackground from "../assets/images/login/background.jpg";
import registerBackground from "../assets/images/registration/background.jpg";
import resetBackground from "../assets/images/reset/background.jpg";
import {ReactComponent as dashboard} from "../assets/images/icons/dashboard.svg";
import {ReactComponent as seo_info} from "../assets/images/icons/seo_info.svg";
import {ReactComponent as domains} from "../assets/images/icons/domains.svg";
import {ReactComponent as users} from "../assets/images/icons/users.svg";
import {ReactComponent as invoices} from "../assets/images/icons/invoices.svg";
import {ReactComponent as options} from "../assets/images/icons/options.svg";
import {ReactComponent as arrow_down} from "../assets/images/icons/arrow_down.svg";
import {ReactComponent as users_info} from "../assets/images/icons/users_info.svg";
import {ReactComponent as profit_info} from "../assets/images/icons/profit_info.svg";
import {ReactComponent as cost_info} from "../assets/images/icons/cost_info.svg";
import {ReactComponent as resources_info} from "../assets/images/icons/resources_info.svg";
import {ReactComponent as clock} from "../assets/images/icons/clock.svg";
import {ReactComponent as close} from "../assets/images/icons/close.svg";
import {ReactComponent as increase} from "../assets/images/icons/increase.svg";
const account = {
    email: "anna.stillman00@gmail.com",
    password: "as2000",
};
export const data = {
    login: {
        documentTitle: "Log in",
        logo: logo,
        alt: "SEODITY",
        status: "Welcome back",
        email: "Email:",
        password: "Password:",
        reset: "Forgot password?",
        reset_href: "/reset",
        background: loginBackground,
        emailLogin: account.email,
        passwordLogin: account.password,
        register: "Create an account",
        register_href: "/registration",
        incorrect: "Incorrect password or email",
    },
    registration: {
        documentTitle: "Registration",
        logo: logo,
        alt: "SEODITY",
        status: "Registration",
        email: "Email:",
        password: "Password:",
        confirm: "Confirm password:",
        sign: "Sign up",
        sign_href: "/",
        login: "I have an account",
        login_href: "/",
        background: registerBackground,
        already_exist: "You're trying to create account, that already exist",
    },
    dashboard: {
        documentTitle: "Dashboard",
        status: "Log out",
        logo: logo,
        alt: "SEODITY",
        navigation_hrefs: ["/dashboard", "/seo", "/domains", "/users", "/invoices", "/options"],
        navigation: [dashboard, seo_info, domains, users, invoices, options],
        EmailIcon: arrow_down,
        reg_date: `01 Jun 2018`,
        current_date: `${new Date()}`,
        dashboard_clock: {
            ClockIcon: clock,
            CloseIcon: close,
        },
        dashboard_info: {
            IncreaseIcon: increase,
            info_items: ["Users", "Profit", "Cost", "Resources"],
            info_items_values: ["3.970", "$18.045", "$1.453", "44%"],
            info: [users_info, profit_info, cost_info, resources_info],
            increase_values: ["2%", "", "", ""],
            decrease_values: ["-3%", "", "", ""],
        },
        subscriptions: [
            {
                year: "2018",
                Silver: 390,
                Bronze: 204,
                Trial: 151,
                Gold: 59,
                Group: 513,
            },
        ],
        subscriptions_keys: ["Silver", "Bronze", "Trial", "Gold", "Group"],
        subscriptions_colors: [
            {
                stroke: "#f54f39",
                fill: "#f4d1d9",
            },
            {
                stroke: "#e5a03e",
                fill: "#efbd75",
            },
            {
                stroke: "#a7adce",
                fill: "#c0c6e3",
            },
            {
                stroke: "#e02254",
                fill: "#ee4a75",
            },
            {
                stroke: "#6b6bce",
                fill: "#9696e9",
            },
        ],
        subscriptions_options: ["Trial", "Bronze", "Silver", "Gold", "Group"],
        subscriptions_options_colors: ["#a7adce", "#e5a03e", "#f43f27", "#e02254", "#6b6bce"],
        subscriptions_inner: "Subscriptions",
        profits: [
            {
                year: "2018",
                Profit: 4561,
                Cost: 767,
            },
        ],
        profits_keys: ["Profit", "Cost"],
        profits_colors: [
            {
                stroke: "#6b6bce",
                fill: "#9696e9",
            },
            {
                stroke: "#e02254",
                fill: "#ee4a75",
            },
        ],
        profits_options: ["Profit", "Cost"],
        profits_options_colors: ["#6b6bce", "#e02254"],
        profits_inner: "Profits & costs",
        resources: [
            {
                year: "2018",
                Keyword_Research: 85,
            },
        ],
        resources_key: "Keyword_Research",
        resources_color: "#06bad5",
        resources_inner: "Resources",
    },
    reset: {
        documentTitle: "Reset password",
        logo: logo,
        alt: "SEODITY",
        background: resetBackground,
        email: "Email:",
        login: "Back to login page",
        login_href: "/",
        not_exist_acc: "You're trying to change an account password, that doesn't exist",
        exist_acc: "Enter a new password",
        success: "Success! Now you can login",
        error: "Something went wrong",
    },
    _404_: {
        title: "404",
        info: "Sorry, your requested page was not found",
        return_link: "Go back",
    },
    unavailable: {
        status: "Unavailable",
        title: "Sorry, this page is unavailable",
        info: "The status of CEO is required",
        return_link: "Go back",
    },
};
