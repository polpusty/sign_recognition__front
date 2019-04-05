import React, {Component} from 'react';
import {Card, Divider} from "antd";

class CollectionsDetailInfo extends Component {
    render() {
        const {collection} = this.props;
        return (
            <Card>
                <Divider>ID</Divider>
                <h2>{collection._id}</h2>
                <Divider>Name</Divider>
                <h2>{collection.name}</h2>
                <Divider>Class code</Divider>
                <h2>{collection.class_code}</h2>
            </Card>
        );
    }
}

export default CollectionsDetailInfo;
