import React, {Component} from 'react';
import axios from 'axios'
import {Col, Row} from "antd";
import Loading from "../layout/Loading";
import CollectionsDetailsImages from "./CollectionsDetailsImages";
import CollectionsDetailInfo from "./CollectionsDetailInfo";

class CollectionsDetail extends Component {
    state = {collection: {name: '', class_code: '', _id: '', images: []}, loading: true};

    constructor(props) {
        super(props);
        this.getCollection = this.getCollection.bind(this);
    }


    componentDidMount() {
        const id = this.props.match.params.id;
        this.getCollection(id);
    }

    getCollection(id) {
        axios.get(`/api/collections/${id}/?embedded={"images":1}`).then(response => this.setState({
            collection: response.data,
            loading: false
        }));
    }

    updateImages = (images) => {
        const collection = this.state.collection;
        collection.images = images;
        this.setState({collection});
    };

    render() {
        return (
            <Row gutter={48}>
                <Loading loading={this.state.loading}>
                    <Col
                        md={24}
                        lg={8}
                    >
                        <CollectionsDetailInfo collection={this.state.collection}/>
                    </Col>
                    <Col
                        md={24}
                        lg={16}
                    >
                        <CollectionsDetailsImages
                            collection={this.state.collection}
                            updateImages={this.updateImages}
                            getCollection={this.getCollection}
                        />
                    </Col>
                </Loading>
            </Row>
        )
    }
}

export default CollectionsDetail;
