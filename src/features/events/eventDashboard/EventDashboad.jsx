import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { useSelector } from 'react-redux';

import EventList from './EventList';
import EventListItemsSkeleton from './EventListItemSkeleton';
import EventFilters from './EventFilters';
import { listenToEventsFromFirestore } from '../../../app/firestore/firestoreService';
import { listenToEvents } from '../eventActions';
import { useDispatch } from 'react-redux';
import useFirestoreCollection from '../../../app/hooks/useFirestoreCollection';

function EventDashboard () {
  const dispatch = useDispatch()
  const { events } = useSelector(state => state.event)
  const { loading } = useSelector(state => state.async)

  useFirestoreCollection({
     query: listenToEventsFromFirestore,
     data: events => dispatch(listenToEvents(events)),
     deps: [dispatch]
  })

  return (
    <Grid>
      <Grid.Column width={10}>
        { loading && (
          <>
            <EventListItemsSkeleton />
            <EventListItemsSkeleton />
          </>
        ) }
        <EventList events={events} />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventFilters />
      </Grid.Column>
    </Grid>
  );
}

export default EventDashboard;
