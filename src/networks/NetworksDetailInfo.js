import React, {Component} from 'react';
import {Card, Divider} from "antd";

class NetworksDetailInfo extends Component {
    render() {
        const {network} = this.props;
        return (
            <Card>
                <Divider>ID</Divider>
                <h2>{network._id}</h2>
                <Divider>Name</Divider>
                <h2>{network.name}</h2>
                <Divider>Trained</Divider>
                <h2>{network.trained ? 'Yes' : 'No'}</h2>
            </Card>
        );
    }
}

export default NetworksDetailInfo;
