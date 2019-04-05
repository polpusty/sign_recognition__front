import React, {Component} from 'react';
import axios from "axios";
import {Button, Icon, Popconfirm, Table} from "antd";
import Loading from "../layout/Loading";
import {Link} from "react-router-dom";

const {Column} = Table;

class NetworksList extends Component {
    state = {networks: [], loading: true};

    componentDidMount() {
        axios.get('/api/networks/').then(response => this.setState({networks: response.data._items, loading: false}));
    }

    removeNetwork = (network) => {
        axios.delete(`/api/networks/${network._id}`, {headers: {'If-Match': network._etag}}).then(() => {
            const networks = [...this.state.networks];
            const index = networks.indexOf(network);
            networks.splice(index, 1);
            this.setState({networks});
        });
    };

    render() {
        return (
            <Loading loading={this.state.loading}>
                <Table
                    dataSource={this.state.networks}
                    rowKey="_id"
                >
                    <Column
                        title="ID"
                        dataIndex="_id"
                        key="_id"
                        render={_id => <Link to={`/networks/detail/${_id}`}>{_id}</Link>}
                    />
                    <Column
                        title="Name"
                        dataIndex="name"
                        key="name"
                    />
                    <Column
                        title="Actions"
                        render={(_, network) => (
                            <Popconfirm title="Are you sure delete this network?"
                                        onConfirm={() => this.removeNetwork(network)} okText="Yes"
                                        cancelText="No">
                                <Button type="danger"><Icon type="delete"/></Button>
                            </Popconfirm>
                        )}
                    />
                </Table>
            </Loading>
        );
    }
}

export default NetworksList;
