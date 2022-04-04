import React from "react";
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from "recharts";
interface Props {
    processedElements: Array<any>;
    className: string;
    elements_inner: string;
    domain: Array<number>;
    width: number;
    height: number;
    element_key: string;
    color: string;
    functionForFirstLaunch: any;
}
export default class Bars extends React.Component<Props> {
    componentDidMount() {
        const {functionForFirstLaunch} = this.props;
        functionForFirstLaunch();
    }
    render() {
        const {processedElements, className, elements_inner, width, height, element_key, color, domain} = this.props;
        return (
            <div className={`dashboard__statistics_${className} dashboard__statistics_bars`}>
                {processedElements ? (
                    <React.Fragment>
                        <div className={`dashboard__statistics_${className}_title dashboard__statistics_bars_title`}>
                            <h3 className={`dashboard__statistics_${className}_title_inner dashboard__statistics_bars_title_inner`}>{elements_inner}</h3>
                        </div>
                        <BarChart
                            data={processedElements}
                            width={width}
                            height={height}
                            margin={{
                                top: 10,
                                right: 30,
                                left: 0,
                                bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray="0 0" />
                            <XAxis dataKey="year" />
                            <YAxis type="number" domain={domain} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey={element_key} fill={color} className={element_key} isAnimationActive={false} />
                        </BarChart>
                    </React.Fragment>
                ) : null}
            </div>
        );
    }
}
