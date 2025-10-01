import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  StyleSheet
} from 'react-native';

export default function App() {
  const [registros, setRegistros] = useState([]);

  const request = async () => {
    const url = 'https://nekos.best/api/v2/neko?amount=20';
    const response = await fetch(url);
    const parsed = await response.json();
    return parsed.results;
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await request();
      setRegistros(data);
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nekos</Text>

      <FlatList
        data={registros}
        keyExtractor={(item) => item.artist_href + item.url}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.card_image_container}>
              <Image
                source={{ uri: item.url }}
                style={styles.card_image}
                resizeMode="cover"
              />
            </View>
            <View style={styles.card_info_container}>
              <Text style={styles.card_info}>
                <Text style={styles.card_label}>Artista:</Text> {item.artist_name}{'\n'}
                <Text style={styles.card_label}>Fonte:</Text> {item.source_name || 'Desconhecida'}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#00ffcc',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 4,
  },
  card_image_container: {
    width: '100%',
    height: 400,
    backgroundColor: '#000',
  },
  card_image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  card_info_container: {
    padding: 15,
  },
  card_info: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 22,
  },
  card_label: {
    fontWeight: 'bold',
    color: '#00ffcc',
  },
});
