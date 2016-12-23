import React from 'react';
import {connect} from 'react-redux';
import Panel from 'react-bootstrap/lib/Panel';

import PositionList from './PositionList.jsx';
import * as actionCreators from '../actions/actionCreators.jsx';

export class Main extends React.Component {

    /**
     * render
     * @returns {XML}
     */
    render() {
        return (this.props.position) ? (
            <div className="container container-table">
                <div className="row vertical-center-row">
                    <div className="text-center">
                        <h1>{'International Space Station(ISS)'}</h1>
                        <Panel header="Currently ISS is over:">
                            <PositionList position={this.props.position} />
                        </Panel>
                    </div>
                </div>
            </div>
        ) : null;
    }

}

Main.propTypes = {
    isFetching: React.PropTypes.bool,
    position: React.PropTypes.any
};

Main.defaultProps = {
    isFetching: false
};

export const MainComponent = connect(state => ({
    position: state.position,
    isFetching: state.isFetching
}), actionCreators)(Main);
