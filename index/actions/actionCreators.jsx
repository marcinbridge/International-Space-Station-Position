import * as WebAPI from './WebAPI.jsx';

const fetchPosition = () => ({
    type: 'FETCH_POSITION'
});

const receivePosition = position => ({
    type: 'RECEIVE_POSITION',
    position
});

export const setInitialState = () => ({
    type: 'SET_INITIAL_STATE'
});

export const pollPositionThunk = () => (dispatch, getState) => {
    const f = () => {
        if (!getState().isFetching) {
            dispatch(fetchPosition());
            WebAPI.getPosition((error, response) => {
                if (error) {
                    dispatch(receivePosition([]));
                } else {
                    self.lat = response.body.latitude;
                    self.lng = response.body.longitude;
                    WebAPI.translateToAddress((error, response) => {
                        dispatch(receivePosition(error ? [] : (response.body.status === "OK" ?
                            response.body : {status: "NOT PROVIDED", lat: self.lat, lng: self.lng})));
                    }, self.lat, self.lng);
                }
            });
        }
    };
    setInterval(f, 20000);
    f();
};
