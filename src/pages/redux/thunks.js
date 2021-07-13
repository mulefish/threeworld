import actions from './actions';

const getABCFunc = () => async (dispatch) => {
    let dummy = [
        { r: Math.random() }
    ]
    dispatch(actions.ABC_SUCCESS(dummy));
};

const setKittyCat = (kittycats = []) => async (dispatch) => {
    dispatch(actions.KITTY_SUCCESS(kittycats));
};

const exportedObject = {
    getABCFunc,
    setKittyCat,
};
// export default {
//     getABCFunc,
//     setKittyCat
// };
export default exportedObject;