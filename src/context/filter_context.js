import { useContext } from "react";
import { useEffect } from "react";
import { useReducer } from "react";
import { createContext } from "react";
import { useProductContext } from "./productcontex";
import reducer from '../reducer/filterReducer'

const FilterContext = createContext();
const initialState = {
    filter_products: [],
    allProducts: [],
    grid_view: true,
    sorting_value: "lowest",
    filters: {
        text: "",
        category: "All",
        company: "All",
        color: "All",
        maxPrice: 0,
        price: 0,
        minPrice: 0,
    },
}

export const FilterContextProvider = ({children})=>{
    const {products} = useProductContext();
    
    const [state, dispatch] = useReducer(reducer, initialState);
    

    // to set grid view
    const setGridView =()=>{
        dispatch({type: "SET_GRIDVIEW"})
    }

    // to set list view
    const setListView =()=>{
        dispatch({type: "SET_LISTVIEW"})
    }

    // get sort value
    const sorting =(event)=>{
        let userValue = event.target.value;
        dispatch({type: "GET_SORT_VALUE", payload: userValue});
    }

 // update the filter values
 const updateFilterValue = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    return dispatch({ type: "UPDATE_FILTERS_VALUE", payload: { name, value } });
  };

    // to sort the product
    useEffect(()=>{
     dispatch({type: "FILTER_PRODUCTS"});
    dispatch({ type: "SORTING_PRODUCTS", payload: products})
    
    },[ products, state.sorting_value, state.filters])

    const clearFilter =()=>{
        dispatch({type: "CLEAR_FILTERS"});
    };

    useEffect(() => {
        
      dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products})
    }, [products]);

    
    return (
        <FilterContext.Provider
         value={{...state, setGridView, setListView, sorting, updateFilterValue, clearFilter}}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilterContext =()=>{
    return useContext(FilterContext);
}