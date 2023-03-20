import { createContext, useContext, useEffect } from "react";
import axios from "axios";
import { useReducer } from "react";
import reducer from '../reducer/productReducer';


const AppContext = createContext();

// const API = "https://api.pujakaitem.com/api/products";
const API = "https://course-api.com/react-store-products";

const initialState = {
  isLoading: false,
  isError: false,
  products: [],
  featureProducts: [],
  isSingleLoading: false,
  singleProduct: {},
}


const AppProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState);
  const getProducts = async (url) => {
      dispatch( {type: "SET_LOADING"});
    try {
      const res = await axios.get(url);
      const products = await res.data;
      dispatch({type: "SET_API_DATA", payload: products});
    } catch (error) {
      dispatch({type: "SET_ERROR"});
    }
  };

  const getSingleProduct = async (url) =>{
    console.log("I am getSingle product")
    dispatch({type: "SET_SINGLE_LOADING"});
    try {
      const res = await axios.get(url);
      const products = await res.data;
      dispatch({type: "SET_SINGLE_PRODUCT", payload: products })
    } catch (error) {
      dispatch({set : "SINGLE_ERROR"});
    }
  }

  useEffect(() => {
    getProducts(API);
  }, []);

  return (
    <AppContext.Provider value={{ ...state, getSingleProduct, getProducts }}>{children}</AppContext.Provider>
  );
};

// custom hooks
const useProductContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext, useProductContext };
