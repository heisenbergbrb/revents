import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  asyncActionError,
  asyncActionFinished,
  asyncActionStart,
} from '../async/asyncReducer';
import { dataFromSnapshot } from '../firestore/firestoreService';

export default function useFirestoreDoc({ query, data, deps }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncActionStart());
    const unsubscribe = query().onSnapshot(
      (snapshot) => {
        if (!snapshot.exist) {
          // Use this error object, kasi ganyan din format na binabato ng firebase pag nagerror
          dispatch(
            asyncActionError({
              code: 'not-fount',
              message: 'Could not find document',
            })
          );

          return;
        }
        data(dataFromSnapshot(snapshot));
        dispatch(asyncActionFinished());
      },
      (error) => dispatch(asyncActionError(error))
    );

    return () => unsubscribe();
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
}
