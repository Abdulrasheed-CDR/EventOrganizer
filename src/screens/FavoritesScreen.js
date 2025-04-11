import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useEvents } from '../context/EventsContext';
import EventCard from '../components/EventCard';

function FavoritesScreen({ navigation }) {
  const { events, favorites, toggleFavorite } = useEvents();
  
  const favoriteEvents = events.filter(event => favorites.includes(event.id));

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventCard
            event={item}
            isFavorite={true}
            onPress={() => navigation.navigate('EventDetail', { eventId: item.id })}
            onFavoritePress={() => toggleFavorite(item.id)}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No favorite events yet</Text>
            <Text style={styles.emptySubtext}>Tap the ♡ icon on events to add them</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
  },
});

export default FavoritesScreen;