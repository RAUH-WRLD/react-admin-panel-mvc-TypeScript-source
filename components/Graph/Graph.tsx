import React from "react";
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from "recharts";
interface Props {
    processedElements: Array<any>;
    className: string;
    elements_inner: string;
    elements_keys: Array<string>;
    domain: Array<number>;
    width: number;
    height: number;
    elements_colors: {stroke: string; fill: string}[];
    elements_options: Array<string>;
    clickedElementsCheckboxes: Array<any>;
    elements_deactivated: Array<any>;
    options_colors: Array<string>;
    processElementsCheckboxes: (
        event: any,
        option: string,
    ) => {
        className: string;
        checkbox: string;
    };
    setClickedCheckboxes: (clickedCheckboxes: any) => void;
    setElementsDeactivated: (element: any) => void;
}
export default class Graph extends React.Component<Props> {
    render() {
        const {processedElements, className, elements_inner, elements_keys, domain, width, height, elements_colors, elements_options, elements_deactivated, clickedElementsCheckboxes, options_colors, processElementsCheckboxes, setElementsDeactivated, setClickedCheckboxes} = this.props;
        let element_option_deactivated: {
            className: string;
            checkbox: string;
        } = {
            className: "",
            checkbox: "",
        };
        return (
            <div className={`dashboard__statistics_${className} dashboard__statistics_graph`}>
                {processedElements ? (
                    <React.Fragment>
                        <div className={`dashboard__statistics_${className}_title dashboard__statistics_graph_title`}>
                            <h3 className={`dashboard__statistics_${className}_title_inner dashboard__statistics_graph_title_inner`}>{elements_inner}</h3>
                        </div>
                        <AreaChart
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
                            {elements_keys.map((key: string, index: number) => {
                                return <Area type="monotone" dataKey={key} stackId="1" stroke={elements_colors[index].stroke} fill={elements_colors[index].fill} key={`${index}-${Math.random()}`} className={key} isAnimationActive={false} />;
                            })}
                        </AreaChart>
                        <div className={`dashboard__statistics_${className}_options dashboard__statistics_graph_options`}>
                            {elements_options.map((option: string, index: number) => {
                                return (
                                    <div className={`dashboard__statistics_${className}_option dashboard__statistics_graph_option`} key={`${index}-${Math.random()}`}>
                                        <input
                                            type="checkbox"
                                            className={`dashboard__statistics_${className}_checkbox dashboard__statistics_graph_checkbox ${`dashboard__statistics_${className}_checkbox_${index + 1}`}`}
                                            id={option}
                                            name={option}
                                            defaultChecked={true}
                                            onChange={(event) => {
                                                element_option_deactivated = processElementsCheckboxes(event, option);
                                                const clickedCheckboxes = [...clickedElementsCheckboxes, element_option_deactivated.className];
                                                const element_deactivated = [...elements_deactivated, element_option_deactivated.checkbox];
                                                setClickedCheckboxes({clickedCheckboxes});
                                                setElementsDeactivated(element_deactivated);
                                            }}
                                        />
                                        <label htmlFor={option} className={`dashboard__statistics_${className}_label dashboard__statistics_graph_label`}>
                                            <div className={`dashboard__statistics_${className}_label_color dashboard__statistics_graph_label_color`} style={{background: options_colors[index]}}></div>
                                            <p className={`dashboard__statistics_${className}_label_option dashboard__statistics_graph_label_option`}>{option}</p>
                                        </label>
                                    </div>
                                );
                            })}
                        </div>
                    </React.Fragment>
                ) : null}
            </div>
        );
    }
}
