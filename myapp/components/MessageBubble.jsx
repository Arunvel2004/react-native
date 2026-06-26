import { View, Text, StyleSheet } from 'react-native';

export default function MessageBubble({ text, isUser }) {
  return (
    <View style={[styles.bubble, isUser ? styles.userBubble : styles.otherBubble]}>
      <Text style={[styles.text, isUser ? styles.userText : styles.otherText]}>
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginVertical: 4,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#0a7ea4',
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#e5e5ea',
    borderBottomLeftRadius: 4,
  },
  text: {
    fontSize: 16,
  },
  userText: {
    color: '#fff',
  },
  otherText: {
    color: '#000',
  },
});
