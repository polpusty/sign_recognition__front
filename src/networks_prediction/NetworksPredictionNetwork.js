import React, {Component} from 'react';
import {Form, Select} from 'antd';
import axios from 'axios';
import Loading from '../layout/Loading';

const {Option} = Select;

class NetworksPredictionNetwork extends Component {
    state = {trained_networks: [], selectedNetwork: {}, image: {}, loading: true};

    componentDidMount() {
        axios.get('/api/networks?where={"trained": {"$exists": true}}&embedded={"collections": 1}')
            .then(response => this.setState({trained_networks: response.data._items, loading: false}))
    }

    handleChangeSelect(value) {
        const {setSelectedNetwork} = this.props;
        const selectedNetwork = this.state.trained_networks.find(network => network._id === value);
        this.setState({selectedNetwork: selectedNetwork});
        setSelectedNetwork(selectedNetwork);
    }

    constructor(props) {
        super(props);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
    }

    render() {
        return (
            <Form>
                <Form.Item label="Select a network">
                    <Loading loading={this.state.loading}>
                        <Select
                            onChange={this.handleChangeSelect}
                        >
                            {this.state.trained_networks.map(network => <Option key={network._id}
                                                                                value={network._id}>{network.name}</Option>)}
                        </Select>
                    </Loading>
                </Form.Item>
            </Form>
        );
    }
}

export default NetworksPredictionNetwork;
