import { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { CartAndMoney } from "../components/cartAndMoney";
import { Cart } from "../components/cart";
import { GoodCategory } from "../components/goodCategory";
import { useIsFocused } from "@react-navigation/native";
import { GoodAndServices } from "../components/goodAndServices";
import { Shop } from "../components/shop";
import IonIcon from "react-native-vector-icons/Ionicons";
import { WeaponsShop } from "../components/weaponsShop";
import { WeaponsCategory } from "../components/weaponsCategory";
import { globalStyles } from "../utils/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CharacterApi from "../dist/api/CharacterApi";

export const BuyGear = (props) => {
  const isFocused = useIsFocused();
  const [heroId, setHeroId] = useState();
  const [money, setMoney] = useState();
  const [cart, setCart] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [shopVisible, setShopVisible] = useState(true);
  const [category, setCategory] = useState("");
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const [render, setRender] = useState("shop");
  const [ip, setIp] = useState();
  const [token, setToken] = useState();
  const goodCategories = [
    "Adventure Gear",
    "Special Substances",
    "Tools And Skill Kits",
    "Clothing",
    "Food Drink And Lodging",
    "Mounts And Related Gear",
    "Transport",
    "SpellCasting And Services",
  ];
  const weaponCategories = [
    "Simple Weapons",
    "Martial Weapons",
    "Exotic Weapons",
  ];
  
  useEffect(() => {
    fetchConstants();
    fetchId();
    getMoney();
    setShopVisible(true);
    setRender("shop");
  }, [isFocused]);


  const fetchConstants = async () =>{
    const token = await AsyncStorage.getItem("token");
    const ip = await AsyncStorage.getItem("ip");
    setIp(ip);
    setToken(token);
  }
  const fetchId = async () => {
    if (!props.heroId) {
      const id = await AsyncStorage.getItem("heroId");
      setHeroId(id);
      return;
    }
    setHeroId(props.heroId);
  };

  const getMoney = async () => {
      const fetchMoney = await CharacterApi.GetMoneyAsync(token, ip, props.heroId);
      if(fetchMoney.isError){
        console.log(fetchMoney.error, 'BuyGear Screen')
        setMoney({
          gold: 0,
          silver: 0,
          copper: 0
        })
        return;
      }
      let moneyArr = fetchMoney.data.quantity.toFixed(2);
      const gold = moneyArr.split(".")[0];
      const silver = moneyArr.split(".")[1][0];
      const copper = moneyArr.split(".")[1][1];
      const money = {
        id: fetchMoney.id,
        gold: gold,
        silver: silver,
        copper: copper,
      };
      setMoney(money);
  };
  const deleteItemFromCart = (name) => {
    const doesItemExist = cart.find((item) => item.name === name);
    if (doesItemExist) {
      return setCart((cartItems) =>
        cartItems.filter((item) => item.name !== name)
      );
    }
  };
  const removeItemFromCart = (name) => {
    const doesItemExist = cart.find((item) => item.name === name);
    if (doesItemExist) {
      if (doesItemExist.quantity < 2) {
        return setCart((cartItems) =>
          cartItems.filter((item) => item.name !== name)
        );
      }
      return setCart((itemCart) => {
        const newCart = itemCart.map((item) => {
          if (item.name === name) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }
          return item;
        });
        return newCart;
      });
    }
  };
  const addItemToCart = (name, cost, weight) => {
    if (cart.length === 0) {
      return setCart((prevCart) => [
        ...prevCart,
        { name: name, cost: cost, weight: weight, quantity: 1 },
      ]);
    }
    const doesItemExist = cart.find((item) => item.name === name);
    if (doesItemExist) {
      return setCart((itemCart) => {
        const newCart = itemCart.map((item) => {
          if (item.name === name) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        });
        return newCart;
      });
    } else {
      return setCart((prevCart) => [
        ...prevCart,
        { name: name, cost: cost, weight: weight, quantity: 1 },
      ]);
    }
  };

  const styles = StyleSheet.create({
    welcomeStyle: {
      borderRadius: 5,
      fontSize: 30,
      textAlign: "center",
      backgroundColor: "rgba(16,36,69,0.95)",
      borderRadius: 15,
    },
    container: {
      flex: 10,
      width: "80%",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "20%",
    },
    equipment: {
      flex: 1,
      justifyContent: "space-evenly",
      margin: 20,
      alignItems: "center",
    },
    selection: {
      alignItems: "center",
      padding: 10,
    },
    itemCard: {
      margin: 10,
      width: "80%",
    },
    cartAndMoney: {
      top: 40,
      zIndex: 1000,
    },
    backButton: {
      position: "absolute",
      left: 5,
    },
    titleStyle: {
      fontSize: 30,
      textAlign: "center",
      alignSelf: "center",
      ...globalStyles.textStyle,
    },
    categoryTitle: {
      backgroundColor: "rgba(16,36,69,0.95)",
      borderRadius: 15,
      flexDirection: "row",
      margin: 20,
      alignItems: "center",
      justifyContent: "center",
      marginTop: "15%",
    },
  });
  const navigateToPage = (category, equipment) => {
    setCategory(category);
    setSelectedEquipment(equipment);
    setShopVisible(false);
  };
  const renderCategory = () => {
    if (goodCategories.includes(category)) {
      return (
        <GoodCategory
          cart={cart}
          category={category}
          heroId={heroId}
          equipment={selectedEquipment}
          removeItem={removeItemFromCart}
          addItem={addItemToCart}
          setShopVisible={setShopVisible}
        />
      );
    } else if (weaponCategories.includes(category)) {
      return (
        <WeaponsCategory
          cart={cart}
          category={category}
          heroId={heroId}
          weapons={selectedEquipment}
          removeItem={removeItemFromCart}
          addItem={addItemToCart}
          setShopVisible={setShopVisible}
        />
      );
    }
  };
  const renderComponent = () => {
    let item;
    const title = (
      <View style={styles.categoryTitle}>
        <IonIcon
          style={styles.backButton}
          name="arrow-back-circle"
          color="#DAA520"
          size={30}
          onPress={() => setRender("shop")}
        />
        <Text style={styles.titleStyle}>Select Category</Text>
      </View>
    );
    switch (render) {
      case "shop":
        item = (
          <>
            <View style={styles.categoryTitle}>
              <Text style={styles.titleStyle}>What are you looking for?</Text>
            </View>
            <Shop setRender={setRender} />
          </>
        );
        break;
      case "goodAndServices":
        item = (
          <>
            {title}
            <GoodAndServices
              setRender={setRender}
              navigateToPage={navigateToPage}
            />
          </>
        );
        break;
      case "weaponsShop":
        item = (
          <>
            {title}
            <WeaponsShop
              setRender={setRender}
              navigateToPage={navigateToPage}
            />
          </>
        );
        break;
    }
    return item;
  };

  return (
    <>
      <View style={styles.cartAndMoney}>
        <CartAndMoney setModalVisible={setModalVisible} money={money} />
      </View>
      {shopVisible ? renderComponent() : renderCategory()}
      <Cart
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        deleteItemFromCart={deleteItemFromCart}
        addItemToCart={addItemToCart}
        removeItemFromCart={removeItemFromCart}
        cart={cart}
      />
    </>
  );
};
