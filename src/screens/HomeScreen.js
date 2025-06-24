import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.subtitle}>Consulte e salve informações sobre a Classificação Nacional de Atividades Econômicas-CNAE.</Text>
      
      <Image
        source={{ uri: 'https://placehold.co/400x250/005A9C/FFFFFF?text=Ocupa%C3%A7%C3%B5es' }}
        style={styles.image}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('List')}
        >
          <Text style={styles.buttonText}>Ver API da CNAE</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.buttonSecondary]} 
          onPress={() => navigation.navigate('LocalList')}
        >
          <Text style={styles.buttonText}>Ver CNAE Salva</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#F0F2F5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#005A9C',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 32,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 32,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonSecondary: {
    backgroundColor: '#005A9C',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});