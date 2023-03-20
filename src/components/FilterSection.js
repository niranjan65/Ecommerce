import React from "react";
import styled from "styled-components";
import {FaCheck} from 'react-icons/fa'
import { useFilterContext } from "../context/filter_context";
import FormatPrice from "../helpers/FormatPrice";
import { Button } from "../styles/Button";

const FilterSection = () => {
  const {
    filters: { text, category, color, price, maxPrice, minPrice  },
    allProducts,
    updateFilterValue,
    clearFilter
  } = useFilterContext();

  // To GET THE UNIQUE DATA FOR EACH FIELD
  const getUniqueData = (data, property) => {
    let newVal = data.map((curelm) => {
      return curelm[property];
    });
    if(property === 'colors'){
      return ["All", ...new Set([].concat(...newVal))]
    }else{
      newVal = ["All", ...new Set(newVal)];
    return newVal;
    }
  };

  const categoryOnlyData = getUniqueData(allProducts, "category");
  const companyOnlyData = getUniqueData(allProducts, "company");
  const colorsOnlyData = getUniqueData(allProducts, "colors");
  console.log(colorsOnlyData);

  return (
    <Wrapper>
      <div className="filter-search">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="text"
            placeholder="SEARCH"
            value={text}
            onChange={updateFilterValue}
          />
        </form>
      </div>
      <div className="filter-category">
        <h3>Category</h3>
        <div>
          {categoryOnlyData.map((elm, index) => {
            return (
              <button
                key={index}
                type="button"
                name="category"
                className={elm === category ? "active" : ""}
                value={elm}
                onClick={updateFilterValue}
              >
                {elm}
              </button>
            );
          })}
        </div>
      </div>
      <div className="filter-company">
      <form action="#">
        <select name="company"
         id="company"
         className="filter-company--select"
         onClick={updateFilterValue}
         >
          {
            companyOnlyData.map((curElm, index)=>{
              return (<option key={index} value={curElm} name="company">
                {curElm}
              </option>)
            })
          }

         </select>
      </form>
      </div>
      <div className="filter-colors colors">
        <h3>Colors</h3>
        {
          colorsOnlyData.map((curColor, index)=>{
            if(curColor === "All"){
              return <button key={index}
              type='button'
              className='color-all--style'
              style={{backgroundColor: curColor}}
              name='color'
              value={curColor}
              onClick={updateFilterValue}
              >
                All
              </button>
            }
            return (
              <button key={index}
              type='button'
              className={color ===curColor ? 'btnStyle active' : 'btnStyle'}
              style={{backgroundColor: curColor}}
              name='color'
              value={curColor}
              onClick={updateFilterValue}
              >
                {curColor === color ? <FaCheck className="checkStyle"/> : null}
              </button>
            )
          })
        }
      </div>
      <div className="filter_price">
        <h3>Price Range</h3>
        <p>
          <FormatPrice price={price}/>
        </p>
        <input type="range"
        name="price"
        min={minPrice}
        max={maxPrice}
        value={price}
        onChange={updateFilterValue}
         />
      </div>
      <div className="filter-clear">
        <Button className="btn" onClick={clearFilter}>Clear Filters</Button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  h3 {
    padding: 2rem 0;
    font-size: bold;
  }
  .filter-search {
    input {
      padding: 0.6rem 1rem;
      width: 80%;
    }
  }
  .filter-category {
    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.4rem;
      button {
        border: none;
        background-color: ${({ theme }) => theme.colors.white};
        text-transform: capitalize;
        cursor: pointer;
        &:hover {
          color: ${({ theme }) => theme.colors.btn};
        }
      }
      .active {
        border-bottom: 1px solid #000;
        color: ${({ theme }) => theme.colors.btn};
      }
    }
  }
  .filter-company--select {
    padding: 0.3rem 1.2rem;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.text};
    text-transform: capitalize;
  }
  .filter-color-style {
    display: flex;
    justify-content: center;
  }
  .color-all--style {
    background-color: transparent;
    text-transform: capitalize;
    border: none;
    cursor: pointer;
  }
  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;
    &:hover {
      opacity: 1;
    }
  }
  .active {
    opacity: 1;
  }
  .checkStyle {
    font-size: 1rem;
    color: #fff;
  }
  .filter_price {
    input {
      margin: 0.5rem 0 1rem 0;
      padding: 0;
      box-shadow: none;
      cursor: pointer;
    }
  }
  .filter-shipping {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .filter-clear .btn {
    background-color: #ec7063;
    color: #000;
  }
`;

export default FilterSection;
