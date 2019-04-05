import React, {Component} from 'react';
import './App.css';
import {Layout} from 'antd';
import {BrowserRouter as Router, Route} from "react-router-dom";

import SiderMenu from './layout/SiderMenu';
import Collections from "./collections/Collections";
import Networks from "./networks/Networks";
import NetworksPrediction from "./networks_prediction/NetworksPrediction";

const {Content} = Layout;

class App extends Component {
    render() {
        return (
            <Router>
                <Layout>
                    <SiderMenu/>
                    <Layout style={{minHeight: '100vh'}}>
                        <Content style={{margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280}}>
                            <Route path="/" exact component={NetworksPrediction}/>
                            <Route path="/collections" component={Collections}/>
                            <Route path="/networks" component={Networks}/>
                        </Content>
                    </Layout>
                </Layout>
            </Router>
        );
    }
}

export default App;
