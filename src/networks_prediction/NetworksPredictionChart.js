import React, {Component} from 'react';
import {ResponsiveContainer, BarChart, XAxis, YAxis, Bar, Tooltip} from 'recharts';

class NetworksPredictionChart extends Component {
    render() {
        const {data} = this.props;
        if (data.length !== 0) {
            const answer = data.reduce((prev, current) => (prev.predict > current.predict) ? prev : current);
            return (
                <div>
                    <h2>Network predict: {answer.name}</h2>
                    <ResponsiveContainer
                        width="100%"
                        height={200}
                    >
                        <BarChart
                            data={data}
                        >
                            <XAxis dataKey="class_code"/>
                            <YAxis/>
                            <Tooltip/>
                            <Bar dataKey="predict" fill="#1890ff"/>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            );
        } else {
            return ''
        }
    }
}

export default NetworksPredictionChart;
