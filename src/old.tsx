//   useEffect(() => {
//     userLoggedIn();
//     fetchId();
//     (async () => {
//       const mode = await getSoundMode();
//       const soundEffectsMode = await getSoundEffectsMode();
//       if (soundEffectsMode === "on") {
//         setSoundEffects(true);
//       } else {
//         setSoundEffects(false);
//       }
//       if (mode === "play") {
//         playSound();
//       }
//     })();
//   }, [render]);


//   useEffect(() => {
//     return sound
//       ? () => {
//           // @ts-expect-error TS(2339): Property 'unloadAsync' does not exist on type 'nev... Remove this comment to see the full error message
//           sound.unloadAsync();
//         }
//       : undefined;
//   }, [sound]);

//   const userLoggedIn = async () => {
//     let token = await AsyncStorage.getItem("token");
//     token ? setIsLoggedIn(true) : setIsLoggedIn(false);
//   };
//   // @ts-expect-error TS(7030): Not all code paths return a value.
//   const getSoundMode = async () => {
//     try {
//       const mode = await AsyncStorage.getItem("sound");
//       return mode;
//     } catch (ex) {
//       console.log(ex);
//     }
//   };

//   const playSound = async () => {
//     const { sound } = await Audio.Sound.createAsync(
//       require("./src/assets/sounds/backgroundSound.mp3"),
//       {
//         shouldPlay: true,
//         isLooping: true,
//       }
//     );
//     // @ts-expect-error TS(2345): Argument of type 'Sound' is not assignable to para... Remove this comment to see the full error message
//     setSound(sound);
//     await AsyncStorage.setItem("sound", "play");
//     await sound.playAsync();
//   };

//   const handleRender = () =>{
//     setRender(!render)
//   }
//   const fetchId = async () => {
//     const token = await AsyncStorage.getItem('token')
//     // @ts-expect-error TS(2345): Argument of type 'string | null' is not assignable... Remove this comment to see the full error message
//     setUserToken(token)
//     const user = await UserApi.GetProfileAsync(token, ip);
//     if (user.isError) {
//       console.log(user.error)
//       // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
//       setUserRole()
//         await AsyncStorage.removeItem('token')
//         await AsyncStorage.removeItem('heroId')
//         await AsyncStorage.removeItem('refreshToken')
//         await AsyncStorage.removeItem('scope')
//         await AsyncStorage.removeItem('tokenType')
//         await AsyncStorage.removeItem('tokenExpiration')
//     }
//     else{
//       setUserRole(user.data.role);
//     }
//     const id = await AsyncStorage.getItem("heroId");
//     // @ts-expect-error TS(2345): Argument of type 'string | null' is not assignable... Remove this comment to see the full error message
//     setHeroId(id);
//   };
//   const handleMusic = async () => {
//     if (sound) {
//       // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
//       setSound();
//       // @ts-expect-error TS(2339): Property 'unloadAsync' does not exist on type 'nev... Remove this comment to see the full error message
//       await sound.unloadAsync();
//       await AsyncStorage.setItem("sound", "stop");
//       // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
//       setSound();
//     } else {
//       await playSound();
//     }
//   };
//   const handleSoundEffects = useCallback( async () => {
//     if ((await getSoundEffectsMode()) === "on") {
//       await AsyncStorage.setItem("sound-effects", "off");
//       setSoundEffects(false);
//     } else {
//       await AsyncStorage.setItem("sound-effects", "on");
//       setSoundEffects(true);
//     }
//   }, []);
//   const styles = StyleSheet.create({
//     backgroundImage: {
//       flex: 1,
//     },
//     imageIcon: {
//       backgroundColor: "transparent",
//     },
//     drawerTextStyle: {
//       fontFamily: "BlackCastle",
//       fontSize: 22,
//       color: "white",
//     },
//     sound: {
//       bottom: 10,
//       paddingRight: 10,
//       paddingLeft: 10,
//       position: "absolute",
//       flexDirection: "row",
//       justifyContent: "space-between",
//       width: "100%",
//     },
//     soundEffect: {
//       bottom: 10,
//       left: 10,
//       position: "absolute",
//     },
//   });

//   const renderAppPerRole = () => {
//     if (userRole === "PLAYER") {
//       return (
//         <NavigationContainer
//           // @ts-expect-error TS(2322): Type 'RefObject<unknown>' is not assignable to typ... Remove this comment to see the full error message
//           ref={navigationRef}
//           // @ts-expect-error TS(2739): Type '{ background: string; }' is missing the foll... Remove this comment to see the full error message
//           theme={{ colors: { background: "transparent" } }}
//         >
//           <Drawer.Navigator
//             screenOptions={{
//               drawerStyle: {
//                 backgroundColor: "black",
//               },
//               drawerLabelStyle: styles.drawerTextStyle,
//               drawerActiveTintColor: "#7cc",
//             }}
//           >
//             <Drawer.Screen
//               name="Home"
//               component={Index}
//               options={{
//                 title: "Home",
//                 headerShown: false,
//                 drawerIcon: ({ focused, size }) => (
//                   <Icon
//                     name="home"
//                     size={20}
//                     color={focused ? "#7cc" : "#ccc"}
//                   />
//                 ),
//               }}
//               initialParams={{setLogoutModalVisible: setLogoutModalVisible}}
//             />

//             <Drawer.Screen
//               name="Characters"
//               options={{
//                 title: "Characters",
//                 headerShown: false,
//                 drawerIcon: ({ focused, size }) => (
//                   <Icon
//                     name="team"
//                     size={20}
//                     color={focused ? "#7cc" : "#ccc"}
//                   />
//                 ),
//               }}
//               component={Characters}
//             />
//             <Drawer.Screen
//               name="BuyGear"
//               options={{
//                 title: "Shop",
//                 headerShown: false,
//                 drawerIcon: ({ focused, size }) => (
//                   <MaterialCommunityIcons
//                     name="gold"
//                     size={20}
//                     color={focused ? "#7cc" : "#ccc"}
//                   />
//                 ),
//               }}
//               children={(e) => BuyGearScreen({navigation: e.navigation, heroId: heroId, userToken: userToken, appIp: ip})}
//             />
//             <Drawer.Screen
//               name="Map"
//               options={{
//                 title: "World Map",
//                 headerShown: false,
//                 drawerIcon: ({ focused, size }) => (
//                   <MaterialCommunityIcons
//                     name="map"
//                     size={20}
//                     color={focused ? "#7cc" : "#ccc"}
//                   />
//                 ),
//               }}
//               component={Map}
//             />
//             <Drawer.Screen
//               name="Chapters"
//               component={Chapters}
//               options={{
//                 title: "Chapters",
//                 headerShown: false,
//                 drawerIcon: ({ focused, size }) => (
//                   <MaterialCommunityIcons
//                     name={focused ? "book-open-page-variant-outline" : "book-outline"}
//                     size={20}
//                     color={focused ? "#7cc" : "#ccc"}
//                   />
//                 ),
//               }}
//               initialParams={{setLogoutModalVisible: setLogoutModalVisible}}
//             />
          
//             <Drawer.Screen
//               name="CharacterInfo"
//               component={CharacterInfo}
//               options={{
//                 title: "",
//                 headerShown: false,
//                 drawerItemStyle: { height: 0 },
//               }}
//             />
//             <Drawer.Screen
//               name="MyGear"
//               children={(e) => MyGearScreen({navigation: e.navigation, heroId: heroId})}
//               options={{
//                 title: "",
//                 headerShown: false,
//                 drawerItemStyle: { height: 0 },
//               }}
//             />
//             <Drawer.Screen
//               name="MyArsenal"
//               children={(e) => MyArsenalScreen({navigation: e.navigation, heroId: heroId})}
//               options={{
//                 title: "",
//                 headerShown: false,
//                 drawerItemStyle: { height: 0 },
//               }}
//             />
//               <Drawer.Screen
//               name="MyProperties"
//               children={(e) => MyPropertiesScreen({navigation: e.navigation, heroId: heroId})}
//               options={{
//                 title: "",
//                 headerShown: false,
//                 drawerItemStyle: { height: 0 },
//               }}
//             />
//             <Drawer.Screen
//               name="ImageView"
//               component={ImageView}
//               options={{
//                 title: "",
//                 headerShown: false,
//                 drawerItemStyle: { height: 0 },
//               }}
//             />
//             <Drawer.Screen
//               name="ChooseProfileImage"
//               component={ChooseProfileImage}
//               options={{
//                 title: "",
//                 headerShown: false,
//                 drawerItemStyle: { height: 0 },
//               }}
//             />
//              <Drawer.Screen
//               name="MyImages"
//               component={MyImagesScreen}
//               options={{
//                 title: "",
//                 headerShown: false,
//                 drawerItemStyle: { height: 0 },
//               }}
//             />
//             <Drawer.Screen
//               name="AddImages"
//               component={AddImagesScreen}
//               options={{
//                 title: "",
//                 headerShown: false,
//                 drawerItemStyle: { height: 0 },
//               }}
//             />
//           </Drawer.Navigator>
         
//         </NavigationContainer>
//       );
//     }
//     else if(userRole === "GAME MASTER"){
//       return(
//         <NavigationContainer
//           // @ts-expect-error TS(2322): Type 'RefObject<unknown>' is not assignable to typ... Remove this comment to see the full error message
//           ref={navigationRef}
//           // @ts-expect-error TS(2739): Type '{ background: string; }' is missing the foll... Remove this comment to see the full error message
//           theme={{ colors: { background: "transparent" } }}
//         >
//           <Drawer.Navigator
//             screenOptions={{
//               drawerStyle: {
//                 backgroundColor: "black",
//               },
//               drawerLabelStyle: styles.drawerTextStyle,
//               drawerActiveTintColor: "#7cc",
//             }}
//           >
//         <Drawer.Screen
//         name="Home"
//         component={Index}
//         options={{
//           title: "Home",
//           headerShown: false,
//           drawerIcon: ({ focused, size }) => (
//             <Icon
//               name="home"
//               size={20}
//               color={focused ? "#7cc" : "#ccc"}
//             />
//           ),
//         }}
//         initialParams={{setLogoutModalVisible: setLogoutModalVisible}}
//       />
      
//       </Drawer.Navigator>
//       </NavigationContainer>
//       )
//     }
//     else{
//     return  <NavigationContainer
//       // @ts-expect-error TS(2322): Type 'RefObject<unknown>' is not assignable to typ... Remove this comment to see the full error message
//       ref={navigationRef}
//       // @ts-expect-error TS(2739): Type '{ background: string; }' is missing the foll... Remove this comment to see the full error message
//       theme={{ colors: { background: "transparent" } }}
//     >
//       <Drawer.Navigator
//         screenOptions={{
//           drawerStyle: {
//             backgroundColor: "black",
//           },
//           drawerLabelStyle: styles.drawerTextStyle,
//           drawerActiveTintColor: "#7cc",
//         }}
//       >
//        <Drawer.Screen
//         name="Home"
//         component={Index}
//         options={{
//           title: "Home",
//           headerShown: false,
//           drawerIcon: ({ focused, size }) => (
//             <Icon
//               name="home"
//               size={20}
//               color={focused ? "#7cc" : "#ccc"}
//             />
//           ),
//         }}
//         initialParams={{setLogoutModalVisible: setLogoutModalVisible}}
//       />
//          </Drawer.Navigator>
//       </NavigationContainer>
//     }
//   };

//   if (!loaded) return <Text>Loading...</Text>;
//   if (!netInfo.isConnected) {
//     return (
//       <ImageBackground
//         style={styles.backgroundImage}
//         source={require("./src/assets/images/background2.jpg")}
//         resizeMode="cover"
//       >
//         // @ts-expect-error TS(2769): No overload matches this call.
//         {Alert.alert("Check your connection", "Renia seems unreachable")}
//       </ImageBackground>
//     );
//   }

//   return (
//     <ImageBackground
//       style={styles.backgroundImage}
//       source={require("./src/assets/images/background2.jpg")}
//       resizeMode="cover"
//     >
//       <PaperProvider>
//         {!isLoggedIn ? (
          
//            <NavigationContainer
//            // @ts-expect-error TS(2322): Type 'RefObject<unknown>' is not assignable to typ... Remove this comment to see the full error message
//            ref={navigationRef}
//            // @ts-expect-error TS(2739): Type '{ background: string; }' is missing the foll... Remove this comment to see the full error message
//            theme={{ colors: { background: "transparent" } }}
//          >

//            <Drawer.Navigator
//              screenOptions={{
//                drawerStyle: {
//                  backgroundColor: "black",
//                },
//                drawerLabelStyle: styles.drawerTextStyle,
//                drawerActiveTintColor: "#7cc",
//              }}
//            >
//           <Drawer.Screen
//                name="Login"
//                options={{
//                  title: "Login",
//                  headerShown: false,
//                  drawerIcon: ({ focused, size }) => (
//                    <MaterialCommunityIcons
//                      name="login"
//                      size={20}
//                      color={focused ? "#7cc" : "#ccc"}
//                    />
//                  ),
//                }}
//                children={(e) => LoginScreen({navigation: e.navigation, handleRender: handleRender})}
//              />
        
//        </Drawer.Navigator>
//        </NavigationContainer>
//         ) : (
//           renderAppPerRole()
//         )}
//       </PaperProvider>
//       <View style={styles.sound}>
//         <MaterialCommunityIcons
//           name={!sound ? "music-note-off" : "music-note"}
//           size={20}
//           onPress={handleMusic}
//         />
//         <MaterialCommunityIcons
//           name={soundEffects ? "volume-high" : "volume-off"}
//           size={20}
//           onPress={handleSoundEffects}
//         />
//       </View>

//       // @ts-expect-error TS(2786): 'LogOut' cannot be used as a JSX component.
//       <LogOut
//         setModalVisible={setLogoutModalVisible}
//         modalVisible={logoutModalVisible}
//         handleRender={handleRender}
//       />
//     </ImageBackground>
//   );
// }
// const MyPropertiesScreen = (props: any) => <MyProperties {...props} heroId={props.heroId} />;
// const MyImagesScreen = (props: any) => <MyImages {...props} />;
// const AddImagesScreen = (props: any) => <AddImages {...props} />;
// const LoginScreen = (props: any) => <Login {...props} handleRender={props.handleRender} />;
// const BuyGearScreen = (props: any) => <BuyGear {...props} heroId={props.heroId} token={props.userToken} ip={props.appIp} />;
// const MyGearScreen = (props: any) => <MyGear {...props} heroId={props.heroId} />;
// const MyArsenalScreen = (props: any) => <MyArsenal {...props} heroId={props.heroId} />;