import { connect } from 'react-redux'
import Viewport from './layout'
import { ABCDocumentsThunks } from '../ABCDocuments/redux';

const mapStateToProps = ({ abcReducer }) => ({
    abcValue: abcReducer.abcValue,
    kittyValue: abcReducer.kittyValue
});

const mapDispatchToProps = {
    getABCFunc:
        ABCDocumentsThunks.getABCFunc,
    setKittyCat:
        ABCDocumentsThunks.setKittyCat

};

export default connect(mapStateToProps, mapDispatchToProps)(Viewport)

