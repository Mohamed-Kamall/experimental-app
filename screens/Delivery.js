import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import MapView , {
    PROVIDER_GOOGLE,Marker
} from 'react-native-maps'
import {useState , useEffect, useRef} from 'react';
import {COLORS,FONTS,SIZES,icons,GOOGLE_API_KEY,images} from '../constants'
import MapViewDirections from 'react-native-maps-directions'
import call from 'react-native-phone-call' 

const Delivery = ({route,navigation}) => {

    const mapView = useRef()

    const [restaurants, setRestaurants] = useState(null)
    const [currentLocation, setCurrentLocation] = useState(null)
    const [streetName,setStreetName] = useState("")
    const [fromLocation, setFromLocation] = useState(null)
    const [toLocation, setToLocation] = useState(null)
    const [region, setRegion] = useState(null)

    const [duration, setDuration] = useState(0)
    const [isReady, setIsReady] = useState(false)
    const [angle, setAngle] = useState(0)

    useEffect(() => {
        let {currentLocation,restaurants} = route.params;
        
        let fromLoc = restaurants.location
        let toLoc = currentLocation.gps
        let street = currentLocation.streetName

        let mapRegion = {
            latitude : (fromLoc.latitude + toLoc.latitude)/2,
            longitude : (fromLoc.longitude + toLoc.longitude)/2,
            latitudeDelta : Math.abs(fromLoc.latitude - toLoc.latitude)*2,
            longitudeDelta : Math.abs(fromLoc.longitude - toLoc.longitude)*2
        }

        setRestaurants(restaurants)
        setStreetName(street)
        setFromLocation(fromLoc)
        setToLocation(toLoc)
        setRegion(mapRegion)
    },[])

    function renderMap(){
        function destinationMarker(){
            return(
            <Marker
                coordinate={toLocation}
            >
                <View
                    style={{
                        height:40,
                        width:40,
                        borderRadius : 20,
                        alignItems : 'center',
                        justifyContent : 'center',
                        backgroundColor : COLORS.white
                    }}
                >
                    <View
                        style={{
                            height:30,
                            width:30,
                            borderRadius : 15,
                            alignItems : 'center',
                            justifyContent : 'center',
                            backgroundColor : '#19ccdf'
                        }}
                    >
                        <Image
                            source={icons.pin}
                            style={{
                                height:25,
                                width:25,
                                alignItems:'center',
                                justifyContent:'center',
                                tintColor: COLORS.white
                            }}
                        />

                    </View>
                </View>
            </Marker>        
            )}

            function carIcon(){
                return(
                    <Marker
                        coordinate = {fromLocation}
                        anchor = {{x: 0.5, y: 0.5}}
                        flat = {true}
                        rotation={angle}
                    >
                        <Image
                            source={icons.car}
                            style={{
                                height:25,
                                width:25,
                                
                            }}
                        />

                    </Marker>
                )
            }
            function calculateAngle(coordinates) {
                let startLat = coordinates[0]["latitude"]
                let startLng = coordinates[0]["longitude"]
                let endLat = coordinates[1]["latitude"]
                let endLng = coordinates[1]["longitude"]
                let dx = endLat - startLat
                let dy = endLng - startLng
        
                return Math.atan2(dy, dx) * 180 / Math.PI
            }
        return(
            <View style={{flex:1}}>
                <MapView
                    ref={mapView} 
                    style={{flex:1}}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={region}
                >
                    <MapViewDirections
                        origin={fromLocation}
                        destination={toLocation}
                        apikey={GOOGLE_API_KEY}
                        strokeWidth = {5}
                        strokeColor = {COLORS.primary}
                        optimizeWaypoints ={true}
                        onReady={result=>{
                            setDuration(result.duration)

                            if(!isReady){
                                mapView.current.fitToCoordinates(result.coordinates,{
                                    edgePadding :{
                                        right: (SIZES.width/20),
                                        bottom: (SIZES.height/4),
                                        left: (SIZES.width/20),
                                        top: (SIZES.height/8)
                                    }
                                })

                                let nextLoc = {
                                    latitude : result.coordinates[0]['latitude'],
                                    longitude : result.coordinates[0]['longitude']
                                }

                                if(result.coordinates.length >= 2){
                                    let angle = calculateAngle(result.coordinates)
                                    setAngle(angle)
                                }

                                setFromLocation(nextLoc)
                                setIsReady(true)   
                            }
                        }}
                    />
                    {destinationMarker()}
                    {carIcon()}
                </MapView>
            </View>
        )
    }

    function renderDestinationHeader(){
        return(
            <View style={{
                position : 'absolute',
                top : 50,
                right: 0,
                left: 0,
                height : 50,
                alignItems : 'center',
                justifyContent : 'center'
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems : 'center',
                    width : SIZES.width*0.9,
                    paddingVertical : SIZES.padding,
                    paddingHorizontal : SIZES.padding*2,
                    borderRadius : SIZES.radius,
                    backgroundColor : COLORS.white,
                }}>
                    <Image
                        source={icons.red_pin}
                        style ={{
                            width: 30,
                            height: 30,
                            marginRight: SIZES.padding
                        }}
                    />
                    <View style={{flex: 1}}>
                        <Text style={{...FONTS.body2}}>{streetName}</Text>
                    </View>
                    <Text style={{...FONTS.body2}}>{Math.ceil(duration)} min</Text>

                </View>

            </View>
        )

    }

    function renderDeliveryInfo(){

        const args ={
            number : restaurants?.courier.phoneNumber,
            prompt : false 
        }

        return(
            <View style={{
                position:'absolute',
                bottom: 50,
                left: 0,
                right: 0,
                alignItems: 'center',
                justifyContent :'center'
            }}>
                <View style={{
                    width : SIZES.width*0.9,
                    paddingHorizontal : SIZES.padding * 2,
                    paddingVertical : SIZES.padding * 3,
                    borderRadius : SIZES.radius ,
                    backgroundColor : COLORS.white
                }}>
                    <View style={{ flexDirection: 'row' , alignItems : 'center'}}>
                        <Image
                            source={restaurants?.courier.avatar}
                            style ={{
                                width : 60,
                                height : 60,
                                borderRadius : 30,
                            }}
                        />
                        <View style={{flex: 1 , marginLeft : SIZES.padding}}>
                            <View style={{ flexDirection: 'row' ,justifyContent : 'space-between'}}>
                                <Text style={{...FONTS.h4}}>{restaurants?.courier.name}</Text>
                                <View style={{ flexDirection: 'row' , alignItems: 'center'}}>
                                    <Image
                                        source={icons.star}
                                        style={{
                                            width : 20,
                                            height : 20,
                                            tintColor : COLORS.primary,
                                            marginRight: SIZES.padding
                                        }}
                                    />
                                    <Text style={{...FONTS.body2}}>{restaurants?.rating}</Text>
                                </View>
                            </View>
                            <Text style={{...FONTS.body5, color: COLORS.secondary}}>{restaurants?.name}</Text>
                        </View>
                        
                    </View>
                    <View style = {{flexDirection: 'row', alignItems :'center' ,justifyContent : 'center', marginTop : SIZES.padding*2}}>
                        <TouchableOpacity 
                            style={{
                                flex: 1,
                                paddingVertical : SIZES.padding ,
                                paddingHorizontal : SIZES.padding *2,
                                backgroundColor : COLORS.primary,
                                borderRadius : SIZES.radius *0.5,
                                alignItems : 'center',
                                justifyContent : 'center',
                                marginRight : SIZES.padding,
                                
                            }}
                            onPress = {()=> call(args)}
                        >
                            <Text style={{...FONTS.body3,color: COLORS.white}}>Call</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            flex: 1 ,
                            paddingVertical : SIZES.padding ,
                            paddingHorizontal : SIZES.padding *2 ,
                            backgroundColor : COLORS.secondary,
                            borderRadius : SIZES.radius * 0.5,
                            alignItems : 'center',
                            justifyContent : 'center',
                            marginLeft: SIZES.padding
                        }}>
                            <Text style={{...FONTS.body3}}>Message</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>
        )
    }
    return (
        <View style={{flex:1}}>
            {renderMap()}
            {renderDestinationHeader()}
            {renderDeliveryInfo()}
        </View>
    )
}

export default Delivery