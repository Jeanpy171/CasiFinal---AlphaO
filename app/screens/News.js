import { FlatList, RefreshControl, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View,} from 'react-native'
import React, { useCallback, useState } from 'react'
import MainHeader from '../components/MainHeader';
import { Image } from 'react-native';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Icon } from '@rneui/base';
import Lottie from 'lottie-react-native';
import { sizes } from '../const/CONST';
import LoaderAnimation from '../components/LoaderAnimation';

const News = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const token = AsyncStorage.getItem('token');
  const [publicidades,setPublicidades] = useState([]);
  const [refresh,setRefresh] = useState(false);
  const [showAnimation,setShowAnimation] = useState(false);
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const getPublishList = async () => {
    setShowAnimation(true)
    try {
        console.log("Recopilando publicidades")
        const response = await axios.get(
            'https://alphao2.herokuapp.com/api/alpha/publicidad/publ',
            { headers: { 'accept': 'application/json', 'authorization': await token } }
        );
        console.log(response.data.data.publ);
        setPublicidades(response.data.data.publ)
        setShowAnimation(false)
        //setRefresh(!refresh)
    } catch (e) {
        console.log(e)
        setShowAnimation(false)
        alert("Error al cargar las publicidades");
        }
    }

    useEffect(() => {
        getPublishList()
        console.log("PUBLICIDADES CARGADAS: ",publicidades)
    },[refresh])

    const RenderItemPublish = ({ item }) => {
        let fecha = item.evento.substring(0,10)
        let hora = item.evento.substring(11,19)
        console.log("PUBLICIDADES")
        console.log("FECHA:"+fecha)
        console.log("HORA:"+hora)
        return(
            <ScrollView horizontal={false} nestedScrollEnabled={true}>
            <View style={{alignItems:"center", justifyContent:"center",top:"0%",height:'100%'}}>
                <View style={{flex:10,height:450, padding:10,backgroundColor:"rgba(255, 228, 181,0.8)",width:"98%",marginBottom:5, borderRadius:5,marginBottom:15,}}>
                        <View style={{flex:1.1,height:"100%",alignItems:"center"}}>
                            <Text style={styles.title}>{item.titulo}</Text>
                            <View style={{flexDirection:'row',flex:0.5, paddingHorizontal:5}}>
                            <View style={{flex:1,height:"100%",}}>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={styles.titles}>Fecha: <Text style={styles.subtitle}>{fecha}  </Text></Text>
                                    <Text style={styles.titles}>Hora: <Text style={styles.subtitle}>{hora}</Text></Text>
                                </View>
                            </View>
                        </View>
                            <Text style={styles.subtitle}>{item.descripcion}</Text>
                        </View>
                        <View style={{flex:1.2}}>
                            <Image source={{uri:item.imagen}}style={{width:"100%",height:"100%",borderRadius:10,resizeMode:"stretch"}}/>
                        </View>
                        </View>
                </View>
        </ScrollView>
      )}

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    //setRefresh(!refresh)
    getPublishList()
    setShowAnimation(true)
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const GetPublish = () => {
    return(
        <View style={{justifyContent:"center",alignItems:'center',width:'100%',height:'100%'}}>
            <FlatList
                style={{bottom:"0.1%"}}
                keyExtractor={(item, index) => index.toString()}
                data={publicidades}
                renderItem={RenderItemPublish}
            />
        </View>
    )
    }

  return (
    <SafeAreaView style={styles.container}>
        <LoaderAnimation visible={showAnimation}/>
        <StatusBar hidden={false} />
        <MainHeader screen={"Ultimas novedades"} name={'ios-menu-outline'} onPress={() => navigation.openDrawer()}/>
        <ScrollView 
            nestedScrollEnabled={true}
            horizontal={false}
            refreshControl={
                <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                />
            }
            >
            <GetPublish/>
        </ScrollView>
    </SafeAreaView>
    
  )
}

export default News

const styles = StyleSheet.create({
    container: {
      //flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title:{
        //marginVertical:15,
        fontSize:15,
        //color:"#33576f",
        textAlign:'justify',
        //fontWeight:'bold',
        fontFamily: 'Poppins_800ExtraBold'
    },
    titles:{
        //marginVertical:20,
        fontSize:12,
        //color:"#33576f",
        textAlign:'justify',
        //fontWeight:'bold',
        fontFamily: 'Poppins_600SemiBold'
    },
    subtitle:{
        fontSize:12,
        //marginBottom: 10,
        //color:"#33576f",
        //marginVertical:10,
        textAlign:'justify',
        fontFamily: 'Poppins_400Regular'
    },
  })