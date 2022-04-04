import React from "react";
import {Link} from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
interface Props {
    data: {
        status: string;
        title: string;
        info: string;
        return_link: string;
    };
}
export default class Unavailable extends React.Component<Props> {
    documentTitleChange = (title: string) => (document.title = title);
    componentDidMount() {
        this.documentTitleChange(this.props.data.status);
    }
    render() {
        const {data} = this.props;
        const status = data.status;
        const title = data.title;
        const info = data.info;
        const return_link = data.return_link;
        return (
            <React.Fragment>
                <Header className={"unavailable"} text={status} />
                <main className="unavailable__main">
                    <section className="unavailable__main_info">
                        <div className="unavailable__title">
                            <h2 className="unavailable__title_inner">{title}</h2>
                        </div>
                        <div className="unavailable__info">
                            <span className="unavailable__info_inner">{info}</span>
                        </div>
                        <div className="unavailable__link">
                            <Link to={"/"} className="unavailable__link_inner">
                                {return_link}
                            </Link>
                        </div>
                    </section>
                </main>
                <Footer className={"unavailable"} text={status} />
            </React.Fragment>
        );
    }
}
