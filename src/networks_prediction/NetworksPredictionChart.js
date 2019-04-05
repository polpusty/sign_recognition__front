import React, {Component} from 'react';
import {ResponsiveContainer, BarChart, XAxis, YAxis, Bar, Tooltip} from 'recharts';

class NetworksPredictionChart extends Component {
    render() {
        const {data} = this.props;
        return (
            <ResponsiveContainer
                width="100%"
                height={200}
            >
                <BarChart
                    data={data}
                >
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <Tooltip/>
                    <Bar dataKey="predict" fill="#1890ff"/>
                </BarChart>
            </ResponsiveContainer>
        );
    }
}

export default NetworksPredictionChart;
