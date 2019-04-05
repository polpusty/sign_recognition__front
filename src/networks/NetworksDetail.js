import React, {Component} from 'react';
import axios from 'axios';
import {Row, Col} from "antd";
import Loading from "../layout/Loading";
import NetworksDetailInfo from "./NetworksDetailInfo";
import NetworksDetailCollections from "./NetworksDetailCollections";
import NetworksDetailTraining from "./NetworksDetailTraining";

class NetworksDetail extends Component {
    state = {network: {_id: '', name: '', collections: []}, loading: true};

    componentDidMount() {
        const {id} = this.props.match.params;
        axios.get(`/api/networks/${id}/?embedded={"collections":1}`).then(response => this.setState({
            network: response.data,
            loading: false
        }));
    }

    render() {
        return (
            <Loading loading={this.state.loading}>
                <Row gutter={48}>
                    <Col lg={8} md={24}>
                        <NetworksDetailInfo network={this.state.network}/>
                    </Col>
                    <Col lg={16} md={24}>
                        <NetworksDetailCollections collections={this.state.network.collections}/>
                    </Col>
                </Row>
                <Row gutter={48} style={{marginTop: "24px"}}>
                    <Col lg={8} md={24}>
                        <NetworksDetailTraining network={this.state.network}/>
                    </Col>
                </Row>
            </Loading>
        );
    }
}

export default NetworksDetail;
