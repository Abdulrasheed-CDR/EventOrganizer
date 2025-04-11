import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useEvents } from '../context/EventsContext';
import EventForm from '../components/EventForm';

function NewEventScreen({ route, navigation }) {
  const { eventId } = route.params || {};
  const { user } = useAuth();
  const { events, addEvent, updateEvent } = useEvents();
  
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    location: ''
  });

  useEffect(() => {
    if (eventId) {
      const existingEvent = events.find(e => e.id === eventId);
      if (existingEvent) {
        setEventData({
          title: existingEvent.title,
          description: existingEvent.description,
          date: existingEvent.date,
          location: existingEvent.location
        });
      }
    }
  }, [eventId, events]);

  const handleSubmit = () => {
    if (!eventData.title || !eventData.description || !eventData.date || !eventData.location) {
      Alert.alert('Validation Error', 'Please fill in all fields');
      return;
    }

    if (eventId) {
      updateEvent(eventId, eventData);
    } else {
      addEvent(eventData);
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <EventForm eventData={eventData} setEventData={setEventData} />
      <Button
        title={eventId ? 'Update Event' : 'Create Event'}
        onPress={handleSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  }
});

export default NewEventScreen;