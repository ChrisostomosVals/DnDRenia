import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { globalStyles } from "../utils/styles";
import { equipment } from "../utils/constants";
import { CharacterGearApi } from "../utils/api.service";
import { CartAndMoney } from "../components/cartAndMoney";
import { Cart } from "../components/cart";
import { GoodCategory } from "./goodCategory";

export const BuyGear = ({ route, navigation }) => {
  const [heroId, setHeroId] = useState(route.params.heroId);
  const [money, setMoney] = useState();
  const [cart, setCart] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [shopVisible, setShopVisible] = useState(true);
  const [category, setCategory] = useState("");
  const [selectedEquipment, setSelectedEquipment] = useState([]);

  
  useEffect(() => {
    setHeroId(route.params.heroId);
    getMoney();
    
  }, [route, navigation]);
 
 
  const getMoney = async () => {
    const fetchMoney = await CharacterGearApi.GetMoney(route.params.heroId);
    let gold = {
      quantity: 0,
      id: 0,
    };
    let silver = gold;
    let copper = gold;
    for (let item of fetchMoney) {
      switch (item.name) {
        case "GOLD":
          gold = {
            quantity: item.quantity,
            id: item.id,
          };
          break;
        case "SILVER":
          silver = {
            quantity: item.quantity,
            id: item.id,
          };
          break;
        case "COPPER":
          copper = {
            quantity: item.quantity,
            id: item.id,
          };
          break;
        default:
          break;
      }
    }
    const money = {
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
  });
  const navigateToPage = (category, id, equipment) => {
    setCategory(category);
    setHeroId(id);
    setSelectedEquipment(equipment);
    setShopVisible(false);
  };
  return (
    <>
      <View style={styles.cartAndMoney}>
        <CartAndMoney setModalVisible={setModalVisible} money={money} />
      </View>
      {shopVisible ? (
        <View>
          <ScrollView scrollEnable={true}>
            <View style={styles.container}>
              <Text
                style={{ ...styles.welcomeStyle, ...globalStyles.textStyle }}
              >
                What are you looking for?
              </Text>
              <View style={styles.equipment}>
                <View style={{ ...globalStyles.card, ...styles.itemCard }}>
                  <TouchableOpacity
                    onPress={() =>
                      navigateToPage(
                        "Adventure Gear",
                        heroId,
                        equipment.adventureGear
                      )
                    }
                    style={styles.selection}
                  >
                    <Text
                      style={{
                        ...styles.welcomeStyle,
                        ...globalStyles.textStyle,
                        backgroundColor: "transparent",
                      }}
                    >
                      Adventure Gear
                    </Text>
                    <Image
                      source={require("../assets/images/adventure-gear.png")}
                    />
                  </TouchableOpacity>
                </View>

                <View style={{ ...globalStyles.card, ...styles.itemCard }}>
                  <TouchableOpacity
                    onPress={() =>
                      navigateToPage(
                        "Special Substances",
                        heroId,
                        equipment.specialSubstancesAndItems
                      )
                    }
                    style={styles.selection}
                  >
                    <Text
                      style={{
                        ...styles.welcomeStyle,
                        ...globalStyles.textStyle,
                        backgroundColor: "transparent",
                      }}
                    >
                      Special Substances
                    </Text>
                    <Text
                      style={{
                        ...styles.welcomeStyle,
                        ...globalStyles.textStyle,
                        backgroundColor: "transparent",
                      }}
                    >
                      {" "}
                      And Items
                    </Text>
                    <Image
                      source={require("../assets/images/special-items.png")}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{ ...globalStyles.card, ...styles.itemCard }}>
                  <TouchableOpacity
                    onPress={() =>
                      navigateToPage(
                        "Tools And Skill Kits",
                        heroId,
                        equipment.toolsAndSkillKits
                      )
                    }
                    style={styles.selection}
                  >
                    <Text
                      style={{
                        ...styles.welcomeStyle,
                        ...globalStyles.textStyle,
                        backgroundColor: "transparent",
                      }}
                    >
                      Tools And Skill
                    </Text>
                    <Text
                      style={{
                        ...styles.welcomeStyle,
                        ...globalStyles.textStyle,
                        backgroundColor: "transparent",
                      }}
                    >
                      {" "}
                      Kits
                    </Text>
                    <Image
                      source={require("../assets/images/tools-skills-kit.png")}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{ ...globalStyles.card, ...styles.itemCard }}>
                  <TouchableOpacity
                    onPress={() =>
                      navigateToPage("Clothing", heroId, equipment.clothing)
                    }
                    style={styles.selection}
                  >
                    <Text
                      style={{
                        ...styles.welcomeStyle,
                        ...globalStyles.textStyle,
                        backgroundColor: "transparent",
                      }}
                    >
                      Clothing
                    </Text>
                    <Image source={require("../assets/images/clothing.png")} />
                  </TouchableOpacity>
                </View>
                <View style={{ ...globalStyles.card, ...styles.itemCard }}>
                  <TouchableOpacity
                    onPress={() =>
                      navigateToPage(
                        "Food Drink And Lodging",
                        heroId,
                        equipment.foodDrinkAndLodging
                      )
                    }
                    style={styles.selection}
                  >
                    <Text
                      style={{
                        ...styles.welcomeStyle,
                        ...globalStyles.textStyle,
                        backgroundColor: "transparent",
                      }}
                    >
                      Food Drink And
                    </Text>
                    <Text
                      style={{
                        ...styles.welcomeStyle,
                        ...globalStyles.textStyle,
                        backgroundColor: "transparent",
                      }}
                    >
                      Lodging
                    </Text>
                    <Image
                      source={require("../assets/images/food-drinks.png")}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{ ...globalStyles.card, ...styles.itemCard }}>
                  <TouchableOpacity
                    onPress={() =>
                      navigateToPage(
                        "Mounts And Related Gear",
                        heroId,
                        equipment.mountsAndRelatedGear
                      )
                    }
                    style={styles.selection}
                  >
                    <Text
                      style={{
                        ...styles.welcomeStyle,
                        ...globalStyles.textStyle,
                        backgroundColor: "transparent",
                      }}
                    >
                      Mounts And
                    </Text>
                    <Text
                      style={{
                        ...styles.welcomeStyle,
                        ...globalStyles.textStyle,
                        backgroundColor: "transparent",
                      }}
                    >
                      Related Gear
                    </Text>
                    <Image
                      source={require("../assets/images/mount-related-gear.png")}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{ ...globalStyles.card, ...styles.itemCard }}>
                  <TouchableOpacity
                    onPress={() =>
                      navigateToPage("Transport", heroId, equipment.transport)
                    }
                    style={styles.selection}
                  >
                    <Text
                      style={{
                        ...styles.welcomeStyle,
                        ...globalStyles.textStyle,
                        backgroundColor: "transparent",
                      }}
                    >
                      Transport
                    </Text>
                    <Image source={require("../assets/images/transport.png")} />
                  </TouchableOpacity>
                </View>
                <View style={{ ...globalStyles.card, ...styles.itemCard }}>
                  <TouchableOpacity
                    onPress={() =>
                      navigateToPage(
                        "SpellCasting And Services",
                        heroId,
                        equipment.spellCastingAndServices
                      )
                    }
                    style={styles.selection}
                  >
                    <Text
                      style={{
                        ...styles.welcomeStyle,
                        ...globalStyles.textStyle,
                        backgroundColor: "transparent",
                      }}
                    >
                      SpellCasting And
                    </Text>
                    <Text
                      style={{
                        ...styles.welcomeStyle,
                        ...globalStyles.textStyle,
                        backgroundColor: "transparent",
                      }}
                    >
                      Services
                    </Text>
                    <Image
                      source={require("../assets/images/spellcasting.png")}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      ) : (
        <GoodCategory
          cart={cart}
          category={category}
          heroId={heroId}
          equipment={selectedEquipment}
          removeItem={removeItemFromCart}
          addItem={addItemToCart}
          setShopVisible={setShopVisible}
        />
      )}
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
