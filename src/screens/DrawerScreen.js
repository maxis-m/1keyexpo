import React, {useContext} from 'react';import { View, StyleSheet} from 'react-native';
import { Avatar, Title, Caption, Paragraph, Drawer, Text, TouchableRipple, Switch } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { makeMutable } from 'react-native-reanimated';
import { Context as AuthContext } from '../context/AuthContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LandingScreen from './LandingScreen';
export function DrawerScreen(props) {
    const { state, signout } = useContext(AuthContext);
    return(
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection: 'row', marginTop:15}}>
                            <Avatar.Image 
                                source={require('../../assets/defaultAvi.jpg')}
                                size={50}
                            />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>User Profile</Title>
                                <Caption style={styles.caption}>@username</Caption>
                            </View>
                        </View>
                    </View>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size})=> (
                                <Icon 
                                    name='home-outline' 
                                    color={color} 
                                    size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => {props.navigation.navigate('Landing')}}
                        />
                        <DrawerItem 
                            icon={({color, size})=> (
                                <Icon 
                                    name='account-outline' 
                                    color={color} 
                                    size={size}
                                />
                            )}
                            label="Profile"
                            onPress={() => {props.navigation.navigate('Account')}}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size})=> (
                        <Icon 
                            name='exit-to-app' 
                            color={color} 
                            size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={signout}
                />
            </Drawer.Section>
        </View>
    );
}


const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3, 
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 16,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },   
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1,
    },
    preference:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});