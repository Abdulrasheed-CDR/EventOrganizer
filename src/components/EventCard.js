import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function EventCard({ event, isFavorite, onPress, onFavoritePress }) {
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={onPress} style={styles.cardContent}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.details}>{event.date} • {event.time}</Text>
        <Text style={styles.location}>📍 {event.location}</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={(e) => {
          e.stopPropagation();
          onFavoritePress();
        }}
        style={styles.favoriteIcon}
      >
        <Icon 
          name={isFavorite ? 'favorite' : 'favorite-border'} 
          size={24} 
          color={isFavorite ? '#FF5252' : '#ccc'} 
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardContent: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  details: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: '#666',
  },
  favoriteIcon: {
    padding: 8,
    marginLeft: 8,
  },
});

export default EventCard;