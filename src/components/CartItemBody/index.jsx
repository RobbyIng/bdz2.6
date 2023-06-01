import { useNavigate } from 'react-router-dom'
import styles from './index.module.css'
import React from 'react'

export const CartItemBody = ({ cartItem }) => {
  const navigate = useNavigate()
  return (
    <div className={styles.cardMain}>
      <div className={styles.cardImageBox}>
        <img
          src={cartItem.pictures}
          className={styles.imgCardProduct}
          alt="Изображение корма для собак"
          onClick={() => navigate(`/products/${cartItem._id}`)}
        />
      </div>
      <div className={styles.cardBody}>
        <p
          className={styles.cardTitle}
          onClick={() => navigate(`/products/${cartItem._id}`)}
        >
          {cartItem.name}
        </p>
        <p className={styles.cardPrice}>
          Цена за единицу товара: {cartItem.price} рублей
        </p>
        {cartItem.discount ? <p>Скидка:{cartItem.discount}</p> : null}
        <p className={styles.cardAmount}>
          Доступно для заказа:{cartItem.stock} шт
        </p>
      </div>
    </div>
  )
}

// export const MemoCartItemBody = React.memo(CartItemBody)
