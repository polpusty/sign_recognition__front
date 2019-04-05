import React, {Component} from 'react';
import {Icon, Layout, Menu} from "antd";
import {Link} from "react-router-dom";

import logo from '../logo.png';
import logo_short from '../logo-short.png';

const {Sider} = Layout;

class SiderMenu extends Component {
    state = {collapsed: false};

    onCollapse = (collapsed) => this.setState({collapsed});

    render() {
        return (
            <Sider
                collapsible
                collapsed={this.state.collapsed}
                onCollapse={this.onCollapse}
            >
                <Link to='/'>
                    <div className="logo">
                        <img
                            src={this.state.collapsed ? logo_short : logo}
                            height="100%"
                            width="100%"
                            alt=""/>
                    </div>
                </Link>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                >
                    <Menu.SubMenu
                        key="1"
                        title={<span><Icon type="folder"/><span>Collections</span></span>}
                    >
                        <Menu.Item key="1.1">
                            <Link to="/collections">
                                <span><Icon type="bars"/>List</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="1.2">
                            <Link to="/collections/add">
                                <span><Icon type="plus"/>Add</span>
                            </Link>
                        </Menu.Item>
                    </Menu.SubMenu>
                    <Menu.SubMenu
                        key="2"
                        title={<span><Icon type="fork"/>Neural networks</span>}
                    >
                        <Menu.Item key="2.1">
                            <Link to="/networks">
                                <span><Icon type="bars"/>List</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2.2">
                            <Link to="/networks/add">
                                <span><Icon type="plus"/>Add</span>
                            </Link>
                        </Menu.Item>
                    </Menu.SubMenu>
                </Menu>
            </Sider>
        );
    }
}

export default SiderMenu;
