import React from "react";
import {Link} from "react-router-dom";
interface Props {
    className: string;
    data: {
        status: string;
        logo: string;
        alt: string;
        navigation_hrefs: Array<string>;
        navigation: Array<any>;
        EmailIcon: any;
        dashboard_clock: {
            ClockIcon: any;
        };
        dashboard_info: {
            IncreaseIcon: any;
            info_items: Array<string>;
            info_items_values: Array<string>;
            info: Array<any>;
            increase_values: Array<string>;
            decrease_values: Array<string>;
        };
    };
    email: string;
    logout: () => void;
}
export default class Panel extends React.Component<Props> {
    render() {
        const {className, email, logout} = this.props;
        const {status, logo, alt, navigation, EmailIcon, navigation_hrefs} = this.props.data;
        return (
            <header className={`${className}__panel panel`}>
                <div className="grid-x">
                    <div className="small-12 medium-6 large-4 cell">
                        <section className={`${className}__panel_logo panel__logo`}>
                            <div className="not-selectable panel__logo_item">
                                <img className="panel__logo_item_inner" src={logo} alt={alt} />
                            </div>
                        </section>
                    </div>
                    <div className="small-12 medium-6 large-4 cell">
                        <section className={`${className}__panel_navigation panel__navigation`}>
                            <nav className="panel__navigation_items">
                                <ul className="panel__navigation_items_list">
                                    {navigation.map((Icon: any, index: number) => {
                                        return (
                                            <li key={`${index}-${Math.random()}`} className="panel__navigation_item">
                                                <Link to={navigation_hrefs[index]} className="panel__navigation_item_link">
                                                    <Icon />
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </nav>
                        </section>
                    </div>
                    <div className="small-12 medium-12 large-4 cell">
                        <section className={`${className}__panel_user panel__user`}>
                            <div className="panel__user_controls">
                                <div className="panel__user_email">
                                    <span className="panel__user_email_inner">{email.length > 25 ? `${email.slice(0, 15)}...` : email}</span>
                                    <EmailIcon />
                                </div>
                                <div className="panel__user_logout">
                                    <button className="logout__button" onClick={() => logout()}>
                                        {status}
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </header>
        );
    }
}
