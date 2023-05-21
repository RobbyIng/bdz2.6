import { ProductItem } from '../../components/ProductItem'
import styles from './index.module.css'
import { fetchSearchProducts } from '../../api/products'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { useNoAuth } from '../../hooks/useNoAuth'
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import {
  FIRST_DISCOUNT,
  FIRST_FAVORITE,
  FIRST_PRICE_HIGH,
  FIRST_PRICE_LOW,
  SORT_PARAMS,
} from '../../utils/constants'
import { sortingData } from '../../utils/sorting'

const filterOption = [
  {
    pValue: 'По умолчанию',
  },
  {
    pValue: FIRST_PRICE_LOW,
  },
  {
    pValue: FIRST_PRICE_HIGH,
  },
  {
    pValue: FIRST_DISCOUNT,
  },
  {
    pValue: FIRST_FAVORITE,
  },
]
export const ProductList = () => {
  const { token } = useNoAuth()
  const { search } = useSelector((state) => state.filter)

  const [searchParams, setSearchParams] = useSearchParams()
  const [sortValue, setSortValue] = useState(() => {
    const sort = searchParams.get(SORT_PARAMS)
    return sort ? sort : ''
  })

  const handleSort = (event) => {
    const value = event.target.value
    setSortValue(value)
    setSearchParams((prev) => {
      prev.set('sort', value)
      return prev
    })
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['getAllProduct', search],
    queryFn: () => {
      const responce = fetchSearchProducts(token, search)
      return responce
    },
  })
  if (isLoading) return <p>Идет загрузка...</p>
  if (isError) return <p>Произошла ошибка: {error}</p>
  if (data.err) return <p>Произошла ошибка: {data.message}</p>
  if (data)
    return (
      <>
        <span className={styles.filtersWrapper}>
          Сортировка:
          <select
            className={styles.sortStyles}
            onChange={(event) => handleSort(event)}
          >
            {filterOption.map((el) => (
              <option key={el.pValue} className={styles.optText}>
                {el.pValue}
              </option>
            ))}
          </select>
        </span>
        <div className={styles.cardProductList}>
          {sortingData([...data], sortValue).map((productItem) => {
            return (
              <ProductItem key={productItem._id} productItem={productItem} />
            )
          })}
        </div>
      </>
    )
}
