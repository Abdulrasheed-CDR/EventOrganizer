import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function EventCard({ event, isFavorite, onPress, onFavoritePress }) {
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={onPress} style={styles.cardContent}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.details}>{event.date} • {event.time}</Text>
          <Text style={styles.location}>📍 {event.location}</Text>
        </View>
        <TouchableOpacity 
          onPress={(e) => {
            e.stopPropagation();
            onFavoritePress && onFavoritePress();
          }}
          style={styles.favoriteIcon}
          activeOpacity={0.6}
        >
          <Icon 
            name={isFavorite ? 'favorite' : 'favorite-border'} 
            size={24} 
            color={isFavorite ? '#FF5252' : '#ccc'} 
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  textContainer: {
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