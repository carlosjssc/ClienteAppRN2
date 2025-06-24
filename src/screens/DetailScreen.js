import React from 'react';
import {
  View,
  Text,
  ToastAndroid,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { saveItem, deleteItem } from '../db';

export default function DetailScreen({ route }) {
  const { id, title, body, details, isSaved } = route.params;
  const navigation = useNavigation();

  const onSave = async () => {
    try {
      await saveItem({ id, title, body, details });
      ToastAndroid.show('Classe CNAE salva!', ToastAndroid.SHORT);
      navigation.goBack(); // Volta para a tela anterior
    } catch (e) {
      console.error('Erro ao salvar classe:', e);
      ToastAndroid.show('Erro ao salvar.', ToastAndroid.SHORT);
    }
  };

  const onDelete = async () => {
    try {
      await deleteItem(id);
      ToastAndroid.show('Classe CNAE deletada!', ToastAndroid.SHORT);
      navigation.goBack();
    } catch (e) {
      console.error('Erro ao deletar classe:', e);
      ToastAndroid.show('Erro ao deletar.', ToastAndroid.SHORT);
    }
  };
  
  const confirmDelete = () => {
    Alert.alert(
      "Deletar Classe CNAE",
      "Você tem certeza que deseja deletar este item?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Deletar", onPress: onDelete, style: "destructive" }
      ]
    );
  };

  return (
    <View style={styles.flexContainer}>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {!isSaved && (
          <View style={styles.detailBlock}>
            <Text style={styles.label}>ID da Classe:</Text>
            <Text style={styles.value}>{id}</Text>
          </View>
        )}

        <View style={styles.detailBlock}>
            <Text style={styles.label}>Descrição da Classe:</Text>
            <Text style={styles.value}>{title}</Text>
        </View>

        <View style={styles.detailBlock}>
            <Text style={styles.label}>Grupo:</Text>
            <Text style={styles.value}>{body.replace('Grupo: ', '')}</Text>
        </View>

        {details && (
          <>
            <View style={styles.detailBlock}>
                <Text style={styles.label}>Divisão:</Text>
                <Text style={styles.value}>{details.divisao}</Text>
            </View>
            
            <View style={styles.detailBlock}>
                <Text style={styles.label}>Seção:</Text>
                <Text style={styles.value}>{details.secao}</Text>
            </View>

            {details.observacoes && details.observacoes.length > 0 && (
              <View style={styles.detailBlock}>
                <Text style={styles.label}>Observações:</Text>
                <Text style={styles.value}>{details.observacoes}</Text>
              </View>
            )}
          </>
        )}
      </ScrollView>

      {/* Botões Flutuantes */}
      {!isSaved && (
        <TouchableOpacity style={[styles.fab, styles.fabSave]} onPress={onSave}>
          <Text style={styles.fabText}>Salvar</Text>
        </TouchableOpacity>
      )}
      
      {isSaved && (
        <TouchableOpacity style={[styles.fab, styles.fabDelete]} onPress={confirmDelete}>
          <Text style={styles.fabText}>Deletar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  container: { 
    backgroundColor: '#F0F2F5'
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 100, // Espaço botão não cobrir texto
  },
  detailBlock: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  label: { 
    fontWeight: 'bold', 
    fontSize: 16, 
    color: '#005A9C', 
    marginBottom: 4 
  },
  value: { 
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 10,
    bottom: 10,
    borderRadius: 24,
    height: 48,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  fabSave: {
    backgroundColor: '#28A745', // Verde
  },
  fabDelete: {
    backgroundColor: '#DC3545', // Vermelho
  },
  fabText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});