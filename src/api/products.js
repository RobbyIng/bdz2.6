export const fetchDataProducts = async (token) => {
  const res = await fetch('https://api.react-learning.ru/products', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const responce = await res.json()
  return responce
}
export const fetchSearchProducts = async (token, search) => {
  const res = await fetch(
    `https://api.react-learning.ru/products/search?query=${search}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  const responce = await res.json()
  return responce
}

export const fetchCurrentProduct = async (token, params) => {
  const res = await fetch(`https://api.react-learning.ru/products/${params}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (res.ok) {
    const responce = await res.json()
    return responce
  }
}

export const fetchCreateProduct = async (token, values) => {
  const res = await fetch(`https://api.react-learning.ru/products/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  })

  return res
}

export const fetchSetLikeProduct = async (token, params) => {
  const res = await fetch(
    `https://api.react-learning.ru/products/likes/${params}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  if (res.ok) {
    const responce = await res.json()
    return responce
  }
}

export const fetchDelLikeProduct = async (token, params) => {
  const res = await fetch(
    `https://api.react-learning.ru/products/likes/${params}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  if (res.ok) {
    const responce = await res.json()
    return responce
  }
}

export const fetchCartProducts = (token, cart) =>
  Promise.allSettled(
    cart.map((product) =>
      fetch(`https://api.react-learning.ru/products/${product.id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          return { id: product.id, data }
        })
    )
  )
