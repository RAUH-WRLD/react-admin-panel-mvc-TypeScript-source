import DashboardModel from "../models/DashboardModel";
import {AScene} from "@eagerlogic/react-mvc";
import DashboardController from "../controllers/DashboardController";
import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Panel from "../components/Panel/Panel";
import Graph from "../components/Graph/Graph";
import Bars from "../components/Graph/Bars";
import Clock from "../components/Clock/Clock";
interface Props {
    data: {
        documentTitle: string;
        status: string;
        logo: string;
        alt: string;
        navigation_hrefs: Array<string>;
        navigation: Array<any>;
        EmailIcon: any;
        reg_date: string;
        current_date: string;
        dashboard_clock: {
            ClockIcon: any;
            CloseIcon: any;
        };
        dashboard_info: {
            IncreaseIcon: any;
            info_items: Array<string>;
            info_items_values: Array<string>;
            info: Array<any>;
            increase_values: Array<string>;
            decrease_values: Array<string>;
        };
        subscriptions: {year: string; Silver: number; Bronze: number; Trial: number; Gold: number; Group: number}[];
        subscriptions_keys: Array<string>;
        subscriptions_colors: {stroke: string; fill: string}[];
        subscriptions_options: Array<string>;
        subscriptions_options_colors: Array<string>;
        subscriptions_inner: string;
        profits: {year: string; Profit: number; Cost: number}[];
        profits_keys: Array<string>;
        profits_colors: {stroke: string; fill: string}[];
        profits_options: Array<string>;
        profits_options_colors: Array<string>;
        profits_inner: string;
        resources: {year: string; Keyword_Research: number}[];
        resources_key: string;
        resources_color: string;
        resources_inner: string;
    };
    account: {
        email: string;
        password: string;
    };
    didUserConnect: boolean;
    setRedirectToLoginStatus: (status: boolean) => void;
    setConnectStatus: (status: boolean) => void;
    setLoginStatus: (status: boolean) => void;
}
export default class DashboardViewScene extends AScene<Props, DashboardModel, DashboardController> {
    state = {
        elements_deactivated: [],
        processedSubscriptions: [],
        processedProfits: [],
        processedResources: [],
        clickedCheckboxes: [],
        shouldRenderClock: false,
    };
    protected createControlller() {
        return new DashboardController();
    }
    componentDidMount() {
        const {account, didUserConnect, data, setRedirectToLoginStatus} = this.props;
        this.controller.processAccount(account, didUserConnect, setRedirectToLoginStatus);
        this.controller.documentTitleChange(data.documentTitle);
        const processedSubscriptions = this.controller.processSubscriptions(data.subscriptions);
        const processedProfits = this.controller.processProfits(data.profits);
        const processedResources = this.controller.processResources(data.resources);
        this.setState({processedSubscriptions});
        this.setState({processedProfits});
        this.setState({processedResources});
    }
    processStatistics = () => {
        this.controller.processElementsCheckboxesClicked(this.state.clickedCheckboxes);
        this.controller.processElementsStatisticsDeactivated(this.state.elements_deactivated);
    };
    componentDidUpdate() {
        this.processStatistics();
    }
    logout = () => {
        const {setRedirectToLoginStatus, setConnectStatus, setLoginStatus} = this.props;
        setConnectStatus(false);
        setRedirectToLoginStatus(true);
        setLoginStatus(false);
    };
    setClickedCheckboxes = (clickedCheckboxes: any) => this.setState({...clickedCheckboxes});
    setElementsDeactivated = (element: any) => this.setState({elements_deactivated: element});
    renderClock = (status: boolean) => this.setState({shouldRenderClock: status});
    render() {
        const {documentTitle, dashboard_clock, dashboard_info, reg_date, current_date, subscriptions_keys, subscriptions_colors, subscriptions_options, subscriptions_options_colors, subscriptions_inner, profits_inner, profits_keys, profits_colors, profits_options, profits_options_colors, resources_inner, resources_color, resources_key} = this.props.data;
        const ClockIcon = dashboard_clock.ClockIcon;
        const CloseIcon = dashboard_clock.CloseIcon;
        const IncreaseIcon = dashboard_info.IncreaseIcon;
        const items = dashboard_info.info_items;
        const values = dashboard_info.info_items_values;
        const info = dashboard_info.info;
        const increases = dashboard_info.increase_values;
        const {account, didUserConnect} = this.props;
        return (
            <React.Fragment>
                {account.email.length > 0 && didUserConnect ? (
                    <React.Fragment>
                        <Header className={"dashboard"} text={documentTitle} />
                        <Panel className={"dashboard"} data={this.props.data} email={account.email} logout={this.logout} />
                        <main className="dashboard__main">
                            <section className="dashboard__main_info">
                                <div className="grid-x">
                                    <div className="small-12 medium-12 large-3 cell">
                                        <div className="dashboard__clock">
                                            <div className="dashboard__clock_title">
                                                <h3 className="dashboard__clock_title_inner">{documentTitle}</h3>
                                            </div>
                                            <div className="dashboard__clock_subtitle">
                                                <h2 className="dashboard__clock_subtitle_inner">{documentTitle}</h2>
                                            </div>
                                            <div className="dashboard__clock_item">
                                                <button className="dashboard__clock_item_button" onClick={() => this.renderClock(true)} disabled={this.state.shouldRenderClock}>
                                                    <ClockIcon />
                                                </button>
                                                <span className="dashboard__clock_item_date">
                                                    {reg_date} - {this.controller.processDate(current_date)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="small-12 medium-12 large-9 cell">
                                        <div className="dashboard__info">
                                            {info.map((Icon: any, index: number) => {
                                                return (
                                                    <div className="dashboard__card" key={`${index}-${Math.random()}`}>
                                                        <div className="dashboard__card_info">
                                                            <span className="dashboard__card_info_inner">{values[index]}</span>
                                                            {increases[index] !== "" ? (
                                                                <span className="dashboard__card_info_status">
                                                                    <IncreaseIcon />
                                                                    {increases[index]}
                                                                </span>
                                                            ) : null}
                                                        </div>
                                                        <div className="dashboard__card_item">
                                                            <div className="dashboard__card_icon">
                                                                <Icon />
                                                            </div>
                                                            <div className="dashboard__card_name">
                                                                <span className="dashboard__card_name_inner">{items[index]}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section className="dashboard__main_statistics">
                                <div className="dashboard__statistics">
                                    <Graph
                                        processedElements={this.state.processedSubscriptions}
                                        className={"subscriptions"}
                                        elements_inner={subscriptions_inner}
                                        domain={[0, 600]}
                                        elements_keys={subscriptions_keys}
                                        width={540}
                                        height={340}
                                        elements_colors={subscriptions_colors}
                                        elements_options={subscriptions_options}
                                        clickedElementsCheckboxes={this.state.clickedCheckboxes}
                                        elements_deactivated={this.state.elements_deactivated}
                                        options_colors={subscriptions_options_colors}
                                        processElementsCheckboxes={this.controller.processElementsCheckboxes}
                                        setClickedCheckboxes={this.setClickedCheckboxes}
                                        setElementsDeactivated={this.setElementsDeactivated}
                                    />
                                    <Graph
                                        processedElements={this.state.processedProfits}
                                        className={"profits"}
                                        elements_inner={profits_inner}
                                        domain={[0, 6000]}
                                        elements_keys={profits_keys}
                                        width={540}
                                        height={340}
                                        elements_colors={profits_colors}
                                        elements_options={profits_options}
                                        clickedElementsCheckboxes={this.state.clickedCheckboxes}
                                        elements_deactivated={this.state.elements_deactivated}
                                        options_colors={profits_options_colors}
                                        processElementsCheckboxes={this.controller.processElementsCheckboxes}
                                        setClickedCheckboxes={this.setClickedCheckboxes}
                                        setElementsDeactivated={this.setElementsDeactivated}
                                    />
                                    <Bars processedElements={this.state.processedResources} className={"resources"} elements_inner={resources_inner} domain={[0, 100]} width={540} height={340} element_key={resources_key} color={resources_color} functionForFirstLaunch={this.controller.processResourcesItems} />
                                </div>
                            </section>
                            {this.state.shouldRenderClock ? <Clock time={this.controller.getCurrentTime} renderClock={this.renderClock} CloseIcon={CloseIcon} className={"dashboard"} /> : null}
                        </main>
                        <Footer className={"dashboard"} text={documentTitle} />
                    </React.Fragment>
                ) : null}
            </React.Fragment>
        );
    }
}
