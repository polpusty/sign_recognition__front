import React, {Component} from 'react';
import axios from 'axios';
import {Upload, Button, Icon, List, Avatar} from 'antd';

class NetworksPredictionImages extends Component {
    state = {images: [], selectedImageId: null};

    constructor(props) {
        super(props);
        this.afterUploadImage = this.afterUploadImage.bind(this);
        this.setImage = this.setImage.bind(this);
    }

    afterUploadImage({file}) {
        if (file.response) {
            axios.get(`/api/images/${file.response._id}`).then((response) => {
                const images = [response.data, ...this.state.images];
                this.setState({images});
            })
        }
    }

    setImage(image) {
        const {setImage} = this.props;
        setImage(image);
        this.setState({selectedImageId: image._id});
    }

    render() {
        return (
            <div>
                <Upload.Dragger
                    action="/api/images/"
                    name="image"
                    multiple={true}
                    onChange={this.afterUploadImage}
                    showUploadList={false}
                    required={true}
                >
                    <Button><Icon type="upload"/>Select Images</Button>
                </Upload.Dragger>
                <List
                    dataSource={this.state.images}
                    bordered
                    renderItem={item => (
                        <List.Item onClick={() => this.setImage(item)}>
                            <Avatar
                                shape={this.state.selectedImageId === item._id ? 'circle' : 'square'}
                                size={158}
                                src={item.image}
                            />
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}

export default NetworksPredictionImages;
