import React, {Component} from 'react';
import {Route} from "react-router-dom";
import CollectionsList from './CollectionsList';
import CollectionsAdd from "./CollectionsAdd";
import CollectionsDetail from "./CollectionsDetail";


class Collections extends Component {
    render() {
        return (
            <div>
                <Route path={`${this.props.match.path}/add`} component={CollectionsAdd}/>
                <Route path={`${this.props.match.path}/detail/:id`} component={CollectionsDetail}/>
                <Route path={`${this.props.match.path}`} exact component={CollectionsList}/>
            </div>
        )
    }
}

export default Collections;
