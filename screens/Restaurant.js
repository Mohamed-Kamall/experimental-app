import React from 'react'
import {useState , useEffect} from 'react'
import { 
    View,
     Text,
     SafeAreaView,
     TouchableOpacity,
     StyleSheet,
     Image,
     Animated 
    } from 'react-native'
import { COLORS , icons , images , SIZES , FONTS } from '../constants'
import {isIphoneX} from 'react-native-iphone-x-helper'
import { NavigationContainer } from '@react-navigation/native'

const Restaurant = ({route,navigation}) => {

    const scrollX = new Animated.Value(0)
    const [restaurants, setRestaurants] = useState(null)
    const [currentLocation, setCurrentLocation] = useState(null)

    useEffect(() => {
        let {currentLocation,item} = route.params;
        setRestaurants(item)
        setCurrentLocation(currentLocation)  
    })

    const renderHeader = () =>{
        return(
            <View style={{flexDirection : 'row' , height: 50 , marginTop:SIZES.padding * 4}}>
                <TouchableOpacity
                    style ={{
                        width: 50,
                        paddingLeft: SIZES.padding * 3,
                        justifyContent :'center' 
                    }} 
                    onPress = {()=>navigation.goBack('Home')}
                >
                    <Image
                        source = {icons.back}
                        resizeMode ='contain'
                        style ={{
                            width: 30,
                            height: 30
                        }}
                    />
                </TouchableOpacity>
                <View style={{flex:1 ,alignItems:'center' ,justifyContent:'center'}}>
                    <View style={{
                        width:'70%',
                        height: '100%',
                        backgroundColor : COLORS.lightGray3,
                        alignItems :'center',
                        justifyContent :'center',
                        borderRadius : SIZES.radius
                    }}>
                        <Text style={{...FONTS.body3}}>{restaurants?.name}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style ={{
                        width: 50,
                        paddingRight: SIZES.padding * 3,
                        justifyContent :'center' 
                    }} 
                >
                    <Image
                        source = {icons.list}
                        resizeMode ='contain'
                        style ={{
                            width: 30,
                            height: 30,
                            tintColor:COLORS.primary
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    const [orderItems, setOrderItems] = useState([])

    const editOrder = (action,menuId,price) => { 
        let orderList = orderItems.slice();
        let item = orderList.filter(a => a.menuId == menuId)
        if(action=='+'){  
            if(item.length>0){
                let newQty = item[0].qty + 1
                item[0].qty = newQty
                item[0].total = item[0].qty * price 
            } else{
                const newItem = {
                    menuId : menuId,
                    qty : 1,
                    price : price,
                    total : price
                }
                orderList.push(newItem)
            } setOrderItems(orderList)
        } else {
            if(item.length>0){
                if(item[0]?.qty > 0){
                    let newQty = item[0].qty - 1
                    item[0].qty = newQty
                    item[0].total = item[0].qty * price  
                }
            }   
            setOrderItems(orderList) 
            
        } console.log(orderItems)
    }

    const getOrderQty = (menuId) =>{
        let orderItem = orderItems.filter(a=>a.menuId==menuId)
        if(orderItem.length>0){
            return orderItem[0].qty
        }  
        else {
            return 0
        }
    }

    const getBasketItemCount = () =>{
        const itemCount = orderItems.reduce((a,b) => a+(b.qty || 0),0)
        return itemCount
    }

    const getTotalBasketPrice = () => {
        const basketPrice = orderItems.reduce((a,b)=>a + (b.total ||0),0)
        return basketPrice.toFixed(2)
    }

    const renderFoodInfo = () =>{
        return(
            <Animated.ScrollView
                horizontal
                pagingEnabled
                scrollEventThrottle = {16}
                snapToAlignment = 'center'
                showsHorizontalScrollIndicator = {false}
                onScroll = {Animated.event([
                    {nativeEvent :{contentOffset : {x:scrollX}}}
                ],{useNativeDriver:false})}
            >
                {
                    restaurants?.menu.map((item,index)=>(
                        <View
                            key={`menu-${index}`}
                            style = {{alignItems:'center', paddingTop:SIZES.padding * 2}}
                        >
                            <View 
                                style={{height: SIZES.height*0.35}}
                            >
                                <Image
                                    source={item.photo}
                                    resizeMode='contain'
                                    style={{
                                        width:SIZES.width,
                                        height:'100%',
                                        borderRadius : 80
                                    }}
                                />
                                <View
                                    style={{
                                        position:'absolute',
                                        bottom: -20,
                                        width : SIZES.width,
                                        height : 50,
                                        justifyContent :'center',
                                        flexDirection :'row'
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={()=>editOrder("-",item.menuId,item.price)}
                                        style={{
                                            width : 50,
                                            backgroundColor :(getOrderQty(item.menuId)==1)? COLORS.lightGray : COLORS.white,
                                            alignItems:'center',
                                            justifyContent:'center',
                                            borderTopLeftRadius : 25,
                                            borderBottomLeftRadius : 25,
                                            ...Styles.shadow
                                        }}
                                    >
                                        <Text style={{...FONTS.body1}}> - </Text>
                                    </TouchableOpacity>
                                    <View
                                        style={{
                                            width:60,
                                            backgroundColor:COLORS.white,
                                            alignItems:'center',
                                            justifyContent:'center',
                                            ...Styles.shadow
                                        }}
                                    >
                                        <Text style={{...FONTS.body1}}>{getOrderQty(item.menuId)}</Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={()=>editOrder("+",item.menuId,item.price)}
                                        style={{
                                            width : 50,
                                            backgroundColor : COLORS.white,
                                            alignItems:'center',
                                            justifyContent:'center',
                                            borderTopRightRadius : 25,
                                            borderBottomRightRadius : 25,
                                            ...Styles.shadow
                                        }}
                                    >
                                        <Text style={{...FONTS.body1}}> + </Text>
                                    </TouchableOpacity>

                                </View>

                            </View>

                            <View style={{
                                width : SIZES.width,
                                alignItems : 'center',
                                marginTop : 15,
                                paddingHorizontal : SIZES.padding * 2,

                            }}>
                                <Text style={{...FONTS.h2 , marginVertical:10 , textAlign:'center'}}>{item.name} - {item.price.toFixed(2)} </Text>
                                <Text style={{...FONTS.body3 , marginVertical:10 , textAlign:'center'}}>{item.description}</Text>
                            </View>
                            <View style={{
                                flexDirection:'row',
                                justifyContent:'center',
                                alignItems:'center',
                                paddingHorizontal : SIZES.padding * 2
                            }}>
                                <Image
                                    source={icons.fire}
                                    resizeMode='contain'
                                    style={{
                                        width: 25,
                                        height: 25,
                                    }}
                                />
                                <Text style={{...FONTS.body3, color:COLORS.darkgray}}>  {item.calories.toFixed(2)} cal</Text>
                            </View>

                        </View>
                    ))
                }
            </Animated.ScrollView>
        )
    }

    const renderDots = () => {
        const dotPosition = Animated.divide(scrollX,SIZES.width)

        return(
            <View style={{
                height: 30
            }}>
                <View style={{
                    flexDirection : 'row',
                    alignItems :'center',
                    justifyContent :'center',
                    height : SIZES.padding,
                }}>
                    {restaurants?.menu.map((item,index)=>{

                        const opacity = dotPosition.interpolate({
                            inputRange : [index - 1 ,index ,index + 1],
                            outputRange : [0.3,1,0.3],
                            extrapolate : 'clamp'
                        })

                        const dotSize = dotPosition.interpolate({
                            inputRange : [index - 1 ,index ,index + 1],
                            outputRange : [SIZES.base * 0.8, 10, SIZES.base * 0.8],
                            extrapolate : 'clamp'
                        })

                        const dotColor = dotPosition.interpolate({
                            inputRange : [index - 1 ,index ,index + 1],
                            outputRange : [COLORS.darkgray , COLORS.primary , COLORS.darkgray],
                            extrapolate : 'clamp'
                        })
                        return(
                            <Animated.View
                                key={`dot-${index}`}
                                opacity = {opacity}
                                style = {{
                                    borderRadius : SIZES.radius,
                                    marginHorizontal : 6,
                                    width : dotSize,
                                    height : dotSize,
                                    backgroundColor : dotColor,
                                }}
                            />
                        )
                        })}

                </View>

            </View>
        )
    }

    const renderOrder = () =>{
        return(
            <View>
                {
                    renderDots()
                }
                <View
                    style={{
                        backgroundColor: COLORS.white,
                        borderTopLeftRadius: 40,
                        borderTopRightRadius: 40
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingVertical: SIZES.padding * 2,
                            paddingHorizontal: SIZES.padding * 3,
                            borderBottomColor: COLORS.lightGray2,
                            borderBottomWidth: 1
                        }}
                    >
                        <Text style={{ ...FONTS.h3 }}> {getBasketItemCount()} items in Cart</Text>
                        <Text style={{ ...FONTS.h3 }}>{getTotalBasketPrice()}$</Text>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingVertical: SIZES.padding * 2,
                            paddingHorizontal: SIZES.padding * 3
                        }}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <Image
                                source={icons.pin}
                                resizeMode="contain"
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: COLORS.darkgray
                                }}
                            />
                            <Text style={{ marginLeft: SIZES.padding, ...FONTS.h4 }}>{restaurants?.location.RestaurantStreetName}</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Image
                                source={icons.master_card}
                                resizeMode="contain"
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: COLORS.darkgray
                                }}
                            />
                            <Text style={{ marginLeft: SIZES.padding, ...FONTS.h4 }}>8888</Text>
                        </View>
                    </View>

                    {/* Order Button */}
                    <View
                        style={{
                            padding: SIZES.padding * 2,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <TouchableOpacity
                            onPress = {()=>navigation.navigate('Delivery',{
                                restaurants : restaurants,
                                currentLocation : currentLocation
                            })}
                            style={{
                                width: SIZES.width * 0.9,
                                padding: SIZES.padding,
                                backgroundColor: COLORS.primary,
                                alignItems: 'center',
                                borderRadius: SIZES.radius
                            }}
                        >
                            <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Order</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        )
    }





    return (
        <SafeAreaView style={Styles.container}>
            {renderHeader()}
            {renderFoodInfo()}
            {renderOrder()}
        </SafeAreaView>
    )
}

const Styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor: COLORS.lightGray4
    },
    shadow : {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1,
    }
})


export default Restaurant 