import { useState } from 'react';
import { TextInput, View, Text, StyleSheet, Button, FlatList } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

interface TarefaData {
  id: string;
  conteudo: string;
  terminado?: boolean;
}

const TextScreen = () => {
  const [text, setText] = useState('');
  const [tarefas, setTarefas] = useState<TarefaData[]>([]);

  const addTarefa = () => {
    
    const newTarefa: TarefaData = {
      id: Date.now().toString() + Math.random().toString(), 
      conteudo: `Tarefa: ${text}`, 
      terminado: false
    };

    setTarefas(prevTarefas => [...prevTarefas, newTarefa]);
    setText('');
  }

  const toggleTarefa = (id: string) => {
    setTarefas(prev =>
      prev.map(t =>
        t.id === id ? { ...t, terminado: !t.terminado } : t
      )
    );
  };

  

  return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <View>  
          <TextInput
            style={styles.textInput}
            placeholder="Digite aqui"
            value={text}
            onChangeText={setText}
            onEndEditing={() => console.log('Edição concluída')}
            autoCapitalize="none"
            autoCorrect={false}
        />
        <Button
          title="Adicionar Tarefa"
          onPress={() => addTarefa()}
        />

        <FlatList
          data={tarefas}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={item.terminado ? styles.textClicked : styles.item}>
                {item.conteudo}
              </Text>
              <FontAwesome6 name="trash" size={20} color="black" onPress={() => toggleTarefa(item.id)}/>
            </View>)
          }

        />
        </View>

      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
   container: {
    flex: 1, 
    padding: 16,
  },
  textInput: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  item: {
    padding: 10,
    fontSize: 16,
  },
  textClicked: {
    padding: 10,
    fontSize: 16,
    textDecorationLine: 'line-through',
  },
});

export default TextScreen;
