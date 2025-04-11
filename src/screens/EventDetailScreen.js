import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../context/AuthContext';
import { useEvents } from '../context/EventsContext';

function EventDetailScreen({ route, navigation }) {
  const { eventId } = route.params;
  const { user } = useAuth();
  const { events, favorites, deleteEvent, toggleFavorite } = useEvents();
  
  const event = events.find(e => e.id === eventId);
  
  if (!event) {
    return (
      <View style={styles.container}>
        <Text>Event not found</Text>
      </View>
    );
  }

  const isCreator = event.creatorId === user.uid;
  const isFavorite = favorites.includes(event.id);

  const handleDelete = () => {
    Alert.alert(
      'Delete Event',
      'Are you sure you want to delete this event?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => {
          deleteEvent(event.id);
          navigation.goBack();
        }}
      ]
    );
  };

  const handleEdit = () => {
    navigation.navigate('NewEvent', { eventId: event.id });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.description}>{event.description}</Text>
      <Text style={styles.dateTime}>{event.date} • {event.time}</Text>
      <Text style={styles.location}>📍 {event.location}</Text>
      
      <TouchableOpacity
        style={[styles.favoriteButton, isFavorite && styles.favoriteActive]}
        onPress={() => toggleFavorite(event.id)}
      >
        <Icon 
          name={isFavorite ? 'favorite' : 'favorite-border'} 
          size={20} 
          color={isFavorite ? '#FF5252' : '#555'} 
        />
        <Text style={styles.favoriteText}>
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </Text>
      </TouchableOpacity>
      
      {isCreator && (
        <View style={styles.creatorButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.editButton]}
            onPress={handleEdit}
          >
            <Icon name="edit" size={18} color="#fff" />
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={handleDelete}
          >
            <Icon name="delete" size={18} color="#fff" />
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333'
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
    color: '#555'
  },
  dateTime: {
    fontSize: 15,
    color: '#666',
    marginBottom: 8
  },
  location: {
    fontSize: 16,
    color: '#444',
    marginBottom: 24
  },
  favoriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#eee'
  },
  favoriteActive: {
    backgroundColor: '#ffebee',
    borderColor: '#ffcdd2'
  },
  favoriteText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333'
  },
  creatorButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 6
  },
  editButton: {
    backgroundColor: '#2196F3'
  },
  deleteButton: {
    backgroundColor: '#f44336'
  },
  buttonText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500'
  }
});

export default EventDetailScreen;