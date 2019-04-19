import { SAVE_DATA, GET_DATA } from "../constant/index";

var initialState = {
  totalData: []
};


var reducerFunc = (state = initialState, action) => {
      
  const { type, data } = action;
  
  switch (type) {
  
    case SAVE_DATA:
      return { ...state , totalData: data};

    case GET_DATA:
    return {...state, totalData: data };

    default:
      return { ...state };
  
  }
};

export default reducerFunc;
