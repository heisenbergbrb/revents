import { Formik, Form } from 'formik';
import React from 'react';
import * as Yup from 'yup'
import { useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';

import ModalWrapper from '../../app/common/modals/ModalWrapper'
import TextInput from '../../app/common/form/TextInput'
import { signInUser } from '../auth/authActions'
import { closeModal } from '../../app/common/modals/modalReducer';

export default function LoginForm() {
  const dispatch = useDispatch()
  const validationSchema = Yup.object({
    email: Yup.string().required().email(),
    password: Yup.string().required()
  })
  
  return (
    <ModalWrapper size="mini" header='Sign in to Re-vents'>
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(signInUser(values))
          setSubmitting(false)
          dispatch(closeModal())
        }}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form className='ui form'>
            <TextInput name='email' placeholder="Email Address" />
            <TextInput name='password' type="password" placeholder="Password" />
            <Button
              loading={isSubmitting}
              disabled={!isValid || isSubmitting || !dirty}
              type="submit"
              size="large"
              color="teal"
              content="Login"
              fluid
            />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  )
}
