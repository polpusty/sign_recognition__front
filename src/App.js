import React, { Component } from 'react';
import './App.css';
import logo from './logo.png';
import logo_short from './logo-short.png';
import { Layout, Menu, Icon } from 'antd';

const { Header, Sider, Content } = Layout;

class App extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
        <Layout>
          <Sider
              trigger={null}
              collapsible
              collapsed={this.state.collapsed}
          >
            <div className="logo"><img src={this.state.collapsed ? logo_short : logo} height="100%" width="100%" alt=""/></div>
              <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Icon type="folder" />
                <span>Collections</span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="fork" />
                <span>Neural networks</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Icon
                  className="trigger"
                  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.toggle}
              />
            </Header>
            <Content style={{
              margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
            }}
            >
              Content
            </Content>
          </Layout>
        </Layout>
    );
  }
}

export default App;
