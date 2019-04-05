import React, {Component} from 'react';
import {ResponsiveContainer, LineChart, XAxis, YAxis, Line} from 'recharts';

class NetworksDetailTrainingChart extends Component {
    render() {
        return (
            <ResponsiveContainer
                height={200}
                width="100%"
            >
                {this.props.data.length !== 0 ?
                    <LineChart
                        data={this.props.data}
                    >
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <Line dataKey="predict"/>
                    </LineChart>
                    : ''
                }
            </ResponsiveContainer>
        );
    }
}

export default NetworksDetailTrainingChart;
