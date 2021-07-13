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


export default {
    getABCFunc,
    setKittyCat
};