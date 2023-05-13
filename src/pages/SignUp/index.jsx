import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import { signInFetch, signUpFetch } from '../../api/user'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.css'
import { useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { setUpUser } from '../../redux/slices/userSlice'
import { useAuth } from '../../hooks/useAuth'

const signUpSchema = Yup.object().shape({
  email: Yup.string().email('Некорректный email').required('Required'),
  password: Yup.string().required('Required'),
  group: Yup.string().required('Required'),
})

export const SignUp = () => {
  useAuth()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const initialValuesSignUp = {
    email: '',
    password: '',
    group: '',
  }

  const {
    mutateAsync: mutateSignUp,
    isError: isErrSignUp,
    isLoading: isLoadSignUp,
    error: errorSignUp,
  } = useMutation({
    mutationFn: async (values) => {
      const res = await signUpFetch(values)
      if (res.ok) {
        const responce = await res.json()
        return responce
      }
      if (isLoadSignUp) return <p>Идет загрузка...</p>
      if (isErrSignUp) return <p>Произошла ошибка: {errorSignUp}</p>
      return false
    },
  })

  const {
    mutateAsync: mutateSignIn,
    isError: isErrSignIn,
    isLoading: isLoadSignIn,
    error: errorSignIn,
  } = useMutation({
    mutationFn: async (values) => {
      const res = await signInFetch(values)
      if (res.ok) {
        const responce = await res.json()
        return responce
      }
      if (isLoadSignIn) return <p>Идет загрузка...</p>
      if (isErrSignIn) return <p>Произошла ошибка: {errorSignIn}</p>
      return false
    },
  })

  const onSubmit = async (values) => {
    const res = await mutateSignUp(values)
    if (res) {
      const { group, ...valuesSignIn } = values
      const resIn = await mutateSignIn(valuesSignIn)
      if (resIn) {
        dispatch(setUpUser({ ...resIn.data, token: resIn.token }))
        return navigate('/products')
      }
      return navigate('/signin')
    }
    return false
  }

  return (
    <div className={styles.signUpForm}>
      <Formik
        initialValues={initialValuesSignUp}
        onSubmit={onSubmit}
        validationSchema={signUpSchema}
      >
        <Form className={styles.classForm}>
          <h1>Регистрация</h1>
          <div className={styles.fieldHolder}>
            <label htmlFor="email">Email</label>
            <Field
              className={styles.inputField}
              id="email"
              name="email"
              placeholder="jane@acme.com"
              type="email"
            />
          </div>

          <div className={styles.fieldHolder}>
            <label htmlFor="password">Password</label>
            <Field
              className={styles.inputField}
              id="password"
              name="password"
              placeholder="password"
              type="password"
            />
          </div>
          <div className={styles.fieldHolder}>
            <label htmlFor="group">Group</label>
            <Field
              className={styles.inputField}
              id="group"
              name="group"
              placeholder="group-11"
              type="group"
            />
          </div>

          <button className={styles.logUp} type="submit">
            Зарегистрироваться
          </button>
        </Form>
      </Formik>
    </div>
  )
}
