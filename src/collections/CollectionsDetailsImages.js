import React, {Component} from 'react';
import {Card, Table, Upload, Button, Icon, Divider, Avatar, Popconfirm} from "antd";
import axios from 'axios';
import Loading from "../Loading";

const {Column} = Table;

class CollectionsDetailsImages extends Component {
    state = {images: [], loading: true};

    componentDidMount() {
        const {collectionId} = this.props;
        axios.get(`/api/images?collection=${collectionId}&sort=[("_created", -1)]`).then(response => this.setState({
            images: response.data._items,
            loading: false
        }))
    }

    dataUploadImages = () => {
        const {collectionId} = this.props;
        return {collection: collectionId};
    };

    afterUploadImages = ({file}) => {
        if (file.response) {
            axios.get(`/api/images/${file.response._id}`).then(
                response => this.setState({images: [response.data, ...this.state.images]}))
        }
    };

    removeImage = (image) => {
        axios.delete(`/api/images/${image._id}`, {headers: {'If-Match': image._etag}}).then(() => {
            const images = [...this.state.images];
            const index = images.indexOf(image);
            images.splice(index, 1);
            this.setState({images});
        });
    };

    render() {
        return (
            <Card>
                <Upload
                    showUploadList={false}
                    onChange={this.afterUploadImages}
                    data={this.dataUploadImages}
                    action="/api/images"
                    name="image"
                    multiple={true}
                    listType="picture"
                >
                    <Button size="large">
                        <Icon type="upload"/> Add images
                    </Button>
                </Upload>
                <Divider/>
                <Loading loading={this.state.loading}>
                    <Table
                        rowKey="_id"
                        dataSource={this.state.images}
                    >
                        <Column
                            title="ID"
                            dataIndex="_id"
                            key="_id"
                        />
                        <Column
                            title="Image"
                            dataIndex="image"
                            key="image"
                            render={image => (
                                <a href={image} target="_blank" rel="noopener noreferrer">
                                    <Avatar size={64} shape="square" src={image}/>
                                </a>
                            )}
                        />
                        <Column
                            title="Actions"
                            dataIndex="_id"
                            key="actions"
                            render={(_id, image) => (
                                <Popconfirm title="Are you sure delete this image?"
                                            onConfirm={() => this.removeImage(image)} okText="Yes"
                                            cancelText="No">
                                    <Button type="danger"><Icon type="delete"/></Button>
                                </Popconfirm>
                            )}
                        />
                    </Table>
                </Loading>
            </Card>
        );
    }
}

export default CollectionsDetailsImages;
