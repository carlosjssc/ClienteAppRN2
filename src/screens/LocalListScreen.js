import React, { useState } from 'react';
import {
  View,
  FlatList,
  Text,
  ToastAndroid,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { fetchSavedItems, clearSavedItems } from '../db';

export default function LocalListScreen({ navigation }) {
  const [saved, setSaved] = useState([]);

  const loadLocal = async () => {
    try {
      const list = await fetchSavedItems();
      setSaved(list);
    } catch (e) {
      console.error('Erro ao carregar itens salvos:', e);
      ToastAndroid.show('Erro ao carregar itens.', ToastAndroid.SHORT);
    }
  };

  const confirmDeleteAll = () => {
    Alert.alert(
      "Deletar Tudo",
      "Você tem certeza que deseja apagar TODAS as classes salvas? Esta ação não pode ser desfeita.",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Deletar Tudo", onPress: deleteAll, style: "destructive" }
      ]
    );
  };

  const deleteAll = async () => {
    try {
      await clearSavedItems();
      setSaved([]);
      ToastAndroid.show('Todos os itens apagados.', ToastAndroid.SHORT);
    } catch (e) {
      console.error('Erro ao apagar itens:', e);
      ToastAndroid.show('Erro ao apagar.', ToastAndroid.SHORT);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadLocal();
    }, [])
  );

  return (
    <View style={styles.container}>
      {saved.length > 0 && (
        <View style={styles.header}>
            <TouchableOpacity style={styles.deleteButton} onPress={confirmDeleteAll}>
                <Text style={styles.deleteButtonText}>Deletar Todos</Text>
            </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={saved}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={
            <View style={styles.emptyContainer}>
                <Text style={styles.empty}>Nenhuma classe salva.</Text>
            </View>
        }
        contentContainerStyle={{ flexGrow: 1 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('Detail', {
                id: item.id,
                title: item.title,
                body: item.body,
                details: item.details,
                isSaved: true,
              })
            }
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.body}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
      flex: 1, 
      backgroundColor: '#F0F2F5',
      padding: 16,
  },
  header: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginBottom: 16,
  },
  deleteButton: {
      backgroundColor: '#DC3545',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 6,
  },
  deleteButtonText: {
      color: '#fff',
      fontWeight: 'bold',
  },
  card: { 
      backgroundColor: '#FFFFFF',
      padding: 16,
      borderRadius: 8,
      marginBottom: 12,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
  },
  title:   { 
      fontWeight: 'bold', 
      fontSize: 16, 
      color: '#333'
  },
  subtitle: {
      color: '#666',
      marginTop: 4,
  },
  emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  empty: { 
      textAlign: 'center', 
      marginTop: 20, 
      color: '#666',
      fontSize: 16,
  }
});