import React, { useState, useEffect} from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import MapView, { Marker, Callout} from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

function Main({ navigation }){
    const [currentRegion,  setCurrentRegion] = useState(null);

    useEffect(() => {
        async function loadInitialPosition(){
           const { granted } = await requestPermissionsAsync();

           if(granted) {
               const { coords } = await getCurrentPositionAsync({
                   enableHighAccuracy: true,
               });

               const { latitude, longitude } = coords;

               setCurrentRegion({
                   latitude,
                   longitude,
                   latitudeDelta: 0.04,
                   longitudeDelta: 0.04,
               })
           }
        }
        
        loadInitialPosition();
    }, []);

    if (!currentRegion) {
        return null;
    }

    return (
        <MapView initialRegion={currentRegion} style={styles.map}>
            <Marker coordinate={{ latitude:-23.5544246, longitude:-46.8269466 }}>
                <Image style={styles.avatar} source={{ uri: 'https://avatars3.githubusercontent.com/u/49802471?s=460&v=4' }} />

                <Callout onPress={() => {
                    navigation.navigate('Profile', { github_username: 'dederios' });
                }}>
                    <View style={styles.callout}>
                        <Text style={styles.devName}>Daniel Rios </Text>
                        <Text style={styles.devBio}>Tenho 18 anos e sou estudante em Análise e desenvolvimento de sistemas na UMC (Universidade de Mogi das Cruzes) - Campus: Villa Lobos/Lapa. </Text>
                        <Text style={styles.devTechs}>HTML, CSS, JS</Text>
                    </View>

                </Callout>
            </Marker>
        </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#FFF'
    },

    callout: {
        width: 260,
    },

    devName: {
        fontWeight: 'bold',
        fontSize: 16,
    },

    devBio: {
        color: '#666',
        marginTop: 5,
    },

    devTechs: {
        marginTop: 5,
    }
})

export default Main;