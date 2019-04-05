import React, {Component} from 'react';
import {Row, Spin} from "antd";

class Loading extends Component {
    render() {
        const {children, loading} = this.props;
        return (
            <div>
                {loading ?
                    <Row
                        type="flex"
                        justify="space-around"
                        align="middle"
                    >
                        <Spin/>
                    </Row>
                    :
                    children
                }
            </div>
        )
    }
}

export default Loading;
