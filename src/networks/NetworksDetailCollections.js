import React, {Component} from 'react';
import {Card, Table} from "antd";
import {Link} from "react-router-dom";

const {Column} = Table;

class NetworksDetailCollections extends Component {
    render() {
        const {collections} = this.props;
        return (
            <Card>
                <Table rowKey="_id" dataSource={collections}>
                    <Column
                        title="ID"
                        dataIndex="_id"
                        key="_id"
                        render={_id => (<Link to={`/collections/detail/${_id}`}>{_id}</Link>)}
                    />
                    <Column
                        title="Name"
                        dataIndex="name"
                        key="name"
                    />
                    <Column
                        title="Class code"
                        dataIndex="class_code"
                        key="class_code"
                    />
                </Table>
            </Card>
        );
    }
}

export default NetworksDetailCollections;
