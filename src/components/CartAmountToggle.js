import React from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'

const CartAmountToggle = ({amount, setIncrease, setDecrease}) => {
  return (
    
        <div className="cart-button">
            <div className="amount-toggle">
                <button onClick={()=>setDecrease()}>
                    <FaMinus/>
                </button>
              <p className='amout-style'>{amount}</p>
                <button onClick={()=>setIncrease()}>
                    <FaPlus/>
                </button>

            </div>
        </div>
   
  )
}

export default CartAmountToggle