import { useDispatch, useSelector } from 'react-redux'
import styles from './index.module.css'
import {
  changeCartItemIncluded,
  decrementCartItem,
  incrementCartItem,
} from '../../redux/slices/cartSlice'

export const Counter = ({ cartItem }) => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)

  const cartReduxItem = cart.find((el) => el.id === cartItem._id)

  return (
    cartReduxItem && (
      <div className={styles.compWrapper}>
        <input
          className={styles.checkInclude}
          type="checkbox"
          name=""
          id=""
          checked={cartReduxItem.included}
          onChange={() => dispatch(changeCartItemIncluded(cartItem._id))}
        />
        <span className={styles.countWrapper}>
          <button
            className={styles.countBtn}
            onClick={() => dispatch(decrementCartItem(cartItem._id))}
            disabled={cartReduxItem.count === 1}
          >
            -
          </button>
          <p className={styles.countValue}>{cartReduxItem.count}</p>
          <button
            className={styles.countBtn}
            onClick={() => dispatch(incrementCartItem(cartItem._id))}
            disabled={cartReduxItem.count >= cartItem.stock}
          >
            +
          </button>
        </span>
      </div>
    )
  )
}
