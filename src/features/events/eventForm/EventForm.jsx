/* global google */
import React from 'react';
import cuid from 'cuid';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { createEvent, updateEvent } from '../eventActions';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelectInput';
import { categoryData } from '../../../app/api/categoryOptions';
import DateInput from '../../../app/common/form/DataInput';
import PlaceInput from '../../../app/common/form/PlaceInput'

export default function EventForm ({ match, history }) {
  const dispatch = useDispatch()
  const selectedEvent = useSelector(state => state.event.events.find(e => e.id === match.params.id))

  const initialValues = selectedEvent ?? {
    title: '',
    category: '',
    description: '',
    city: {
      address: '',
      latLng: null
    },
    venue: {
      address: '',
      latLng: null
    },
    date: ''
  }

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    category: Yup.string().required('Category is required'),
    description: Yup.string().required(),
    city: Yup.object().shape({
      address: Yup.string().required('City is required')
    }),
    venue: Yup.object().shape({
      address: Yup.string().required('Venue is required')
    }),
    date: Yup.string().required(),
  })

  return (
    <Segment clearing>
      <Header content={selectedEvent ? 'Edit the event' : 'Create new event'} />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={values => {
          selectedEvent 
            ? dispatch(updateEvent({ ...selectedEvent, ...values }))
            : dispatch(createEvent({ 
              ...values, 
              id: cuid(), 
              hostedBy: 'Bob', 
              attendees: [], 
              hostPhotoURL: '/assets/user.png' 
            }))
          history.push('/events')
        }}
      >
        {({ dirty, isValid, isSubmitting, values }) => (
          <Form className='ui form'>
            <TextInput name="title" placeholder="Event title" />
            <SelectInput name="category" placeholder="Category" options={categoryData}  />
            <TextArea name="description" placeholder="Description" rows="3" />
            <Header sub color="teal" content="Event Location Details" />
            <PlaceInput 
              name="city"
              placeholder="City" 
            />
            <PlaceInput 
              name="venue"
              placeholder="Venue"
              disabled={!values.city.latLng}
              options={{
                location: new google.maps.LatLng(values.city.latLng),
                radius: 1000,
                types: ['establishment']
              }}
            />
            <DateInput 
              name="date" 
              placeholderText="Event Date"
              timeFormat="HH:mm"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm a"
              autoComplete='off'
            />
            <Button 
              loading={isSubmitting} 
              disabled={!isValid || !dirty || isSubmitting} 
              type="submit" 
              floated="right" 
              content="Submit"
              positive 
            />
            <Button 
              disabled={isSubmitting} 
              as={Link} 
              to="/events" 
              floated="right" 
              content="Cancel" 
            />
          </Form>
        )}
      </Formik>
    </Segment>
  )
}
