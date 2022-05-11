import {createStore, combineReducers} from 'redux';
import counter from '../reducers/counterReducer';
import thunk from 'redux-thunk';
import {applyMiddleware} from 'redux';

const rootReducer = combineReducers({
  counter,
});

// const configureStore = () => {
//   return createStore(rootReducer);
// };
const middleware = applyMiddleware(thunk);
const store = createStore(rootReducer, middleware);

// export default configureStore;
export default store;
