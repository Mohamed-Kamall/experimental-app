import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { 
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    Image,
    FlatList 
} from 'react-native'
import { COLORS , icons , images , SIZES , FONTS } from '../constants'
import Geolocation from "react-native-geolocation-service"

const Home = ({navigation}) => {

      // Dummy Datas

      const initialCurrentLocation = {
        streetName: "client field",
        gps: {
            latitude: 31.252381,
            longitude: 29.976423,
            coordinates :[]
        }
    }

    const categoryData = [
        {
            id: 1,
            name: "Rice",
            icon: icons.rice_bowl,
        },
        {
            id: 2,
            name: "Noodles",
            icon: icons.noodle,
        },
        {
            id: 3,
            name: "Hot Dogs",
            icon: icons.hotdog,
        },
        {
            id: 4,
            name: "Salads",
            icon: icons.salad,
        },
        {
            id: 5,
            name: "Burgers",
            icon: icons.hamburger,
        },
        {
            id: 6,
            name: "Pizza",
            icon: icons.pizza,
        },
        {
            id: 7,
            name: "Snacks",
            icon: icons.fries,
        },
        {
            id: 8,
            name: "Sushi",
            icon: icons.sushi,
        },
        {
            id: 9,
            name: "Desserts",
            icon: icons.donut,
        },
        {
            id: 10,
            name: "Drinks",
            icon: icons.drink,
        },

    ]

    // price rating
    const affordable = 1
    const fairPrice = 2
    const expensive = 3

    const restaurantData = [
        {
            id: 1,
            name: "ByProgrammers Burger",
            rating: 4.8,
            categories: [5, 7],
            priceRating: affordable,
            photo: images.burger_restaurant_1,
            duration: "30 - 45 min",
            location: {
                RestaurantStreetName : "restaurant owner field",
                latitude: 31.250006,
                longitude: 29.975421,
            },
            courier: {
                avatar: images.avatar_1,
                name: "Amy",
                phoneNumber : '01096368747'
            },
            menu: [
                {
                    menuId: 1,
                    name: "Crispy Chicken Burger",
                    photo: images.crispy_chicken_burger,
                    description: "Burger with crispy chicken, cheese and lettuce",
                    calories: 200,
                    price: 10
                },
                {
                    menuId: 2,
                    name: "Crispy Chicken Burger with Honey Mustard",
                    photo: images.honey_mustard_chicken_burger,
                    description: "Crispy Chicken Burger with Honey Mustard Coleslaw",
                    calories: 250,
                    price: 15
                },
                {
                    menuId: 3,
                    name: "Crispy Baked French Fries",
                    photo: images.baked_fries,
                    description: "Crispy Baked French Fries",
                    calories: 194,
                    price: 8
                }
            ]
        },
        {
            id: 2,
            name: "ByProgrammers Pizza",
            rating: 4.8,
            categories: [2, 4, 6],
            priceRating: expensive,
            photo: images.pizza_restaurant,
            duration: "15 - 20 min",
            location: {
                latitude: 31.252923,
                longitude: 29.974543,
            },
            courier: {
                avatar: images.avatar_2,
                name: "Jackson"
            },
            menu: [
                {
                    menuId: 4,
                    name: "Hawaiian Pizza",
                    photo: images.hawaiian_pizza,
                    description: "Canadian bacon, homemade pizza crust, pizza sauce",
                    calories: 250,
                    price: 15
                },
                {
                    menuId: 5,
                    name: "Tomato & Basil Pizza",
                    photo: images.pizza,
                    description: "Fresh tomatoes, aromatic basil pesto and melted bocconcini",
                    calories: 250,
                    price: 20
                },
                {
                    menuId: 6,
                    name: "Tomato Pasta",
                    photo: images.tomato_pasta,
                    description: "Pasta with fresh tomatoes",
                    calories: 100,
                    price: 10
                },
                {
                    menuId: 7,
                    name: "Mediterranean Chopped Salad ",
                    photo: images.salad,
                    description: "Finely chopped lettuce, tomatoes, cucumbers",
                    calories: 100,
                    price: 10
                }
            ]
        },
        {
            id: 3,
            name: "ByProgrammers Hotdogs",
            rating: 4.8,
            categories: [3],
            priceRating: expensive,
            photo: images.hot_dog_restaurant,
            duration: "20 - 25 min",
            location: {
                latitude: 31.272024,
                longitude: 30.018460,
            },
            courier: {
                avatar: images.avatar_3,
                name: "James"
            },
            menu: [
                {
                    menuId: 8,
                    name: "Chicago Style Hot Dog",
                    photo: images.chicago_hot_dog,
                    description: "Fresh tomatoes, all beef hot dogs",
                    calories: 100,
                    price: 20
                }
            ]
        },
        {
            id: 4,
            name: "ByProgrammers Sushi",
            rating: 4.8,
            categories: [8],
            priceRating: expensive,
            photo: images.japanese_restaurant,
            duration: "10 - 15 min",
            location: {
                latitude: 31.2346938,
                longitude: 29.983388,
            },
            courier: {
                avatar: images.avatar_4,
                name: "Ahmad"
            },
            menu: [
                {
                    menuId: 9,
                    name: "Sushi sets",
                    photo: images.sushi,
                    description: "Fresh salmon, sushi rice, fresh juicy avocado",
                    calories: 100,
                    price: 50
                }
            ]
        },
        {
            id: 5,
            name: "ByProgrammers Cuisine",
            rating: 4.8,
            categories: [1, 2],
            priceRating: affordable,
            photo: images.noodle_shop,
            duration: "15 - 20 min",
            location: {
                latitude: 31.276933,
                longitude: 30.008860,
            },
            courier: {
                avatar: images.avatar_4,
                name: "Muthu"
            },
            menu: [
                {
                    menuId: 10,
                    name: "Kolo Mee",
                    photo: images.kolo_mee,
                    description: "Noodles with char siu",
                    calories: 200,
                    price: 5
                },
                {
                    menuId: 11,
                    name: "Sarawak Laksa",
                    photo: images.sarawak_laksa,
                    description: "Vermicelli noodles, cooked prawns",
                    calories: 300,
                    price: 8
                },
                {
                    menuId: 12,
                    name: "Nasi Lemak",
                    photo: images.nasi_lemak,
                    description: "A traditional Malay rice dish",
                    calories: 300,
                    price: 8
                },
                {
                    menuId: 13,
                    name: "Nasi Briyani with Mutton",
                    photo: images.nasi_briyani_mutton,
                    description: "A traditional Indian rice dish with mutton",
                    calories: 300,
                    price: 8
                },

            ]
        },
        {

            id: 6,
            name: "ByProgrammers Dessets",
            rating: 4.9,
            categories: [9, 10],
            priceRating: affordable,
            photo: images.kek_lapis_shop,
            duration: "35 - 40 min",
            location: {
                latitude: 31.197833,
                longitude: 29.933227,
            },
            courier: {
                avatar: images.avatar_1,
                name: "Jessie"
            },
            menu: [
                {
                    menuId: 12,
                    name: "Teh C Peng",
                    photo: images.teh_c_peng,
                    description: "Three Layer Teh C Peng",
                    calories: 100,
                    price: 2
                },
                {
                    menuId: 13,
                    name: "ABC Ice Kacang",
                    photo: images.ice_kacang,
                    description: "Shaved Ice with red beans",
                    calories: 100,
                    price: 3
                },
                {
                    menuId: 14,
                    name: "Kek Lapis",
                    photo: images.kek_lapis,
                    description: "Layer cakes",
                    calories: 300,
                    price: 20
                }
            ]

        }


    ]

    const [categories, setCategories] = React.useState(categoryData)
    const [selectedCategory, setSelectedCategory] = React.useState(null)
    const [restaurants, setRestaurants] = React.useState(restaurantData)
    const [currentLocation, setCurrentLocation] = React.useState(initialCurrentLocation)



    function renderHeader() {
        return (
            <View style={{flexDirection : 'row' , height: 50 , marginTop:SIZES.padding * 4}}>
                <TouchableOpacity
                    style ={{
                        width: 50,
                        paddingLeft: SIZES.padding * 3,
                        justifyContent :'center' 
                    }} 
                >
                    <Image
                        source = {icons.nearby}
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
                        backgroundColor : COLORS.white,
                        alignItems :'center',
                        justifyContent :'center',
                        borderRadius : SIZES.radius
                    }}>
                        <Text style={{...FONTS.h4}}>{currentLocation.streetName}</Text>
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
                        source = {icons.basket}
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

    const onSelectCategory = (cat) =>{
        let RestaurantList = restaurantData.filter(a => a.categories.includes(cat.id))

        setRestaurants(RestaurantList)
        setSelectedCategory(cat)
    }

    const getCategoryById = (id) =>{
        let category = categories.filter(a=>a.id==id)

        if(category.length > 0){
            return category[0].name
        }
        return ''
    }

    function renderMainCategories() {

        const renderCategoryItem = ({item}) => {
            return (
                <TouchableOpacity
                    style={{
                        padding: SIZES.padding ,
                        paddingBottom: SIZES.padding * 2,
                        backgroundColor : (selectedCategory?.id == item.id)? COLORS.primary : COLORS.white,
                        borderRadius : SIZES.radius,
                        alignItems : 'center',
                        justifyContent : 'center',
                        marginRight : SIZES.padding,
                        ...styles.shadow
                    }}
                    onPress = {()=>onSelectCategory(item)}
                >
                    <View style ={{
                        width: 50,
                        height: 50,
                        borderRadius : 25,
                        alignItems :'center',
                        justifyContent : 'center',
                        backgroundColor : (selectedCategory?.id == item.id)? COLORS.white : COLORS.lightGray3,
                    }}>
                        <Image 
                            source={item.icon}
                            resizeMode = 'contain'
                            style ={{
                                width: 30,
                                height: 30,
                            }}
                        />
                        
                    </View>
                    <Text style={{
                                marginTop : SIZES.padding,
                                color : (selectedCategory?.id == item.id)? COLORS.white : "black",
                                ...FONTS.body5
                            }}
                    >{item.name}
                    </Text>
                </TouchableOpacity>
            )
        }

        return (
            <View style={{padding: SIZES.padding * 2}}>
                <Text style={{...FONTS.h2}}>Main</Text>
                <Text style={{...FONTS.h2}}>Categories</Text>


                <FlatList
                    data={categories}
                    horizontal
                    showsHorizontalScrollIndicator = {false}
                    keyExtractor = {item=>`${item.id}`}
                    renderItem={renderCategoryItem}
                    contentContainerStyle={{paddingVertical : SIZES.padding * 2}}

                />
            </View>
        )
    }

    function renderRestaurantList() {
        function renderRestaurantItem({item}){
            return(
                    <TouchableOpacity
                        style={{
                            marginBottom : SIZES.padding * 2
                        }}
                        onPress = {()=>navigation.navigate('Restaurant',{
                            item ,currentLocation
                        })}
                    >
                        <View style={{marginBottom: 10}}>
                            <Image
                                source={item.photo}
                                resizeMode = 'cover'
                                style = {{
                                    height: 200 ,
                                    width:'100%' ,
                                    borderRadius : SIZES.radius
                                }}
                            />
                                <View style={{
                                position : 'absolute',
                                bottom: 0,
                                borderTopRightRadius : SIZES.radius,
                                borderBottomLeftRadius : SIZES.radius,
                                height: 50,
                                width: SIZES.width * 0.3,
                                backgroundColor : COLORS.white,
                                justifyContent : 'center',
                                alignItems : 'center',
                                ...styles.shadow
                            }}>
                                <Text style={{...FONTS.body3}}>
                                    {item.duration}
                                </Text>
                            </View>
                        </View>
                        
                        <Text style={{...FONTS.h2}}> {item.name} </Text>
                        <View style={{
                            marginTop : SIZES.padding,
                            flexDirection : 'row',
                        }}>
                            <Image
                                source = {icons.star}
                                style ={{
                                    height: 20,
                                    width: 20,
                                    tintColor : COLORS.primary,
                                    marginRight : 10
                                }}  
                            />
                            <Text style={{...FONTS.body3}}>{item.rating}</Text>
                            <View style={{
                                flexDirection :'row',
                                marginLeft: 10,
                            }}> 
                                {
                                    item.categories.map(categoryId=>{
                                        return(
                                            <View style={{
                                                flexDirection : 'row',}}
                                                key = {categoryId}
                                            >
                                                <Text style={{...FONTS.body3}}>{getCategoryById(categoryId)}</Text>
                                                <Text style={{...FONTS.body3, color:COLORS.darkgray}}> .. </Text>
                                            </View>
                                        )
                                            
                                    })
                                }
                                {
                                    [1,2,3].map(a=>(
                                        <Text
                                            key={a}
                                            style={{
                                                ...FONTS.body3,
                                                color : (a <= item.priceRating)? COLORS.black : COLORS.darkgray,
                                            }}
                                        >$</Text>
                                    ))
                                }
                            </View>
                            
                        </View>
                    </TouchableOpacity>   
            )
        }
        return(
                <FlatList
                    data={restaurants}
                    showsVerticalScrollIndicator = {false}
                    keyExtractor = {item=>`${item.id}`}
                    renderItem = {renderRestaurantItem}
                    contentContainerStyle = {{
                        paddingHorizontal : SIZES.padding * 2,
                        paddingBottom : 30
                    }} />
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderMainCategories()}
            {renderRestaurantList()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray3
    },
    shadow: {
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

export default Home 