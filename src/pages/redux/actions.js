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

// const abc_Failbot = () => ({
//     type: TYPES.ABC_ERROR,
//     error: 'It failed.',
// });

// export default {
//     ABC_SUCCESS,
//     KITTY_SUCCESS
// };
const exportedObject = {
    ABC_SUCCESS,
    KITTY_SUCCESS,
};
// export default {
//     getABCFunc,
//     setKittyCat
// };
export default exportedObject;