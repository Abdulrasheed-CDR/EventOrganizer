import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { EventsProvider } from './src/context/EventsContext';
import AppNavigator from './src/navigation/AppNavigator';
import AuthNavigator from './src/navigation/AuthNavigator';

function RootNavigator() {
  const { user } = useAuth();
  return user ? <AppNavigator /> : <AuthNavigator />;
}

export default function App() {
  return (
    <AuthProvider>
      <EventsProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </EventsProvider>
    </AuthProvider>
  );
}
