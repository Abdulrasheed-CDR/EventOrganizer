import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from '../screens/DashboardScreen';
import NewEventScreen from '../screens/NewEventScreen';
import EventDetailScreen from '../screens/EventDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import AuthScreen from '../screens/AuthScreen';
import { Text, TouchableOpacity } from 'react-native';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
      <Stack.Navigator
        // initialRouteName="Auth"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: '600',
          },
        }}
      >
        
        <Stack.Screen 
          name="Dashboard" 
          component={DashboardScreen}
          options={({ navigation }) => ({
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
              <TouchableOpacity 
                onPress={() => navigation.navigate('Auth')}
                style={{ marginRight: 15 }}
              >
                <Text style={{ color: '#007AFF', fontSize: 16 }}>Logout</Text>
              </TouchableOpacity>
            )
          })}
        />
        <Stack.Screen 
          name="NewEvent" 
          component={NewEventScreen} 
          options={{ title: 'Create Event' }}
        />
        <Stack.Screen 
          name="EventDetail" 
          component={EventDetailScreen} 
          options={{ title: 'Event Details' }}
        />
        <Stack.Screen 
          name="Favorites" 
          component={FavoritesScreen} 
          options={{ title: 'My Favorites' }}
        />
      </Stack.Navigator>
  );
}

export default AppNavigator;