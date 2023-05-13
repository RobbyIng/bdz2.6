import { ProductItem } from '../../components/Product'
import styles from './index.module.css'
import { fetchSearchProducts } from '../../api/products'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { useNoAuth } from '../../hooks/useNoAuth'

export const ProductList = () => {
  const { token } = useNoAuth()
  const { search } = useSelector((state) => state.filter)

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['getAllProduct', search],
    queryFn: () => {
      const responce = fetchSearchProducts(token, search)
      return responce
    },
    // enabled:  !!token
  })
  if (isLoading) return <p>Идет загрузка...</p>
  if (isError) return <p>Произошла ошибка: {error}</p>
  if (data.err) return <p>Произошла ошибка: {data.message}</p>

  // data.length > 8
  //   ? (document.getElementById('footerId').style.position = 'static')
  //   : (document.getElementById('footerId').style.position = 'fixed')
  return (
    <div className={styles.cardProductList}>
      {data.map((productItem) => {
        return <ProductItem key={productItem._id} productItem={productItem} />
      })}
    </div>
  )
}
