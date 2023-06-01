import styles from './index.module.css'
import { useNoAuth } from '../../hooks/useNoAuth'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchCurrentProduct } from '../../api/products'
import { CartItemBody } from '../../components/CartItemBody'
import { FavorButton } from '../../components/FavorButton'

export const LikedList = () => {
  const { token } = useNoAuth()
  const { favorites } = useSelector((state) => state)

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['getFavorProduct', favorites],
    queryFn: () => {
      return Promise.allSettled(
        favorites.map((el) => fetchCurrentProduct(token, el))
      ).then((value) => value)
    },
  })
  if (isLoading) return <p>Идет загрузка...</p>
  if (isError) return <p>Произошла ошибка: {error}</p>
  if (data.err) return <p>Произошла ошибка: {data.message}</p>

  if (favorites.length === 0)
    return (
      <p className={styles.cardTitle}>
        В списке пока нет ни одного товара {'  '}
        <Link to={'/'} className={styles.redColor}>
          Перейти в каталог
        </Link>
      </p>
    )
  return (
    <div className={styles.productLikedList}>
      <h1 className={styles.title}>Избранные товары</h1>
      <div className={styles.productList}>
        {data.map((productFavorItem) => {
          return productFavorItem.value ? (
            <div key={productFavorItem.value._id} className={styles.wrapper}>
              <div className={styles.itemBody}>
                <CartItemBody cartItem={productFavorItem.value} />
              </div>
              <div className={styles.favorButtonContainer}>
                <FavorButton productItem={productFavorItem.value} />
              </div>
            </div>
          ) : null
        })}
      </div>
    </div>
  )
}
