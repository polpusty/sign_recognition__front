import React, {Component} from 'react';
import axios from 'axios';
import {Row, Col, List} from 'antd';
import NetworksPredictionNetwork from './NetworksPredictionNetwork';
import NetworksPredictionChart from './NetworksPredictionChart';
import NetworksPredictionImages from './NetworksPredictionImages';
import Loading from "../layout/Loading";


class NetworksPrediction extends Component {
    state = {answerPrediction: [], selectedNetwork: null, image: null, loading: false};

    constructor(props) {
        super(props);
        this.calculatePrediction = this.calculatePrediction.bind(this);
        this.setSelectedNetwork = this.setSelectedNetwork.bind(this);
        this.setImage = this.setImage.bind(this);
    }

    calculatePrediction() {
        if (this.state.selectedNetwork !== null && this.state.image !== null) {
            this.setState({loading: true});
            axios.post(`/api/networks/predict/${this.state.selectedNetwork._id}/${this.state.image._id}`
            ).then(response => {
                const data = response.data[0].map((predict, index) => {
                    return {
                        class_code: this.state.selectedNetwork.collections[index].class_code,
                        name: this.state.selectedNetwork.collections[index].name,
                        predict: predict
                    }
                });
                this.setState({answerPrediction: data, loading: false});
            });
        }
    }

    setSelectedNetwork(selectedNetwork) {
        this.setState({selectedNetwork}, () => this.calculatePrediction());
    }

    setImage(image) {
        this.setState({image}, () => this.calculatePrediction());
    }

    render() {
        return (
            <Row>
                <Col
                    lg={{span: 4, offset: 1}}
                    md={{span: 24}}
                ><NetworksPredictionImages setImage={this.setImage}/></Col>
                <Col
                    lg={{span: 16, offset: 1}}
                    md={{span: 24}}
                >
                    <NetworksPredictionNetwork setSelectedNetwork={this.setSelectedNetwork}/>
                    <Loading loading={this.state.loading}>
                        <NetworksPredictionChart data={this.state.answerPrediction}/>
                    </Loading>
                    <List
                        dataSource={this.state.selectedNetwork ? this.state.selectedNetwork.collections : []}
                        header="Legend"
                        renderItem={item => <List.Item>{item.class_code} - {item.name}</List.Item>}
                    />
                </Col>
            </Row>
        );
    }
}

export default NetworksPrediction;
