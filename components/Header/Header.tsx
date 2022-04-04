import React from "react";
interface Props {
    className: string;
    text: string;
}
export default class Header extends React.Component<Props> {
    render() {
        const {className, text} = this.props;
        return (
            <header className={`${className}__header header`}>
                <section className={`${className}__title_inner header__title_inner`}>
                    <h1 className={`${className}__title_inner header__title_inner`}>{text}</h1>
                </section>
            </header>
        );
    }
}
