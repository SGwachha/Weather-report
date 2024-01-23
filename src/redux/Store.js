import { createReduxStore, register } from "@wordpress/data";

const DEFAULT_STATE = {
    location: '',
};

const store = createReduxStore('Weather-report', {
    reducer(state = DEFAULT_STATE, action) {
        switch (action.type) {
            case 'SET_LOCATION':
                return {
                    ...state,
                    location: action.payload,
                };
            default:
                return state;
        }
    },

    actions: {
        setLocation(location) {
            return {
                type: "SET_LOCATION",
                payload: location,
            };
        },
    },
    
  selectors: {
        getLocation(state) {
        const { location } = state;
        return location;
        },
    }
});

register(store);