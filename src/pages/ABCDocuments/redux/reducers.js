import TYPES from './types';

const initialState = {
    abcValue: [],
};

export default function classifyDocumentsReducer(state = initialState, action) {
    switch (action.type) {
        case TYPES.ABC_SUCCESS:
            return {
                ...state,
                abcValue: action.abcDoc,
                status: null,
                error: null,
            };
        case TYPES.ABC_ERROR:
            return {
                ...state,
                error: action.error,
                status: null,
            };
        case TYPES.KITTY_SUCCESS:
            return {
                ...state,
                kittyValue: action.kittycats,
                error: null,
                status: null,
            };

        default:
            return state;
    }
}