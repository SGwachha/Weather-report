import { createReduxStore, register } from "@wordpress/data";

const DEFAULT_STATE = {
    location: 'hi',
};

const actions = {
    setLocation(location) {
        return {
            type: "Set_Location",
            location,
        };
    },
};

const store = createReduxStore('Weather-report', {
    reducer(state = DEFAULT_STATE, action) {
        switch (action.type) {
            case 'Set_Location':
                return {
                    ...state,
                    location: action.location,
                };
            default:
                return state;
        }
    },
    actions,
    selectors: {
        getLocation(state) {
            return state.location;
        },
    },
});

register(store);