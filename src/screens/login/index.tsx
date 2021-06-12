import { useNavigation } from '@react-navigation/core';
import { Formik } from 'formik';
import * as React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import * as Yup from 'yup';
import { Input } from 'react-native-elements';
import { Button } from 'react-native-elements';
import firebase from 'firebase';
import { ToastAndroid } from 'react-native';

interface FormData {
    email: string;
    password: string;
}

export function LoginScreen () {
    
    //Variaveis e Constantes
    const nav = useNavigation();

    //Ações 
    const signIn = async (data: FormData) => {
        console.log('Login:', data);
        const { email, password } = data;

        await firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => nav.navigate('home'))
            .catch(() => Alert.alert('Erro', 'Falha ao logar usuário'))
    }

    const signUp = async (data: FormData) => {
        console.log('Cadastro:', data);
        const { email, password } = data;

        await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                ToastAndroid.show('Conta criada com sucesso', ToastAndroid.SHORT);
                nav.navigate('home')
            })
            .catch(() => Alert.alert('Erro', 'Não foi possivel criar essa conta'))

    }
    
    //Render
    return (
      <View style={styles.container}>

        <Formik
            initialValues={{email: '', password: '', button: 1}}
            validationSchema={Yup.object({
                email: Yup.string().required('Campo é obrigatório').email('Campo necessita ser um email'),
                password: Yup.string().required('Campo é obrigatório').min(6, 'Necessita pelo menos 6 caracteres')
            })}
            onSubmit={async (values) => (values.button == 1 ? await signIn(values) : await signUp(values))}
        >
            {({values, handleChange, errors, handleSubmit, setFieldValue}) => (
                <>
                    {/* INPUTS */}
                    <View style={styles.formContainer}>
                        <Input value={values.email} errorMessage={errors.email} inputContainerStyle={styles.inputContainer} placeholder="Email" keyboardType="email-address" onChangeText={handleChange("email")}/>
                        <View style={styles.hr} />
                        <Input value={values.password}  errorMessage={errors.password} inputContainerStyle={styles.inputContainer} secureTextEntry keyboardType="number-pad" placeholder="Senha" onChangeText={handleChange("password")}/>
                    </View>

                    {/* BUTTONS */}
                    <View style={styles.btns}>
                        <Button title="Logar" buttonStyle={styles.signIn} containerStyle={{flex:1}} onPress={() => {setFieldValue('button', 1); handleSubmit()}} />
                        <Button title="Cadastrar"  buttonStyle={styles.signUp} containerStyle={{flex:1}} onPress={() => {setFieldValue('button', 2); handleSubmit()}} />
                    </View>
                </>
            )}
        </Formik>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'tomato',
        padding: 20
    },
    formContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
    },
    inputContainer: {
        borderBottomWidth: 0,
        marginBottom: -10
    },
    hr: {
        borderWidth: 1,
        borderColor: 'lightgrey'
    },
    btns: {
        flexDirection: 'row',
        marginTop: 20,
    },
    signUp: {
        backgroundColor: 'red'
    },
    signIn: {
        backgroundColor: 'orange',
    }
});
