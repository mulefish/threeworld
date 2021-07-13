import TYPES from './types';

function ABC_SUCCESS(abcDoc) {
    return {
        type: TYPES.ABC_SUCCESS,
        abcDoc
    }
}
function KITTY_SUCCESS(kittycats) {
    return {
        type: TYPES.KITTY_SUCCESS,
        kittycats
    }
}

export default {
    ABC_SUCCESS,
    KITTY_SUCCESS
};