import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import NetworksAdd from "./NetworksAdd";
import NetworksList from "./NetworksList";
import NetworksDetail from "./NetworksDetail";

class Networks extends Component {
    render() {
        return (
            <div>
                <Route path={`${this.props.match.path}/add`} component={NetworksAdd}/>
                <Route path={`${this.props.match.path}/detail/:id`} component={NetworksDetail}/>
                <Route path={`${this.props.match.path}`} exact component={NetworksList}/>
            </div>
        );
    }
}

export default Networks;
