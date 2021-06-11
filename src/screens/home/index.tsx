import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Input } from 'react-native-elements';


export function HomeScreen () {

    //Variaveis e Constantes
    const nav = useNavigation();
    const [ name, setName ] = useState('');
    const [ points, setPoints ] = useState(0);
    const [ users, setUsers ] = useState([
        {name: 'Carlos', points: 5},
        {name: 'João', points: 10},
        {name: 'Maria', points: 50}
    ]) 

    //Ações
    const quit = async() => {
        nav.navigate('login');
    }

    const insert = async() => {
        console.log("Nome: ", name);
        console.log("Pontos: ", points);
    }

    const getUsers = async() => {
        console.log("Nome: ", name);
        console.log("Pontos: ", points);
    }

    //Render
    return (
      <View style={styles.container}>
         <Button title="Sair" onPress={quit} buttonStyle={{backgroundColor: 'tomato', borderRadius: 20}} />
         

         {/* ---------- INSERIR ------------ */}
         <View style={{marginTop: 50}}>
            <Text style={{textAlign:'center', fontSize: 20}}>Inserir Dados</Text>
            <View style={{flexDirection:'row'}}>
                <Input value={name} placeholderTextColor="white" containerStyle={{flex:1}} placeholder="Nome:" onChangeText={(text) => setName(text)} /> 
                <Input value={String(points)} placeholderTextColor="white" containerStyle={{flex:1}} placeholder="Pontos" keyboardType="number-pad" onChangeText={(text) => setPoints(text)} /> 
            </View>
            <Button title="Inserir" onPress={insert} buttonStyle={{backgroundColor: 'tomato', borderRadius: 20}} />
         </View>


         {/* ---------- BUSCAR ------------ */}
         <View style={{marginTop: 50}}>
            <Text style={{textAlign:'center', fontSize: 20}}>Buscar Dados</Text>
            <Button title="Buscar" onPress={getUsers} buttonStyle={{backgroundColor: 'tomato', borderRadius: 20}} />
            
            {users.map((user, index) => (
                <Text key={String(index)} style={styles.user}>{user.name} - {user.points}</Text>
            ))}
         
         </View>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'orange',
        justifyContent:'flex-start',
        padding: 20,
        paddingTop: 30
    },
    testContainer: {
        marginTop: 50,
        flexDirection: 'row'
    },
    user: {
        color: 'white',
        borderBottomWidth: 1,
        borderColor: 'grey',
        marginTop: 10,
        fontSize: 20
    }
});