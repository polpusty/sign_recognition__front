import React, {Component} from 'react';
import {Form, Select, Upload, Button, Icon, Avatar} from 'antd';
import axios from 'axios';
import Loading from '../layout/Loading';

const {Option} = Select;

class NetworksPredictionForm extends Component {
    state = {trained_networks: [], selected_network: {}, image: {}, loading: true};

    componentDidMount() {
        axios.get('/api/networks?where={"trained": {"$exists": true}}&embedded={"collections": 1}')
            .then(response => this.setState({trained_networks: response.data._items, loading: false}))
    }

    handleChangeSelect(value) {
        const {setData} = this.props;
        setData([]);
        const selected_network = this.state.trained_networks.find(network => network._id === value);
        this.setState({selected_network});
    }

    afterUploadImage({file}) {
        const {setData} = this.props;
        setData([]);
        if (file.response) {
            axios.get(`/api/images/${file.response._id}`).then(response => this.setState({
                image: response.data,
            }))
        }
    }

    handleFormSubmit(event) {
        const {setData} = this.props;
        axios.post(`/api/networks/predict/${this.state.selected_network._id}/${this.state.image._id}`
        ).then(response => {
            const data = response.data[0].map((predict, index) => {
                return {name: this.state.selected_network.collections[index].name, predict: predict}
            });
            setData(data);
        });
        event.preventDefault();
    }

    constructor(props) {
        super(props);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.afterUploadImage = this.afterUploadImage.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    render() {
        return (
            <Form onSubmit={this.handleFormSubmit}>
                <Form.Item label="Select a network">
                    <Loading loading={this.state.loading}>
                        <Select
                            onChange={this.handleChangeSelect}
                            required={true}
                        >
                            {this.state.trained_networks.map(network => <Option key={network._id}
                                                                                value={network._id}>{network.name}</Option>)}
                        </Select>
                    </Loading>
                </Form.Item>
                <Form.Item label="Select an image">
                    <Upload.Dragger
                        action="/api/images/"
                        name="image"
                        multiple={false}
                        listType="picture-card"
                        onChange={this.afterUploadImage}
                        showUploadList={false}
                        required={true}
                    >
                        <div>
                            {this.state.image ?
                                <Avatar shape="square" size={64} src={this.state.image.image}/> :
                                <Icon type="plus"/>}
                        </div>
                    </Upload.Dragger>
                </Form.Item>
                <Form.Item>
                    <Button block={true} htmlType="submit">Predict</Button>
                </Form.Item>
            </Form>
        );
    }
}

export default NetworksPredictionForm;
