import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useEvents } from '../context/EventsContext';
import EventCard from '../components/EventCard';
import { auth, signOut } from '../utils/firebase';

function DashboardScreen({ navigation }) {
  const { user } = useAuth();
  const { events, favorites, loading, toggleFavorite } = useEvents();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  // Set header options
  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Dashboard',
      headerTitleAlign: 'center',
      headerLeft: () => (
        <TouchableOpacity 
          onPress={() => navigation.navigate('Favorites')}
          style={{ marginLeft: 15 }}
        >
          <Text style={{ color: '#007AFF', fontSize: 16 }}>Favorites</Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={handleLogout} style={{ marginRight: 15 }}>
          <Text style={{ color: '#007AFF', fontSize: 16 }}>Logout</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]); // Only include navigation in dependencies

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventCard
            event={item}
            isFavorite={favorites.includes(item.id)}
            onPress={() => navigation.navigate('EventDetail', { eventId: item.id })}
            onFavoritePress={() => toggleFavorite(item.id)} 
          />
        )}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <View style={{ paddingTop: 50, alignItems: 'center' }}>
            <Text style={{ fontSize: 18, color: '#666' }}>No events found</Text>
          </View>
        }
      />
      
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 20,
          bottom: 20,
          backgroundColor: '#007AFF',
          width: 60,
          height: 60,
          borderRadius: 30,
          alignItems: 'center',
          justifyContent: 'center',
          elevation: 5,
        }}
        onPress={() => navigation.navigate('NewEvent')}
      >
        <Text style={{ color: 'white', fontSize: 30 }}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default DashboardScreen;