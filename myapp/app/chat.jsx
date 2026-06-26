import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { FlatList, StyleSheet, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import MessageBubble from '@/components/MessageBubble';
import ChatInput from '@/components/ChatInput';

const socket = io('http://192.168.31.76:3000');
export default function ChatScreen() {
  const headerHeight = useHeaderHeight();

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // 1. Catch the history when we first connect
    socket.on('load_history', (pastMessages) => {
      setMessages(pastMessages);
    });

    // 2. Catch new messages as they come in
    socket.on('receive_message', (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    // Cleanup when the screen unmounts
    return () => {
      socket.off('load_history');
      socket.off('receive_message');
    };
  }, []);

  const handleSend = (text) => {
    const newMessage = { 
      id: Date.now().toString(), 
      text: text, 
      senderId: socket.id // Attach our unique invisible ID!
    };
    
    // Send it through the tunnel to the server!
    socket.emit('send_message', newMessage);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === 'ios' ? headerHeight : 130}
    >
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MessageBubble 
            text={item.text} 
            isUser={item.senderId === socket.id} // Blue if it matches our ID, grey if not!
          />
        )}
        contentContainerStyle={styles.listContent}
      />
      <ChatInput onSend={handleSend} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContent: {
    padding: 5,
  },
});
