import styles from './index.module.css'
import { useNoAuth } from '../../hooks/useNoAuth'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { fetchCartProducts } from '../../api/products'
import { CartItem } from '../../components/CartItem'
import { cleanCart, deleteCartItem } from '../../redux/slices/cartSlice'

export const BasketList = () => {
  const { token } = useNoAuth()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ['getCartProduct', cart.length],
    queryFn: async () => {
      const responce = await fetchCartProducts(token, cart)
      return responce
        .filter((el) => {
          // проверка и удаление в случае, если товара с таким id не существует (был удален)
          if (el.value.data?.err?.statusCode === 404) {
            dispatch(deleteCartItem(el.value.id))
          }

          // фильтруем rejected статусы и fullfiled, но с ошибкой
          return el.status !== 'rejected' && !el.value.data.err
        })
        .map((el) => el.value.data)
    },
    initialData: [],
    enabled: !!cart.length,
  })

  console.log(data)
  if (isLoading) return <p>Идет загрузка...</p>
  if (isError) return <p>Произошла ошибка: {error}</p>
  if (data.err) return <p>Произошла ошибка: {data.message}</p>

  if (cart.length === 0)
    return (
      <p className={styles.cardTitle}>
        Добавьте элементы в корзину из{' '}
        <Link to={'/'} className={styles.redColor}>
          Каталога
        </Link>
      </p>
    )

  const totalAmount = cart.reduce((accumulator, el) => {
    return accumulator + (el.included ? 1 : 0)
  }, 0)
  const totalPrice = data.reduce((accumulator, cartItem) => {
    const cartElem = cart.find((el) => el.included && el.id === cartItem._id)
    return (
      accumulator +
      (cartElem ? cartElem.count * cartItem.price * (1 - cartItem.discount / 100) : 0)
    )
  }, 0)
  const totalDiscount = data.reduce((accumulator, cartItem) => {
    const cartElem = cart.find((el) => el.included && el.id === cartItem._id)
    return (
      accumulator +
      (cartElem ? (cartElem.count * cartItem.price * cartItem.discount) / 100 : 0)
    )
  }, 0)
  return (
    !isFetching &&
    data && (
      <div className={styles.dataForm}>
        <p className={styles.cardTitle}>Корзина</p>
        <div className={styles.wrapper}>
          <div className={styles.cardProductList}>
            {data.map((cartItem) => {
              return <CartItem key={cartItem._id} cartItem={cartItem} />
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
              <p className={styles.summaryDiscount}>Общая скидка: {totalDiscount} руб</p>
            </div>
            <button type="button" className={styles.cartBtn}>
              Оформить заказ
            </button>
          </div>
        </div>
      </div>
    )
  )
}
