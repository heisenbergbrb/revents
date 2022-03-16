import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { openModal } from '../../app/common/modals/modalReducer';
import TestMap from './TestMap';
import TestPlaceInput from './TestPlaceInput';
import { decrement, increment } from './testReducer';

export default function Sandbox() {
  const dispatch = useDispatch()
  const [ target, setTarget ] = useState(null)
  const data = useSelector(state => state.test.data)
  const { loading } = useSelector(state => state.async)
  const [lanLng, setLanLng] = useState({
    lat: 59.95,
    lng: 30.33
  });

  return (
    <>
      <h1>Testing 123</h1>
      <h3>The Data is: { data }</h3>
      <Button
        onClick={(e) => {
          dispatch(increment(20))
          setTarget(e.target.name)
        }} 
        name='increment'
        loading={loading && target === 'increment'} 
        content="Increment"
        color="green"
      />
      <Button 
        onClick={(e) => {
          dispatch(decrement(10))
          setTarget(e.target.name)
        }} 
        name='decrement'
        loading={loading && target === 'decrement'} 
        content="Decrement"
        color="red"
      />
      <Button 
        onClick={
          () => dispatch(openModal({ modalType: 'TestModal', modalProps: { data } }))
        } 
        content="Open Modal" 
        color="teal" 
      />
      <div style={{ marginTop: 15 }}>
        <TestPlaceInput setLanLng={setLanLng} />
        <TestMap lanLng={lanLng} />
      </div>
    </>
  )
}
