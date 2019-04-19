import { createStore, compose,combineReducers,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import logger from 'redux-logger'
import { reducer as formReducer } from 'redux-form';
import reducerFunc from '../reducer/index';


const rootReducer = combineReducers({
  form: formReducer,
  reducer: reducerFunc
  });
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(promise,thunk, logger))
  );
  store.subscribe(() => store.getState())
    


export default store;
