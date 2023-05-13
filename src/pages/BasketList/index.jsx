import styles from './index.module.css'
import { useNoAuth } from '../../hooks/useNoAuth'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { fetchCurrentProduct } from '../../api/products'
import { MemoCartItem } from '../../components/CartItem'
import { cleanCart } from '../../redux/slices/cartSlice'

export const BasketList = () => {
  const { token } = useNoAuth()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { cart } = useSelector((state) => state)

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['getCartProduct', cart.length],
    queryFn: () => {
      return Promise.allSettled(
        cart.map((el) => fetchCurrentProduct(token, el.id))
      ).then((value) => value)
    },
  })

  if (cart.length === 0)
    return (
      <p className={styles.cardTitle}>
        Добавьте элементы в корзину из{' '}
        <Link to={'/'} className={styles.redColor}>
          Каталога
        </Link>
      </p>
    )
  if (isLoading) return <p>Идет загрузка...</p>
  if (isError) return <p>Произошла ошибка: {error}</p>
  if (data.err) return <p>Произошла ошибка: {data.message}</p>

  const totalAmount = cart.reduce((accumulator, el) => {
    return accumulator + (el.included ? 1 : 0)
  }, 0)
  const totalPrice = data.reduce((accumulator, cartItem) => {
    const cartElem = cart.find(
      (el) => el.included && el.id === cartItem.value._id
    )
    return (
      accumulator +
      (cartElem
        ? cartElem.count *
          cartItem.value.price *
          (1 - cartItem.value.discount / 100)
        : 0)
    )
  }, 0)
  const totalDiscount = data.reduce((accumulator, cartItem) => {
    const cartElem = cart.find(
      (el) => el.included && el.id === cartItem.value._id
    )
    return (
      accumulator +
      (cartElem
        ? (cartElem.count * cartItem.value.price * cartItem.value.discount) /
          100
        : 0)
    )
  }, 0)
  return (
    <div className={styles.dataForm}>
      <p className={styles.cardTitle}>Корзина</p>
      <div className={styles.wrapper}>
        <div className={styles.cardProductList}>
          {data.map((cartItem) => {
            return (
              <MemoCartItem
                key={cartItem.value._id}
                cartItem={cartItem.value}
              />
            )
          })}
        </div>
        <div className={styles.btnWrapper}>
          <button
            type="button"
            className={styles.cartBtn}
            onClick={() => navigate('/')}
          >
            Вернуться в каталог
          </button>
          <button
            type="button"
            className={styles.cartCln}
            onClick={() => dispatch(cleanCart())}
          >
            Очистить корзину
          </button>
          <div className={styles.summaryWrapper}>
            <p className={styles.label}>Итого:</p>
            <p className={styles.summaryCost}>
              {totalAmount} позиций: {totalPrice} руб
            </p>
            <p className={styles.summaryDiscount}>
              Общая скидка: {totalDiscount} руб
            </p>
          </div>
          <button type="button" className={styles.cartBtn}>
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  )
}
