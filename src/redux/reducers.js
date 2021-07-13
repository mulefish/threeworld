
import { ABCDocumentsReducer as abcReducer } from './../pages/ABCDocuments/redux';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    abcReducer
});
export default rootReducer;