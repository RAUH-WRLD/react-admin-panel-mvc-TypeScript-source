import React from "react";
interface Props {
    time: any;
    renderClock: (status: boolean) => void;
    CloseIcon: any;
    className: string;
}
export default class Clock extends React.Component<Props> {
    private timeInterval: any;
    constructor(props: Props) {
        super(props);
        this.timeInterval = null;
    }
    state = {
        current_time: "",
    };
    getTime = () => {
        const {time} = this.props;
        const current_time = time();
        this.setState({current_time});
    };
    componentDidMount() {
        this.getTime();
        this.timeInterval = setInterval(this.getTime, 1000);
    }
    componentWillUnmount() {
        clearInterval(this.timeInterval);
        delete this.timeInterval;
    }
    render() {
        const {renderClock, CloseIcon, className} = this.props;
        return (
            <section className={`${className}__main_clock main__clock`}>
                <div className={`${className}__main_clock main__clock_info`}>
                    <div className={`${className}__main_clock_item main__clock_item`}>
                        <div className={`${className}__main_clock_item main__clock_item_inner`}></div>
                    </div>
                    <div className={`${className}__main_clock_time main__clock_time`}>
                        <span className={`${className}__main_clock_time main__clock_time_inner`}>{this.state.current_time}</span>
                    </div>
                </div>
                <button onClick={() => renderClock(false)} className={`${className}__main_clock_close main__clock_close`}>
                    <CloseIcon />
                </button>
            </section>
        );
    }
}
