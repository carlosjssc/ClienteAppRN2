
import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

export default function ListScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [classesCnae, setClassesCnae] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://servicodados.ibge.gov.br/api/v2/cnae/classes/')
      .then(res => res.json())
      .then(json => setClassesCnae(json))
      .catch(err => {
        console.error('Erro ao carregar classes CNAE:', err);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#005A9C" />
        <Text>Carregando dados...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Erro ao carregar os dados.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={classesCnae}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            const body = `Grupo: ${item.grupo.descricao}`;
            const details = {
              secao: item.grupo.divisao.secao.descricao,
              divisao: item.grupo.divisao.descricao,
              observacoes: item.observacoes.join('\n\n'),
            };
            navigation.navigate('Detail', {
              id: item.id,
              title: item.descricao,
              body: body,
              details: details,
              isSaved: false, // Vem da API. Não salva ainda.
            });
          }}
        >
          <Text style={styles.title}>{item.descricao}</Text>
          <Text style={styles.subtitle}>ID: {item.id}</Text>
          <Text style={styles.subtitle}>Grupo: {item.grupo.descricao}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#F0F2F5',
  },
  error: { 
    color: 'red',
    fontSize: 16,
  },
  listContainer: {
    padding: 16,
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
  title: { 
    fontWeight: 'bold', 
    fontSize: 16,
    color: '#333',
  },
  subtitle: { 
    color: '#666', 
    marginTop: 4,
    fontSize: 14,
  }
});