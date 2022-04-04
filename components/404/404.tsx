import React from "react";
import {Link} from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
interface Props {
    data: {
        title: string;
        info: string;
        return_link: string;
    };
}
export default class NotFound404 extends React.Component<Props> {
    documentTitleChange = (title: string) => (document.title = title);
    componentDidMount() {
        this.documentTitleChange(this.props.data.title);
    }
    render() {
        const {data} = this.props;
        const title = data.title;
        const info = data.info;
        const return_link = data.return_link;
        return (
            <React.Fragment>
                <Header className={"error-404"} text={title} />
                <main className="error-404__main">
                    <section className="error-404__main_info">
                        <div className="error-404__title">
                            <h2 className="error-404__title_inner">{title}</h2>
                        </div>
                        <div className="error-404__info">
                            <span className="error-404__info_inner">{info}</span>
                        </div>
                        <div className="error-404__link">
                            <Link to={"/"} className="error-404__link_inner">
                                {return_link}
                            </Link>
                        </div>
                    </section>
                </main>
                <Footer className={"error-404"} text={title} />
            </React.Fragment>
        );
    }
}
