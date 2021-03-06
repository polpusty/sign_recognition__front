import React, {Component} from 'react';
import {} from 'react-router-dom'
import {Form, Input, Button, Row, Col} from "antd";
import axios from "axios";

class CollectionsAdd extends Component {
    state = {name: '', class_code: ''};

    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit(event) {
        const history = this.props.history;
        axios.post('/api/collections/', {name: this.state.name, class_code: this.state.class_code}
        ).then(response => history.push(`/collections/detail/${response.data._id}`));
        event.preventDefault();
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({[name]: value})
    }

    render() {
        return (
            <Row>
                <Col
                    lg={{span: 12, offset: 6}}
                    md={{span: 24}}
                >
                    <Form
                        layout='vertical'
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
                        <Form.Item label="Class code">
                            <Input
                                name="class_code"
                                type="text"
                                value={this.state.class_code}
                                onChange={this.handleInputChange}
                                placeholder="Class code"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button block={true} htmlType="submit">Submit</Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        )
    }
}

export default CollectionsAdd;
