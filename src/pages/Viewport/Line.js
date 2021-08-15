import React from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/Home/index.js'
import ABCDocuments from './pages/ABCDocuments/index.js'
import Viewport from './pages/Viewport/index.js'


const Line = () => {



    const [start, setStart] = useState(defaultStart)
    const [end, setEnd] = useState(defaultEnd)
    const vertices = useMemo(() => [start, end].map((v) => new THREE.Vector3(...v)), [start, end])
    const update = useCallback((self) => {
        self.verticesNeedUpdate = true
        self.computeBoundingSphere()
    }, [])
    return (
        <Fragment>
            HELLO

        </Fragment>
    )

}
export default Line;
