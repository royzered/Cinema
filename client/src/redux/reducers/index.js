import moviesReducer from "./moviesReducer";
import subsReducer from "./subsReducer";
import { combineReducers } from "redux";
const appReducers = combineReducers({ subs : subsReducer,
                                        movies : moviesReducer});
export default appReducers;