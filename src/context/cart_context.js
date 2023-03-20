import { useEffect, useReducer } from "react";
import { useContext } from "react";
import { createContext } from "react";
import reducer from '../reducer/cartReducer'

const CartContext = createContext();

const getLocalCartData =()=>{
    let localCartData = localStorage.getItem("myCart")
    console.log(localCartData);
    if(localCartData === [] || localCartData === null){
        return []
    } else{
        return JSON.parse(localCartData)
    }
}

const CartProvider =({children})=>{
    const initialState = {
        // cart: [],
        cart: getLocalCartData(),
        total_item: "",
        total_amount: "",
        shipping_fee: 5000,
    }
    const [state, dispatch] = useReducer(reducer, initialState);

    const addToCart=(id, color, amount, product)=>{
        dispatch({type: "ADD_TO_CART", payload: {id, color, amount, product}})
    }
    
    const setDecrease = (id) => {
        dispatch({ type: "SET_DECREMENT", payload: id });
      };
    
      const setIncrement = (id) => {
        dispatch({ type: "SET_INCREMENT", payload: id });
      };
    
      // to remove the individual item from cart
      const removeItem = (id) => {
        dispatch({ type: "REMOVE_ITEM", payload: id });
      };
    
      // to clear the cart
      const clearCart = () => {
        dispatch({ type: "CLEAR_CART" });
      };

      useEffect(() => {
        dispatch({type: "CART_TOTAL_ITEM"});
        dispatch({type: "GET_CART_DATA"});
        localStorage.setItem("myCart", JSON.stringify(state.cart))
      }, [state.cart])
      

    return (
        <CartContext.Provider value={{...state, addToCart, clearCart, setDecrease, removeItem, setIncrement}}>
        {children}
    </CartContext.Provider>
    )
}

const useCartContext =()=>{
    return useContext(CartContext);
}

export {CartProvider, useCartContext}