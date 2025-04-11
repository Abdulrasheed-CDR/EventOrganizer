import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, collection, onSnapshot, doc, addDoc, updateDoc, deleteDoc } from '../utils/firebase';
import { useAuth } from './AuthContext';
import { View, ActivityIndicator } from 'react-native';

const EventsContext = createContext();

export function EventsProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasInitializedDefaults, setHasInitializedDefaults] = useState(false);
  const { user } = useAuth();

  const initializeDefaultEvents = async () => {
    if (!user || hasInitializedDefaults) return;
    
    try {
      const eventsRef = collection(db, 'events');
      const snapshot = await getDocs(eventsRef);
      
      if (snapshot.empty) {
        await Promise.all(DEFAULT_EVENTS.map(event => 
          addDoc(eventsRef, {
            ...event,
            creatorId: user.uid,
            createdAt: new Date().toISOString()
          })
        ));
      }
      setHasInitializedDefaults(true);
    } catch (error) {
      console.error("Error initializing default events:", error);
    }
  };

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const eventsRef = collection(db, 'events');
    const unsubscribeEvents = onSnapshot(eventsRef, (snapshot) => {
      const eventsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEvents(eventsData);
      setLoading(false);
      
      // Initialize default events if none exist
      if (snapshot.empty && !hasInitializedDefaults) {
        initializeDefaultEvents();
      }
    });

    const favoritesRef = collection(db, 'users', user.uid, 'favorites');
    const unsubscribeFavorites = onSnapshot(favoritesRef, (snapshot) => {
      const favoritesData = snapshot.docs.map(doc => doc.id);
      setFavorites(favoritesData);
    });

    return () => {
      unsubscribeEvents();
      unsubscribeFavorites();
    };
  }, [user, hasInitializedDefaults]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const addEvent = async (eventData) => {
    await addDoc(collection(db, 'events'), {
      ...eventData,
      creatorId: user.uid,
      createdAt: new Date().toISOString()
    });
  };

  const updateEvent = async (eventId, eventData) => {
    await updateDoc(doc(db, 'events', eventId), eventData);
  };

  const deleteEvent = async (eventId) => {
    await deleteDoc(doc(db, 'events', eventId));
  };

  const toggleFavorite = async (eventId) => {
    const favoriteRef = doc(db, 'users', user.uid, 'favorites', eventId);
    if (favorites.includes(eventId)) {
      await deleteDoc(favoriteRef);
    } else {
      await setDoc(favoriteRef, { eventId });
    }
  };

  const value = {
    events,
    favorites,
    loading,
    addEvent,
    updateEvent,
    deleteEvent,
    toggleFavorite,
    setEvents // Added setEvents to context value
  };

  return (
    <EventsContext.Provider value={value}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  return useContext(EventsContext);
}