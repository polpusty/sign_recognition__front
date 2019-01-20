import React, {Component} from 'react';
import axios from 'axios'
import {Col, Row, Divider, Card} from "antd";
import Loading from "../Loading";
import CollectionsDetailsImages from "./CollectionsDetailsImages";

class CollectionsDetail extends Component {
    state = {collection: {name: '', class_code: '', _id: ''}, loading: true};

    componentDidMount() {
        const id = this.props.match.params.id;
        axios.get(`/api/collections/${id}`).then(response => this.setState({
            collection: response.data,
            loading: false
        }));
    }

    render() {
        return (
            <Row gutter={48}>
                <Loading loading={this.state.loading}>
                    <Col
                        md={24}
                        lg={8}
                    >
                        <Card>
                            <Divider>ID</Divider>
                            <h2>{this.state.collection._id}</h2>
                            <Divider>Name</Divider>
                            <h2>{this.state.collection.name}</h2>
                            <Divider>Class code</Divider>
                            <h2>{this.state.collection.class_code}</h2>
                        </Card>
                    </Col>
                    <Col
                        md={24}
                        lg={16}
                    >
                        {
                            !this.state.loading ?
                            <CollectionsDetailsImages collectionId={this.state.collection._id}/> :
                            <p/>
                        }
                    </Col>
                </Loading>
            </Row>
        )
    }
}

export default CollectionsDetail;
