import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import {Table, Popconfirm, Button, Icon} from "antd";
import Loading from "../Loading";

const {Column} = Table;

class CollectionsList extends Component {
    state = {collections: [], loading: true};

    componentDidMount() {
        axios.get('/api/collections/').then(response => this.setState({
            collections: response.data._items,
            loading: false
        }))
    }

    removeCollection = (collection) => {
        axios.delete(`/api/collections/${collection._id}`, {headers: {'If-Match': collection._etag}}).then(() => {
            const collections = [...this.state.collections];
            const index = collections.indexOf(collection);
            collections.splice(index, 1);
            this.setState({collections});
        });
    };

    render() {
        const {loading, collections} = this.state;

        return (
            <Loading loading={loading}>
                <Table
                    rowKey="_id"
                    dataSource={collections}
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
                    <Column
                        title="Actions"
                        key="actions"
                        render={(_id, collection) => (
                            <Popconfirm title="Are you sure delete this collection?"
                                        onConfirm={() => this.removeCollection(collection)} okText="Yes"
                                        cancelText="No">
                                <Button type="danger"><Icon type="delete"/></Button>
                            </Popconfirm>
                        )}
                    />
                </Table>
            </Loading>)
    }
}

export default CollectionsList;
