import { useState } from 'react'
import styles from './index.module.css'
import { Modal } from '../Modal'
import * as Yup from 'yup'
import { Field, Form, Formik, ErrorMessage } from 'formik'
import { useMutation } from '@tanstack/react-query'
import { fetchCreateProduct } from '../../api/products'
import { useSelector } from 'react-redux'

const addProdSchema = Yup.object().shape({
  discount: Yup.number()
    .required('Обязательно')
    .integer()
    .max(100, 'Не больше 100')
    .min(0, 'Не меньше 0'),
  stock: Yup.number().required('Обязательно').integer(),
  available: Yup.boolean(),
  pictures: Yup.string().required('Обязательно'),
  isPublished: Yup.boolean(),
  name: Yup.string().required('Обязательно'),
  price: Yup.number().required('Обязательно').positive('Больше 0').integer(),
  wight: Yup.string().required('Обязательно'),
  description: Yup.string().required('Обязательно'),
})

export const AddNewProduct = () => {
  const [isModalOpen, setModalState] = useState(false)
  const { token } = useSelector((state) => state.user)

  const initialValuesAddProd = {
    discount: 1,
    stock: 1,
    available: true,
    pictures: '',
    isPublished: true,
    name: '',
    price: 0,
    wight: '',
    description: '',
  }

  const { mutateAsync, isError, isLoading, error } = useMutation({
    mutationFn: async (values) => {
      const res = await fetchCreateProduct(token, values)
      if (res.ok) {
        return await res.json()
      }
      if (isLoading) return <p>Идет загрузка...</p>
      if (isError) return <p>Произошла ошибка: {error}</p>
      return null
    },
  })

  const handleOpenModal = () => {
    setModalState(true)
  }

  const closeModal = () => {
    setModalState(false)
  }

  const onSubmit = async (values) => {
    console.log('submit')
    const resSubmit = await mutateAsync(values)
    closeModal()
    return resSubmit
      ? alert('Продукт успешно добавлен')
      : alert('Продукт добавить не удалось')
  }

  return (
    <>
      <button
        className={styles.btnStyle}
        type="button"
        onClick={handleOpenModal}
      >
        Добавить продукт в каталог
      </button>
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <Formik
          initialValues={initialValuesAddProd}
          onSubmit={onSubmit}
          validationSchema={addProdSchema}
        >
          <Form className={styles.classForm}>
            <div className={styles.inputWrapper}>
              <label htmlFor="discount">Discount</label>
              <Field
                name="discount"
                id="discount"
                type="number"
                placeholder="discount"
                className={styles.inputField}
              />
              <ErrorMessage className="warning" name="discount" />
            </div>
            <div className={styles.inputWrapper}>
              <label htmlFor="stock">Stock</label>
              <Field
                name="stock"
                id="stock"
                type="number"
                placeholder="stock"
                className={styles.inputField}
              />
              <ErrorMessage className="warning" name="stock" />
            </div>
            <div className={styles.checkWrapper}>
              <label className={styles.checkLabel} htmlFor="exampleCheck1">
                Доступный для заказа?
              </label>
              <Field
                name="available"
                id="available"
                type="checkbox"
                className={styles.checkField}
              />
              <ErrorMessage className="warning" name="available" />
            </div>
            <div className={styles.inputWrapper}>
              <label htmlFor="pictures">Picture</label>
              <Field
                name="pictures"
                id="pictures"
                type="text"
                placeholder="pictures"
                className={styles.inputField}
              />
              <ErrorMessage className="warning" name="pictures" />
            </div>
            <div className={styles.checkWrapper}>
              <label className={styles.checkLabel} htmlFor="exampleCheck1">
                Опубликовать?
              </label>
              <Field
                name="isPublished"
                id="isPublished"
                type="checkbox"
                className={styles.checkField}
              />
              <ErrorMessage className="warning" name="isPublished" />
            </div>
            <div className={styles.inputWrapper}>
              <label htmlFor="name">Название</label>
              <Field
                name="name"
                id="name"
                type="text"
                placeholder="name"
                className={styles.inputField}
              />
              <ErrorMessage className="warning" name="name" />
            </div>
            <div className={styles.inputWrapper}>
              <label htmlFor="price">Цена</label>
              <Field
                name="price"
                id="price"
                type="number"
                placeholder="price"
                className={styles.inputField}
              />
              <ErrorMessage className="warning" name="price" />
            </div>
            <div className={styles.inputWrapper}>
              <label htmlFor="wight">Вес</label>
              <Field
                name="wight"
                id="wight"
                type="text"
                placeholder="wight"
                className={styles.inputField}
              />
              <ErrorMessage className="warning" name="wight" />
            </div>
            <div className={styles.inputWrapper}>
              <label htmlFor="description">Описание</label>
              <Field
                name="description"
                id="description"
                type="text"
                placeholder="description"
                className={styles.inputField}
              />
              <ErrorMessage className="warning" name="description" />
            </div>
            <div className={styles.btnWrapper}>
              <button className={styles.btnStyle} type="submit">
                Подтвердить
              </button>
            </div>
          </Form>
        </Formik>
      </Modal>
    </>
  )
}
