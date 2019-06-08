import React, {Component} from 'react';
import {ResponsiveContainer, LineChart, XAxis, YAxis, Line, Legend, Tooltip} from 'recharts';

class NetworksDetailTrainingChart extends Component {
    render() {
        return (
            <div>
                <ResponsiveContainer
                    height={200}
                    width="100%"
                >
                    {this.props.answearPrediction.length !== 0 ?
                        <LineChart
                            data={this.props.answearPrediction}
                        >
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Line dataKey="predict"/>
                        </LineChart>
                        : ''
                    }
                </ResponsiveContainer>
                <p>Y axis described accuracy.</p>
            </div>
        );
    }
}

export default NetworksDetailTrainingChart;
