import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>arun</Text>
      <Link href="/chat" style={styles.link}>
        Open Chat
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
  },
  link: {
    marginTop: 20,
    fontSize: 18,
    color: '#0a7ea4',
    textDecorationLine: 'underline',
  },
});
