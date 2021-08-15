import { useHistory } from 'react-router-dom';
import React from 'react'



const Home = () => {

    const history = useHistory()

    function gotoABCDocument() {
        history.push('/ABCDocuments')
    }

    function gotoViewport() {
        history.push('/Viewport')
    }

    const style_big2 = {
        margin: 10, fontSize: '180px', color: "#000"
    }

    const style_mid = {
        paddingTop: 20, fontSize: '20px', color: "#00ff00", paddingBottom: 20
    }

    return (
        <>
            <center>
                <table border='1'>
                    <tbody>
                        <tr>


                            <td valign='top'>
                                <button onClick={gotoABCDocument}>
                                    <span style={style_big2} role="img" aria-label="ABCDoc">
                                        🚀
                                        {/* 試 */}
                                    </span>
                                    <hr></hr>
                                    <div style={style_mid}>
                                        ABCDoc
                                    </div>
                                </button>
                            </td>

                            <td valign='top'>
                                <button onClick={gotoViewport}>
                                    <span style={style_big2} role="img" aria-label="Viewport">

                                        🐙
                                    </span>
                                    <hr></hr>
                                    <div style={style_mid}>
                                        gotoViewport
                                    </div>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <a href="https://www.public.asu.edu/~rjansen/glyph_encoding.html">https://www.public.asu.edu/~rjansen/glyph_encoding.html</a>
            </center>
        </>
    )

}

export default Home