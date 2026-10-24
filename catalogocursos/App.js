import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

// A. Catalogo local de cursos
const cursos = [
  {
    id: '1',
    nombre: 'React Native',
    horas: 20,
    descripcion: 'Desarrollo de aplicaciones moviles.',
  },
  {
    id: '2',
    nombre: 'Diseño Web',
    horas: 18,
    descripcion: 'Creacion de interfaces para sitios web.',
  },
  {
    id: '3',
    nombre: 'Ofimatica',
    horas: 16,
    descripcion:
      'Uso de documentos, presentaciones y hojas de calculo.',
  },
  {
    id: '4',
    nombre: 'Marketing Digital',
    horas: 12,
    descripcion: 'Estrategias de comunicacion digital.',
  },
];

const Stack = createNativeStackNavigator();

// Pantalla Inicio
function InicioScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Catalogo de Cursos</Text>
      <Text style={styles.subtitulo}>
        Selecciona el curso que te interesa
      </Text>

      <FlatList
        data={cursos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [
              styles.curso,
              pressed && styles.cursoPresionado,
            ]}
            onPress={() =>
              navigation.navigate('Detalle', { curso: item })
            }
          >
            <View style={styles.cursoInfo}>
              <Text style={styles.nombreCurso}>{item.nombre}</Text>
              <Text style={styles.horas}>{item.horas} horas</Text>
            </View>
            <Text style={styles.flecha}>›</Text>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

// Pantalla Detalle
function DetalleScreen({ route }) {
  const { curso } = route.params;
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [acepta, setAcepta] = useState(false);

  function confirmarInteres() {
    if (!nombre.trim()) {
      Alert.alert('Error', 'Escribe tu nombre.');
      return;
    }

    if (!correo.trim() || !correo.includes('@')) {
      Alert.alert(
        'Error',
        'Escribe un correo valido que contenga @.'
      );
      return;
    }

    if (!acepta) {
      Alert.alert(
        'Atencion',
        'Debes aceptar las condiciones.'
      );
      return;
    }

    Alert.alert(
      'Registro simulado',
      `¡Gracias, ${nombre.trim()}! Tu interes en el curso ${curso.nombre} ha sido confirmado.`
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.detalle}>
        <Text style={styles.nombreDetalle}>{curso.nombre}</Text>

        <Text style={styles.horasDetalle}>
          {curso.horas} horas
        </Text>

        <Text style={styles.descripcion}>
          {curso.descripcion}
        </Text>

        <Text style={styles.etiqueta}>Nombre:</Text>
        <TextInput
          style={styles.input}
          placeholder="Escribe tu nombre"
          value={nombre}
          onChangeText={setNombre}
          autoCapitalize="words"
        />

        <Text style={styles.etiqueta}>Correo:</Text>
        <TextInput
          style={styles.input}
          placeholder="ejemplo@correo.com"
          value={correo}
          onChangeText={setCorreo}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View style={styles.filaSwitch}>
          <Text style={styles.textoSwitch}>
            Acepto condiciones
          </Text>
          <Switch
            value={acepta}
            onValueChange={setAcepta}
          />
        </View>

        <Pressable
          style={styles.boton}
          onPress={confirmarInteres}
        >
          <Text style={styles.textoBoton}>
            Confirmar interes
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

// Navegacion principal
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator
        initialRouteName="Inicio"
        screenOptions={{
          headerStyle: { backgroundColor: '#1746A2' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen
          name="Inicio"
          component={InicioScreen}
          options={{ title: 'Inicio' }}
        />
        <Stack.Screen
          name="Detalle"
          component={DetalleScreen}
          options={{ title: 'Detalle del curso' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// E. Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F6FC',
  },
  titulo: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#1746A2',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 15,
    color: '#555555',
    textAlign: 'center',
    marginBottom: 15,
  },
  lista: {
    padding: 16,
  },
  curso: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    marginBottom: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
  },
  cursoPresionado: {
    backgroundColor: '#DCE7FF',
  },
  cursoInfo: {
    flex: 1,
  },
  nombreCurso: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222222',
  },
  horas: {
    fontSize: 15,
    color: '#1746A2',
    marginTop: 5,
  },
  flecha: {
    fontSize: 30,
    color: '#1746A2',
  },
  detalle: {
    padding: 20,
  },
  nombreDetalle: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#1746A2',
    marginBottom: 8,
  },
  horasDetalle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  descripcion: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 25,
    color: '#444444',
  },
  etiqueta: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 7,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
  },
  filaSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 22,
  },
  textoSwitch: {
    fontSize: 16,
  },
  boton: {
    backgroundColor: '#1746A2',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 25,
  },
  textoBoton: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
});