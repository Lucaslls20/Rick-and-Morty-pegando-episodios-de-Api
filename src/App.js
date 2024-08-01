import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Image, StyleSheet, Text, View } from "react-native";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('https://rickandmortyapi.com/api/episode');
      const json = await response.json();
      setData(json.results);
    } catch (err) {
      console.log('Algo deu errado', err);
      Alert.alert('Something is wrong', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderLoading = () => (
    <ActivityIndicator size="large" color="blue" />
  );

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.name} - {item.episode}</Text>
      <Text style={styles.date}>{item.air_date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: 'https://cdn.pixabay.com/photo/2021/06/17/22/55/rick-and-morty-6344804_1280.jpg' }}
          style={styles.image}
        />
      </View>
      <View style={{ flex: 1 }}>
        {loading ? (
          renderLoading()
        ) : (
          <FlatList
            data={data}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            onEndReachedThreshold={0.1}
            contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 10 }}
            style={styles.flatList}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#9666FA',
    flex: 1,
    padding: 10,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  item: {
    backgroundColor: '#FF69B4',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  date: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
  },
  flatList: {
    flex: 1,
  },
});

export default App;
