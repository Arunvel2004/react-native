import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function ChatInput({ onSend }) {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim()) {
      onSend(text.trim());
      setText('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Type a message..."
        placeholderTextColor="#999"
        multiline
      />
      <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
        <Text style={styles.sendText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#e5e5ea',
    alignItems: 'center',
    paddingBottom: 15,
  },
  input: {
    flex: 1,
    backgroundColor: '#f2f2f7',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    marginLeft: 10,
    paddingHorizontal: 10,
  },
  sendText: {
    color: '#0a7ea4',
    fontSize: 16,
    fontWeight: '600',
  },
});
