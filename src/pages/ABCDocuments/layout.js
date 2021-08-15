
import React from 'react'

import { PropTypes } from 'prop-types';

const SearchMechanism = ({
    getABCFunc,
    abcValue,
    kittyValue,
    setKittyCat
}) => {




    function showValue() {
        getABCFunc()
    }

    function setKittyCatValue() {
        let tmp = [
            'a',
            'b',
            Math.random()
        ]
        setKittyCat(tmp)
    }
    /*
    useEffect(() => {
        (async () => {
            let tmp = [
                'a',
                'b',
                Math.random()
            ]
            alert("ABCDocument! " + tmp)
            await
                setKittyCat(tmp)
        })();
    }, [getABCFunc]);
    */

    // useEffect(() => {
    //     (async () => {

    //         await getABCFunc();
    //         console.log(
    //             JSON.stringify(abcValue, null, 20)
    //         );
    //     })();
    // }, [getABCFunc]);

    return <>
        <button onClick={showValue}>showValue</button>

        {JSON.stringify(abcValue, null, 10)}
        <br></br>
        kittyValue
        <button onClick={setKittyCatValue}>setKittyCatValue</button>
        {JSON.stringify(kittyValue, null, 10)}


    </>;
};

SearchMechanism.propTypes = {
    abcValue: PropTypes.array,
    getABCFunc: PropTypes.func,
};

export default SearchMechanism;