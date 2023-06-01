import { useDispatch } from 'react-redux'
import styles from './index.module.css'
import { deleteCartItem } from '../../redux/slices/cartSlice'
import { Counter } from '../Counter'
import { CartItemBody } from '../CartItemBody'
import React from 'react'

export const CartItem = ({ cartItem }) => {
  const dispatch = useDispatch()

  return (
    <div className={styles.cardProduct}>
      <CartItemBody cartItem={cartItem} />
      <div className={styles.binBox}>
        <Counter cartItem={cartItem} />
        <button
          type="button"
          data-action="edit"
          className={styles.addToBin}
          onClick={() => dispatch(deleteCartItem(cartItem._id))}
        >
          Удалить из корзины
        </button>
      </div>
    </div>
  )
}
