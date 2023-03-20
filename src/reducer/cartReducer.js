

const cartReducer = (state, action) => {
    if(action.type === "ADD_TO_CART"){
        let {id, color, amount, product} = action.payload;
        
        let existingProduct = state.cart.find((curItem)=>curItem.id ===id+color);
        console.log("Existing product", existingProduct)
        let cartProduct;

        if(existingProduct){
            let updatedProduct = state.cart.map((curElm)=>{
                if(curElm.id ===id + color){
                    let newAmount = curElm.amount + amount;

                if(newAmount>curElm.max){
                    newAmount = curElm.max;
                }
                    return{
                        ...curElm,
                        amount: newAmount,
                    }
                } else {
                    return curElm;
                }
                
            });
            return {
                ...state,
                cart: updatedProduct,
            }

        } else {
            cartProduct ={
                amount,
                color,
                id: id+color,
                image: product.images[0].url,
                max: product.stock,
                name: product.name,
                price: product.price,
            };
    
            return {
                ...state,
                cart: [...state.cart, cartProduct],
            };
        }
    }
    if(action.type === "SET_DECREMENT"){
        let updatedCart = state.cart.map((curElm)=>{
            if(curElm.id ===action.payload){
                let decrementAmount = curElm.amount-1;

                if(decrementAmount <= 0){
                    decrementAmount=1;
                }

                return{
                    ...curElm,
                    amount: decrementAmount
                }
            } else {
                return curElm
            }
        });
        return {...state, cart: updatedCart}
    }
    if(action.type === "SET_INCREMENT"){
        let updatedCart = state.cart.map((curElm)=>{
            if(curElm.id ===action.payload){
                let incrementAmount = curElm.amount + 1;

                if(incrementAmount>=curElm.max){
                    incrementAmount=curElm.max;
                }
              
                return{
                    ...curElm,
                    amount: incrementAmount
                }
            } else {
                return curElm
            }
        });
        return {...state, cart: updatedCart}
    }
    if(action.type==="REMOVE_ITEM"){
        let updatedCart = state.cart.filter((curItem)=>curItem.id!==action.payload)
        return{
            ...state,
            cart: updatedCart,
        }
    }
    if(action.type==="CLEAR_CART"){
        return {
            ...state,
            cart: [],
        }
    }
    if(action.type === "CART_TOTAL_ITEM"){
        let updatedItem = state.cart.reduce((initialVal, curElm)=>{
            let {amount} = curElm;
            initialVal = initialVal + amount;

            return initialVal
        },0);
        return{
            ...state,
            total_item: updatedItem,
        }
    }
    if(action.type === "GET_CART_DATA"){
        let cart_price = state.cart.reduce((initialVal, curElm)=>{
            let {price, amount} = curElm;
            initialVal = initialVal + (price*amount);
            return initialVal
        },0)
        return{
            ...state,
            total_amount: cart_price,
        }
    }
  return state
}

export default cartReducer