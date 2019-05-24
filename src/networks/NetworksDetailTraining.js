import React, {Component} from 'react';
import {Button, Card} from "antd";
import {ResponsiveContainer, LineChart, XAxis, YAxis, Line} from 'recharts';
import axios from 'axios';

class NetworksDetailTraining extends Component {
    state = {operation: null, data: [], intervalId: null, loading: false};

    constructor(props) {
        super(props);
        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        const intervalId = setInterval(this.getData, 20000);
        this.setState({intervalId});
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    getData() {
        if (this.state.operation !== null && this.state.loading) {
            axios.get(`/api/operations/${this.state.operation._id}`)
                .then(response => {
                    this.setState({data: JSON.parse(response.data.step)});
                    if (response.data.status === "finished") {
                        this.setState({loading: false});
                    }
                });
        }
    }

    trainNetwork = (network) => {
        axios.post(`/api/networks/train/${network._id}`).then(response => this.setState({
            operation: response.data,
            loading: true,
            data: []
        }))
    };

    render() {
        const {network} = this.props;
        return (
            <Card>
                {0 !== this.state.data.length ?
                    <ResponsiveContainer
                        height={200}
                        width="100%"
                    >
                        <LineChart
                            data={this.state.data}
                        >
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Line dataKey="predict"/>
                        </LineChart>
                    </ResponsiveContainer>
                    :
                    <Button loading={this.state.loading} onClick={() => this.trainNetwork(network)} block>Train</Button>
                }
            </Card>
        );
    }
}

export default NetworksDetailTraining;
