import React, {Component} from 'react';
import axios from 'axios';
import {Table} from "antd";
import {Link} from "react-router-dom";
import Loading from "../layout/Loading";

const {Column} = Table;

class NetworksAddCollections extends Component {
    state = {toSelectCollections: [], loading: true};

    componentDidMount() {
        axios.get('/api/collections/').then(response => this.setState({
            toSelectCollections: response.data._items,
            loading: false
        }))
    }

    render() {
        const rowSelection = {
            selectedRowKeys: this.props.collections,
            onChange: this.props.onChange
        };

        return (
            <Loading loading={this.state.loading}>
                <Table
                    rowKey="_id"
                    rowSelection={rowSelection}
                    dataSource={this.state.toSelectCollections}
                >
                    <Column
                        title="ID"
                        dataIndex="_id"
                        key="_id"
                        render={id => (<Link to={`/collections/detail/${id}`}>{id}</Link>)}
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
            </Loading>
        );
    }
}

export default NetworksAddCollections;
