import React from 'react';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import GoogleMapComponent from './GoogleMapComponent.jsx';

export default class PositionList extends React.Component {

    /**
     * render
     * @returns {XML}
     */
    render() {
        let content;
        if (this.props.position.status === "OK") {
            content = this.props.position.results[0].formatted_address;
        } else {
            content = <GoogleMapComponent lat = {this.props.position.lat} lng = {this.props.position.lng} />
        }
        return (
            <ListGroup>
                <ListGroupItem href="#">{content}</ListGroupItem>
            </ListGroup>
        );
    }
}

PositionList.propTypes = {
    position: React.PropTypes.object.isRequired
};
