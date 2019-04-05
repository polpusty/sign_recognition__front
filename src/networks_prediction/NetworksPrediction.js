import React, {Component} from 'react';
import {Row, Col} from 'antd';
import NetworksPredictionForm from './NetworksPredictionForm'
import NetworksPredictionChart from './NetworksPredictionChart'


class NetworksPrediction extends Component {
    state = {data: []};

    constructor(props) {
        super(props);
        this.setData = this.setData.bind(this);
    }

    setData(data) {
        this.setState({data})
    }

    render() {
        return (
            <Row>
                <Col
                    lg={{span: 12, offset: 6}}
                    md={{span: 24}}
                >
                    <NetworksPredictionForm setData={this.setData}/>
                    {0 !== this.state.data.length ? <NetworksPredictionChart data={this.state.data}/> : ''}
                </Col>
            </Row>
        );
    }
}

export default NetworksPrediction
