import React from 'react'
import { NavLink } from 'react-router-dom';
import FormatPrice from '../helpers/FormatPrice';
import styled from 'styled-components';

const Product = (curElem) => {
    const {id, price, name, image, category} = curElem;
  return (
        <Wrapper>
          <NavLink to={`/singleproduct/${id}`}>
      <div className="card">
        <figure>
            <img src={image} alt={name}/>
            <figcaption className='caption'>{category}</figcaption>
        </figure>

        <footer >
          <h3>{name}</h3>
          <p className="card-data--price">{<FormatPrice price={price} />}</p>
        </footer>
    </div>
        
    </NavLink>
        </Wrapper>
  )
}
const Wrapper = styled.article`
  .container {
    position: relative;
    background: var(--clr-black);
    border-radius: var(--radius);
  }
  img {
    width: 100%;
    display: block;
    object-fit: cover;
    border-radius: var(--radius);
    transition: var(--transition);
  }
  .link {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--clr-primary-5);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    transition: var(--transition);
    opacity: 0;
    cursor: pointer;
    svg {
      font-size: 1.25rem;
      color: var(--clr-white);
    }
  }
  .container:hover img {
    opacity: 0.5;
  }
  .container:hover .link {
    opacity: 1;
  }
  footer {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 2rem;
    margin-right: 2rem;

  }
  footer h3,
  footer p {
    margin-bottom: 1rem ;
    font-weight: 400;
  }

  footer p {
    color: var(--clr-primary-5);
    letter-spacing: var(--spacing);
  }
`

export default Product