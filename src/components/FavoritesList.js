import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function FavoritesList({ favorites }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites</Text>x
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>No favorites yet</Text>
      ) : (
        favorites.map((eventId) => (
          <Text key={eventId} style={styles.favoriteItem}>
            {eventId}
          </Text>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    marginBottom: 10
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 5
  },
  emptyText: {
    fontStyle: 'italic',
    color: 'gray'
  },
  favoriteItem: {
    paddingVertical: 3
  }
});

export default FavoritesList;