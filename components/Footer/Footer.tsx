import React from "react";
interface Props {
    className: string;
    text: string;
}
export default class Footer extends React.Component<Props> {
    render() {
        const {className, text} = this.props;
        return (
            <footer className={`${className}__footer footer`}>
                <section className={`${className}__title_inner footer__title_inner`}>
                    <h1 className={`${className}__title_inner footer__title_inner`}>{text}</h1>
                </section>
            </footer>
        );
    }
}
