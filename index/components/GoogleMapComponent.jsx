import React from 'react';

import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';
import {googleApiKey} from '../static.jsx';

export default class GoogleMapComponent extends React.Component {

    /**
     * render
     * @returns {XML}
     */
    render() {
        return (
            <Gmaps
                className={'google-maps'}
                lat={this.props.lat}
                lng={this.props.lng}
                zoom={3}
                loadingMessage={'Google Api not providing info for this localisation so we switching to standard map'}
                params={{v: '3.exp', key: googleApiKey}}
                >
                <Marker
                  lat={this.props.lat}
                  lng={this.props.lng}
                  draggable={true} />
                <InfoWindow
                  lat={this.props.lat}
                  lng={this.props.lng}
                  content={'Google Api not providing info for this localisation so we switching to standard map'}/>
                <Circle
                  lat={this.props.lat}
                  lng={this.props.lng}
                  radius={500} />
            </Gmaps>
        );
    }
}

GoogleMapComponent.propTypes = {
    lat: React.PropTypes.number.isRequired,
    lng: React.PropTypes.number.isRequired
};
