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
// @ts-expect-error TS(2306): File 'D:/chris/Coding/Mobile/DnDRenia/DnDRenia/src... Remove this comment to see the full error message
import CharacterApi from "../dist/api/CharacterApi";
import { Banner } from "../components/banner";

export const BuyGear = (props: any) => {
  const isFocused = useIsFocused();
  const [heroId, setHeroId] = useState();
  const [money, setMoney] = useState();
  const [cart, setCart] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [shopVisible, setShopVisible] = useState(true);
  const [category, setCategory] = useState("");
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const [render, setRender] = useState("shop");
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
  const [bannerVisible, setBannerVisible] = useState(false);
  const [bannerText, setBannerText] = useState({
    title: "",
    paragraph: "",
  });
  const [reRender, setReRender] = useState(false)
  useEffect(() => {
    fetchId();
    getMoney();
    setShopVisible(true);
    setRender("shop");
  }, [isFocused, reRender]);

  const hideDialog = () => {
    setBannerVisible(false);
  };
 
  const fetchId = async () => {
    setHeroId(props.heroId);
  };

  const getMoney = async () => {
      const fetchMoney = await CharacterApi.GetMoneyAsync(props.token, props.ip, props.heroId);
      if(fetchMoney.isError){
        console.log(fetchMoney.error, 'BuyGear Screen')
        setMoney({
          // @ts-expect-error TS(2345): Argument of type '{ gold: number; silver: number; ... Remove this comment to see the full error message
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
        id: fetchMoney.data.id,
        gold: gold,
        silver: silver,
        copper: copper,
        quantity: fetchMoney.data.quantity
      };
      // @ts-expect-error TS(2345): Argument of type '{ id: any; gold: any; silver: an... Remove this comment to see the full error message
      setMoney(money);
  };
  const deleteItemFromCart = (name: any) => {
    // @ts-expect-error TS(2339): Property 'name' does not exist on type 'never'.
    const doesItemExist = cart.find((item) => item.name === name);
    if (doesItemExist) {
      return setCart((cartItems) =>
        // @ts-expect-error TS(2339): Property 'name' does not exist on type 'never'.
        cartItems.filter((item) => item.name !== name)
      );
    }
  };
  const removeItemFromCart = (name: any) => {
    // @ts-expect-error TS(2339): Property 'name' does not exist on type 'never'.
    const doesItemExist = cart.find((item) => item.name === name);
    if (doesItemExist) {
      // @ts-expect-error TS(2339): Property 'quantity' does not exist on type 'never'... Remove this comment to see the full error message
      if (doesItemExist.quantity < 2) {
        return setCart((cartItems) =>
          // @ts-expect-error TS(2339): Property 'name' does not exist on type 'never'.
          cartItems.filter((item) => item.name !== name)
        );
      }
      // @ts-expect-error TS(2345): Argument of type '(itemCart: never[]) => any[]' is... Remove this comment to see the full error message
      return setCart((itemCart) => {
        const newCart = itemCart.map((item) => {
          // @ts-expect-error TS(2339): Property 'name' does not exist on type 'never'.
          if (item.name === name) {
            return {
              // @ts-expect-error TS(2698): Spread types may only be created from object types... Remove this comment to see the full error message
              ...item,
              // @ts-expect-error TS(2339): Property 'quantity' does not exist on type 'never'... Remove this comment to see the full error message
              quantity: item.quantity - 1,
            };
          }
          return item;
        });
        return newCart;
      });
    }
  };
  const addItemToCart = (name: any, cost: any, weight: any) => {
    if (cart.length === 0) {
      // @ts-expect-error TS(2345): Argument of type '(prevCart: never[]) => { name: a... Remove this comment to see the full error message
      return setCart((prevCart) => [
        ...prevCart,
        { name: name, cost: cost, weight: weight, quantity: 1 },
      ]);
    }
    // @ts-expect-error TS(2339): Property 'name' does not exist on type 'never'.
    const doesItemExist = cart.find((item) => item.name === name);
    if (doesItemExist) {
      // @ts-expect-error TS(2345): Argument of type '(itemCart: never[]) => any[]' is... Remove this comment to see the full error message
      return setCart((itemCart) => {
        const newCart = itemCart.map((item) => {
          // @ts-expect-error TS(2339): Property 'name' does not exist on type 'never'.
          if (item.name === name) {
            return {
              // @ts-expect-error TS(2698): Spread types may only be created from object types... Remove this comment to see the full error message
              ...item,
              // @ts-expect-error TS(2339): Property 'quantity' does not exist on type 'never'... Remove this comment to see the full error message
              quantity: item.quantity + 1,
            };
          }
          return item;
        });
        return newCart;
      });
    } else {
      // @ts-expect-error TS(2345): Argument of type '(prevCart: never[]) => { name: a... Remove this comment to see the full error message
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
      // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
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
  const navigateToPage = (category: any, equipment: any) => {
    setCategory(category);
    setSelectedEquipment(equipment);
    setShopVisible(false);
  };
  const handleBuy = async () => {
    let total = 0;
    for (let item of cart) {
      // @ts-expect-error TS(2339): Property 'cost' does not exist on type 'never'.
      let cost = item.cost.split(" ")[0];
      // @ts-expect-error TS(2339): Property 'cost' does not exist on type 'never'.
      const curr = item.cost.split(" ")[1];
      switch (curr) {
        case "gp":
          cost = cost * 1000;
          break;
        case "sp":
          cost = cost * 100;
          break;
        case "cp":
          cost = cost * 10;
          break;
        default:
          break;
      }
      // @ts-expect-error TS(2339): Property 'quantity' does not exist on type 'never'... Remove this comment to see the full error message
      cost = (item.quantity * cost) / 1000;
      total += cost;
    }
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    if (total > money.quantity) {
      setBannerText({
        title: "Failed",
        paragraph: "You do not have enough money to buy your stuff",
      });
      setModalVisible(false);
      setBannerVisible(true);
      return;
    }
    const gear = await CharacterApi.GetGearAsync(props.token, props.ip, props.heroId)
    if(gear.isError){
      console.log(gear.error, 'Buy Gear Screen', 'handleBuy')
      setBannerText({
        title: "Failed",
        paragraph: "There was an error",
      });
      setModalVisible(false);
      setBannerVisible(true);
      return;
    }
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    let findMoney = gear.data.find((item: any) => item.id === money.id)
    findMoney.quantity = (findMoney.quantity - total).toFixed(2);
    for (let item of cart) {
      // @ts-expect-error TS(2339): Property 'name' does not exist on type 'never'.
      let findItem = gear.data.find((g: any) => g.name === item.name)
      if(findItem){
        // @ts-expect-error TS(2339): Property 'quantity' does not exist on type 'never'... Remove this comment to see the full error message
        findItem.quantity += item.quantity
      }
      else{
        gear.data.push({
          // @ts-expect-error TS(2339): Property 'name' does not exist on type 'never'.
          name: item.name,
          // @ts-expect-error TS(2339): Property 'quantity' does not exist on type 'never'... Remove this comment to see the full error message
          quantity: item.quantity,
          // @ts-expect-error TS(2339): Property 'weight' does not exist on type 'never'.
          weight: item.weight
        })
      }
    }
    const update = {
      id: props.heroId,
      updateDefinition: gear.data
    }
    const updateGear = await CharacterApi.UpdateGearAsync(props.token, props.ip, update)
    if(updateGear.isError){
      console.log(updateGear.error, 'Buy Gear Screen', 'handleBuy')
      setBannerText({
        title: "Failed",
        paragraph: "There was an error updating your gear",
      });
      setModalVisible(false);
      setBannerVisible(true);
      return;
    }
    setBannerText({
      title: "Success",
      paragraph: "Items have been added to your gear",
    });
    setCart([]);
    setReRender(!reRender);
    setModalVisible(false);
    setBannerVisible(true);
  };
  // @ts-expect-error TS(7030): Not all code paths return a value.
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
            // @ts-expect-error TS(2786): 'Shop' cannot be used as a JSX component.
            <Shop setRender={setRender} />
          </>
        );
        break;
      case "goodAndServices":
        item = (
          <>
            {title}
            // @ts-expect-error TS(2786): 'GoodAndServices' cannot be used as a JSX componen... Remove this comment to see the full error message
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
            // @ts-expect-error TS(2786): 'WeaponsShop' cannot be used as a JSX component.
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
        // @ts-expect-error TS(2786): 'CartAndMoney' cannot be used as a JSX component.
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
        onBuy={handleBuy}
      />
      <Banner
        hideDialog={hideDialog}
        visible={bannerVisible}
        text={bannerText}
      />
    </>
  );
};
