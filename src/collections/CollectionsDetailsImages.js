import React, {Component} from 'react';
import {Card, Table, Upload, Button, Icon, Divider, Avatar, Popconfirm} from "antd";
import axios from 'axios';
import Loading from '../layout/Loading';

const {Column} = Table;

class CollectionsDetailsImages extends Component {
    state = {loading: false};

    constructor(props) {
        super(props);
        this.beforeUpload = this.beforeUpload.bind(this);
        this.onChangeUpload = this.onChangeUpload.bind(this);
    }

    beforeUpload = () => this.setState({loading: true});

    onChangeUpload = ({file, fileList}) => {
        const {collection, getCollection} = this.props;
        if (fileList.every(file => file.status === "done")) {
            let imageIds = fileList.map(file => file.response._id);
            if (collection.images) {
                imageIds = [...collection.images.map(image => image._id), ...imageIds]
            }
            const headers = {'If-Match': collection._etag};
            axios.patch(`/api/collections/${collection._id}`, {images: imageIds}, {headers: headers})
                .then(() => {
                    getCollection(collection._id);
                    this.setState({loading: false})
                })
        }
    };

    removeImage = (image) => {
        const {updateImages, collection} = this.props;
        axios.delete(`/api/images/${image._id}`, {headers: {'If-Match': image._etag}}).then(() => {
            const images = [...collection.images];
            const index = images.indexOf(image);
            images.splice(index, 1);
            updateImages(images);
        });
    };

    render() {
        const {collection} = this.props;
        return (
            <Card>
                <Upload
                    showUploadList={false}
                    onChange={this.onChangeUpload}
                    beforeUpload={this.beforeUpload}
                    action="/api/images"
                    name="image"
                    multiple={true}
                    listType="picture"
                >
                    <Loading loading={this.state.loading}>
                        <Button size="large">
                            <Icon type="upload"/> Add images
                        </Button>
                    </Loading>
                </Upload>
                <Divider/>
                <Table
                    rowKey="_id"
                    dataSource={collection.images}
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
            </Card>
        )
    }
}

export default CollectionsDetailsImages;
