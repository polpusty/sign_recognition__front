import React, {Component} from 'react';
import {Button, Col, Form, Input, Row} from "antd";
import axios from 'axios';
import NetworksAddCollections from "./NetworksAddCollections";

class NetworksAdd extends Component {
    state = {name: '', collections: []};

    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }


    handleFormSubmit(event) {
        const history = this.props.history;
        axios.post('/api/networks/', {name: this.state.name, collections: this.state.collections}
        ).then(response => history.push(`/networks/detail/${response.data._id}`));
        event.preventDefault();
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({[name]: value})
    }

    selectCollections = (selectedCollections) => this.setState({collections: selectedCollections});

    render() {

        return (
            <Row>
                <Col
                    lg={{span: 12, offset: 6}}
                    md={{span: 24}}
                >
                    <Form
                        layout="vertical"
                        onSubmit={this.handleFormSubmit}
                    >
                        <Form.Item label="Name">
                            <Input
                                name="name"
                                type="text"
                                value={this.state.name}
                                onChange={this.handleInputChange}
                                placeholder="Name"
                            />
                        </Form.Item>
                        <Form.Item label="Collections">
                            <NetworksAddCollections
                                onChange={this.selectCollections}
                                collections={this.state.collections}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button block={true} htmlType="submit">Submit</Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        );
    }
}

export default NetworksAdd;
