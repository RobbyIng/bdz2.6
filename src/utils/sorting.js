import {
  FIRST_DISCOUNT,
  FIRST_FAVORITE,
  FIRST_PRICE_HIGH,
  FIRST_PRICE_LOW,
} from './constants'

export const sortingData = (data, sortingType) => {
  switch (sortingType) {
    case FIRST_PRICE_HIGH:
      return data.sort((a, b) => b.price - a.price)
    case FIRST_PRICE_LOW:
      return data.sort((a, b) => a.price - b.price)
    case FIRST_DISCOUNT:
      return data.sort((a, b) => b.discount - a.discount)
    case FIRST_FAVORITE:
      return data.sort((a, b) => b.likes.length - a.likes.length)
    default:
      return data
  }
}
