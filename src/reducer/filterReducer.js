

const filterReducer = (state, action) => {
  switch(action.type){
    
    case "LOAD_FILTER_PRODUCTS":
      let priceArr = action.payload.map((curElm)=> curElm.price);
      

      let maxPrice = Math.max(...priceArr)
      
      return {
        ...state,
        filter_products: [...action.payload],
        allProducts: [...action.payload],
        filters: {...state.filters, maxPrice, price: maxPrice}
      };
      
    case "SET_GRIDVIEW":
        return{
            ...state,
            grid_view: true
        };
    
    case "SET_LISTVIEW":
        return {
          ...state,
          grid_view: false
        };

    case "GET_SORT_VALUE":
      
        return {
          ...state, 
          sorting_value: action.payload,
        };
    

    case "SORTING_PRODUCTS":
      let newSortData;
      const { filter_products, sorting_value } = state;
      let tempSortProduct = [...filter_products];

      const sortingProducts = (a, b) => {
        if (sorting_value === "lowest") {
          return a.price - b.price;
        }

        if (sorting_value === "highest") {
          return b.price - a.price;
        }

        if (sorting_value === "a-z") {
          return a.name.localeCompare(b.name);
        }

        if (sorting_value === "z-a") {
          return b.name.localeCompare(a.name);
        }
      };

      newSortData = tempSortProduct.sort(sortingProducts);

      return {
        ...state,
        filter_products: newSortData,
      };

      case "UPDATE_FILTERS_VALUE":
      const { name, value } = action.payload;

      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        },
      };
      case "FILTER_PRODUCTS":
        let {allProducts} = state;
        
        let tempFilterProducts = [...allProducts];

        const {text, category, company, color, price} = state.filters;
        
        
        if(text){
          tempFilterProducts = tempFilterProducts.filter((curElm)=>{
            return curElm.name.includes(text);
          })
        }
        if(category !=='All'){
          tempFilterProducts = tempFilterProducts.filter((curElm)=>curElm.category === category)
        }
        if(company !=="All"){
          tempFilterProducts = tempFilterProducts.filter((curElm)=>curElm.company === company)
        }
        if(color !=="All"){
          tempFilterProducts = tempFilterProducts.filter((curColor)=>curColor.colors.includes(color))
        }
        if(price ===0){
          tempFilterProducts = tempFilterProducts.filter((curElm)=>curElm.price===price)
        } else{
          tempFilterProducts = tempFilterProducts.filter((curElm)=> curElm.price <=price)
        }
        return {
          ...state,
          filter_products: tempFilterProducts,
        };
        case "CLEAR_FILTERS":
          return {
            ...state,
            filters: {
              ...state.filters,
              text: "",
              category: "All",
              company: "All",
              color: "All",
              maxPrice: 0,
              price: state.filters.maxPrice,
              minPrice: state.filters.maxPrice,
            },
          };
     
    default: return state;
  }
}

export default filterReducer