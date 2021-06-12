import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, Alert, LogBox, TouchableOpacity } from 'react-native';
import { Button, Input } from 'react-native-elements';
import firebase from 'firebase';
import 'firebase/firestore';

export interface User {
    name: string;
    points: number;
    id: string;
}

export function HomeScreen () {

    //Variaveis e Constantes
    const nav = useNavigation();
    const [ name, setName ] = useState('');
    const [ points, setPoints ] = useState(0);
    const [ users, setUsers ] = useState<User[]>([]) 
    const db = firebase.firestore().collection('users');

    LogBox.ignoreLogs(['Setting a timer']);

    //Ações
    const quit = async() => {
        nav.navigate('login');
        firebase.auth().signOut();
    }

    const insert = async() => {
        console.log("Nome: ", name);
        console.log("Pontos: ", points);

        const doc = await db.doc();
        db.doc(doc.id).set({id: doc.id, name, points})
           .then(() => {
                Alert.alert('Sucesso', 'Inserido com sucesso');
                setName('')
                setPoints(0);
            }).catch(erro => {
                console.log('Erro')
                Alert.alert('Erro', 'Erro ao inserir');
            })

    }

    const getUsers = async() => {
        db.get().then((results) => {
            let newUsers: any[] = [];
            results.forEach(snapshot => {
                newUsers.push(snapshot.data())
            })
            setUsers(newUsers)
        })
    }

    const remove = async(user: User) => {

        Alert.alert('Remover', `Deseja realmente remover ${user.name}?`, [
            {text: 'Não'},
            {text: 'Sim', onPress: async () => {
                await db.doc(user.id).delete();
                getUsers();
            }}
        ])
    }

    //Render
    return (
      <View style={styles.container}>
         
         <Text style={styles.welcome}>Bem vindo! {firebase.auth().currentUser?.email}</Text>
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
                <TouchableOpacity key={String(index)} onPress={() => remove(user)}>
                    <Text  style={styles.user}>{user.name} - {user.points}</Text>
                </TouchableOpacity>
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
    welcome: {
        fontSize: 20,
        marginTop: 10,
        textAlign:'center'
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