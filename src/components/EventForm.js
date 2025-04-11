import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

function EventForm({ eventData, setEventData }) {
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Event Title"
        value={eventData.title}
        onChangeText={(text) => setEventData({ ...eventData, title: text })}
      />
      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="Description"
        value={eventData.description}
        onChangeText={(text) => setEventData({ ...eventData, description: text })}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Date (MM/DD/YYYY)"
        value={eventData.date}
        onChangeText={(text) => setEventData({ ...eventData, date: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={eventData.location}
        onChangeText={(text) => setEventData({ ...eventData, location: text })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top'
  }
});

export default EventForm;