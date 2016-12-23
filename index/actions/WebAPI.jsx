import request from 'superagent';
import {googleApiKey} from '../static.jsx';

/**
 * gets current possition from the web API
 * @param {function} cb
 */
export function getPosition(cb) {
    request.get('https://api.wheretheiss.at/v1/satellites/25544')
        .end(cb);
}
export function translateToAddress(cb, lat, lng) {
    request.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}` +
        `&key=${googleApiKey}`)
        .end(cb);
}
