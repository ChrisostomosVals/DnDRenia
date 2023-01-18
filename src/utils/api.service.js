import AsyncStorage from "@react-native-async-storage/async-storage";
import HttpService from "./http.service";
// const devUrl = 'https://1c21-2a02-214a-8316-fe00-8c51-879e-5cf5-fb20.eu.ngrok.io/';
const http = new HttpService();
export class CharacterApi {
  constructor() {}
  static baseUrl = "gateway/api/Character";

  static async Get() {
    try {
      return await http.GetAsync(this.baseUrl);
    } catch (ex) {
      console.error("[System.CharacterApi.Get()] Error:", ex.message);
    }
  }
  static async GetHeroes() {
    try {
      return await http.GetAsync(`${this.baseUrl}?type=hero`);
    } catch (ex) {
      console.error("[System.CharacterApi.Get()] Error:", ex.message);
    }
  }
  static async GetNpcs() {
    try {
      return await http.GetAsync(`${this.baseUrl}?type=npc`);
    } catch (ex) {
      console.error("[System.CharacterApi.Get()] Error:", ex.message);
    }
  }
  static async GetMonsters() {
    try {
      return await http.GetAsync(`${this.baseUrl}?type=hostile`);
    } catch (ex) {
      console.error("[System.CharacterApi.Get()] Error:", ex.message);
    }
  }
  static async GetBosses() {
    try {
      return await http.GetAsync(`${this.baseUrl}?type=boss`);
    } catch (ex) {
      console.error("[System.CharacterApi.Get()] Error:", ex.message);
    }
  }
  static async GetById(id) {
    try {
      return await http.GetAsync(`${this.baseUrl}/${id}`);
    } catch (ex) {
      console.error("[System.CharacterApi.Get()] Error:", ex.message);
    }
  }
  static async Create(
    character = {
      name: "",
      type: "",
      classId: 0,
      gender: "",
      raceId: 0,
      level: 0,
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      constitution: 0,
      wisdom: 0,
      charisma: 0,
      armorClass: 0,
      fortitude: 0,
      reflex: 0,
      will: 0,
      baseAttackBonus: 0,
      spellResistance: 0,
      size: "",
      maxHp: 0,
      currentHp: 0,
      speed: 0,
      hair: "",
      eyes: "",
      fly: 0,
      swim: 0,
      climb: 0,
      burrow: 0,
      touch: 0,
      flatFooted: 0,
      homeland: "",
      deity: "",
      height: 0,
      weight: 0,
      experience: 0,
      age: "",
      scheme: null,
    }
  ) {
    try {
      return await http.PostAsync(this.baseUrl, character);
    } catch (ex) {
      console.error("[System.CharacterApi.Create()] Error:", ex.message);
      return ex.message;
    }
  }
  static async Update(
    character = {
      id: "",
      name: "",
      type: "",
      classId: 0,
      gender: "",
      raceId: 0,
      level: 0,
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      constitution: 0,
      wisdom: 0,
      charisma: 0,
      armorClass: 0,
      fortitude: 0,
      reflex: 0,
      will: 0,
      baseAttackBonus: 0,
      spellResistance: 0,
      size: "",
      maxHp: 0,
      currentHp: 0,
      speed: 0,
      hair: "",
      eyes: "",
      fly: 0,
      swim: 0,
      climb: 0,
      burrow: 0,
      touch: 0,
      flatFooted: 0,
      homeland: "",
      deity: "",
      height: 0,
      weight: 0,
      experience: 0,
      age: "",
      scheme: null,
    }
  ) {
    try {
      return await http.PutAsync(this.baseUrl, character);
    } catch (ex) {
      console.error("[System.CharacterApi.Update()] Error:", ex.message);
      return ex.message;
    }
  }
}
export class CharacterMainStatsApi {
  constructor() {}
  static baseUrl = "gateway/api/CharacterMainStats";

  static async Get() {
    try {
      return await http.GetAsync(this.baseUrl);
    } catch (ex) {
      console.error("[System.CharacterMainStatsApi.Get()] Error:", ex.message);
    }
  }

  static async GetById(characterId) {
    try {
      return await http.GetAsync(`${this.baseUrl}/${characterId}`);
    } catch (ex) {
      console.error("[System.CharacterMainStatsApi.Get()] Error:", ex.message);
    }
  }
  static async Create(
    character = {
      characterId: "",
      strength: 0,
      dexterity: 0,
      constitution: 0,
      wisdom: 0,
      charisma: 0,
      intelligence: 0,
      level: 0,
      healthPoints: 0,
    }
  ) {
    try {
      return await http.PostAsync(this.baseUrl, character);
    } catch (ex) {
      console.error(
        "[System.CharacterMainStatsApi.Create()] Error:",
        ex.message
      );
      return ex.message;
    }
  }
  static async Update(
    character = {
      characterId: "string",
      strength: 0,
      dexterity: 0,
      constitution: 0,
      wisdom: 0,
      charisma: 0,
      intelligence: 0,
      level: 0,
      healthPoints: 0,
    }
  ) {
    try {
      return await http.PutAsync(this.baseUrl, character);
    } catch (ex) {
      console.error("[System.CharacterApi.Create()] Error:", ex.message);
      return ex.message;
    }
  }
}
export class CharacterGearApi {
  constructor() {}
  static baseUrl = "gateway/api/CharacterGear";

  static async Get(characterId) {
    try {
      return await http.GetAsync(`${this.baseUrl}/${characterId}/all`);
    } catch (ex) {
      console.error("[System.CharacterGearApi.Get()] Error:", ex.message);
    }
  }

  static async GetById(id) {
    try {
      return await http.GetAsync(`${this.baseUrl}/${id}`);
    } catch (ex) {
      console.error("[System.CharacterGearApi.Get()] Error:", ex.message);
    }
  }

  static async GetMoney(characterId) {
    try {
      return await http.GetAsync(`${this.baseUrl}/${characterId}/money`);
    } catch (ex) {
      console.error("[System.CharacterGearApi.Get()] Error:", ex.message);
    }
  }

  static async Insert(
    gearItem = {
      characterId: "",
      name: "",
      quantity: 0,
    }
  ) {
    try {
      return await http.PostAsync(this.baseUrl, gearItem);
    } catch (ex) {
      console.error("[System.CharacterGearApi.Create()] Error:", ex.message);
      return ex.message;
    }
  }

  static async Update(
    gearItem = {
      id: 0,
      name: "",
      quantity: 0,
    }
  ) {
    try {
      return await http.PutAsync(this.baseUrl, gearItem);
    } catch (ex) {
      console.error("[System.CharacterGearApi.Create()] Error:", ex.message);
      return ex.message;
    }
  }

  static async Delete(id) {
    try {
      return await http.DeleteAsync(`${this.baseUrl}/${id}/delete`);
    } catch (ex) {
      console.error("[System.CharacterGearApi.Create()] Error:", ex.message);
      return ex.message;
    }
  }
}
export class CharacterArsenalApi {
  constructor() {}
  static baseUrl = "gateway/api/CharacterArsenal";

  static async Get(characterId) {
    try {
      return await http.GetAsync(`${this.baseUrl}/${characterId}/all`);
    } catch (ex) {
      console.error("[System.CharacterArsenal.Get()] Error:", ex.message);
    }
  }

  static async GetById(id) {
    try {
      return await http.GetAsync(`${this.baseUrl}/${id}`);
    } catch (ex) {
      console.error("[System.CharacterArsenal.GetById()] Error:", ex.message);
    }
  }

  static async Insert(
    arsenalItem = {
      characterId: "",
      gearId: "",
      type: "",
      range: 0,
      attackBonus: 0,
      damage: "",
      critical: "",
    }
  ) {
    try {
      return await http.PostAsync(this.baseUrl, arsenalItem);
    } catch (ex) {
      console.error("[System.CharacterArsenal.Insert()] Error:", ex.message);
      return ex.message;
    }
  }

  static async Update(
    arsenalItem = {
      id: 0,
      gearId: "",
      type: "",
      range: 0,
      attackBonus: 0,
      damage: "",
      critical: "",
    }
  ) {
    try {
      return await http.PutAsync(this.baseUrl, arsenalItem);
    } catch (ex) {
      console.error("[System.CharacterArsenal.Update()] Error:", ex.message);
      return ex.message;
    }
  }

  static async Delete(id) {
    try {
      return await http.DeleteAsync(`${this.baseUrl}/${id}/delete`);
    } catch (ex) {
      console.error("[System.CharacterApi.Delete()] Error:", ex.message);
      return ex.message;
    }
  }
}
export class ClassCategoryApi {
  static baseUrl = "gateway/api/ClassCategory";
  static async Get() {
    try {
      return await http.GetAsync(this.baseUrl);
    } catch (ex) {
      console.error("[System.ClassCategoryApi.Get()] Error:", ex.message);
    }
  }
  static async GetById(id) {
    try {
      return await http.GetAsync(`${this.baseUrl}/${id}`);
    } catch (ex) {
      console.error("[System.ClassCategoryApi.GetById()] Error:", ex.message);
    }
  }
}
export class ClassApi {
  static baseUrl = "gateway/api/Class";
  static async Get() {
    try {
      return await http.GetAsync(this.baseUrl);
    } catch (ex) {
      console.error("[System.ClassApi.Get()] Error:", ex.message);
    }
  }
  static async GetById(id) {
    try {
      return await http.GetAsync(`${this.baseUrl}/${id}`);
    } catch (ex) {
      console.error("[System.ClassApi.GetById()] Error:", ex.message);
    }
  }
  static async GetByCategoryId(categoryId) {
    try {
      return await http.GetAsync(`${this.baseUrl}/${categoryId}/category`);
    } catch (ex) {
      console.error("[System.ClassApi.GetByCategoryId()] Error:", ex.message);
    }
  }
}
export class RaceCategoryApi {
  static baseUrl = "gateway/api/RaceCategory";
  static async Get() {
    try {
      return await http.GetAsync(this.baseUrl);
    } catch (ex) {
      console.error("[System.RaceCategoryApi.Get()] Error:", ex.message);
    }
  }
  static async GetById(id) {
    try {
      return await http.GetAsync(`${this.baseUrl}/${id}`);
    } catch (ex) {
      console.error("[System.RaceCategoryApi.GetById()] Error:", ex.message);
    }
  }
}
export class RaceApi {
  static baseUrl = "gateway/api/Race";
  static async Get() {
    try {
      return await http.GetAsync(this.baseUrl);
    } catch (ex) {
      console.error("[System.RaceApi.Get()] Error:", ex.message);
    }
  }
  static async GetById(id) {
    try {
      return await http.GetAsync(`${this.baseUrl}/${id}`);
    } catch (ex) {
      console.error("[System.RaceApi.GetById()] Error:", ex.message);
    }
  }
  static async GetByCategoryId(categoryId) {
    try {
      return await http.GetAsync(`${this.baseUrl}/${categoryId}/category`);
    } catch (ex) {
      console.error("[System.RaceApi.GetByCategoryId()] Error:", ex.message);
    }
  }
}
export class UserApi {
  static baseUrl = "gateway/api/User";
  static async Get() {
    try {
      return await http.GetAsync(this.baseUrl);
    } catch (ex) {
      console.error("[System.UserApi.Get()] Error:", ex.message);
    }
  }
  static async GetById(id) {
    try {
      return await http.GetAsync(`${this.baseUrl}/${id}`);
    } catch (ex) {
      console.error("[System.UserApi.GetById()] Error:", ex.message);
    }
  }
  static async GetProfile() {
    try {
      return await http.GetAsync(`${this.baseUrl}/profile`);
    } catch (ex) {
      console.error("[System.UserApi.GetProfile()] Error:", ex.message);
    }
  }
  static async Create(
    user = {
      characterid: "",
      name: "",
      email: "",
      password: "",
    }
  ) {
    try {
      return await http.Post(`${this.baseUrl}`, user);
    } catch (ex) {
      console.error("[System.UserApi.Post()] Error:", ex.message);
      return ex.message;
    }
  }
  static async Update(
    user = {
      Id: "",
      characterId: "",
      name: "",
      email: "",
    }
  ) {
    try {
      return await http.Put(`${this.baseUrl}`, user);
    } catch (ex) {
      console.error("[System.UserApi.Update()] Error:", ex.message);
      return ex.message;
    }
  }
  static async ChangePassword(
    id,
    changepasswordModel = {
      oldPassword: "",
      newPassword: "",
    }
  ) {
    try {
      return await http.GetAsync(
        `${this.baseUrl}${id}/changepassword`,
        changepasswordModel
      );
    } catch (ex) {
      console.error("[System.UserApi.ChangePassword()] Error:", ex.message);
      return ex.message;
    }
  }
}
export class ConnectApi {
  static baseUrl = "gateway/connect";
  static async Login(email, password) {
    try {
      return await http.PostAsync(this.baseUrl);
    } catch (ex) {
      console.error("[System.RaceCategoryApi.Get()] Error:", ex.message);
    }
  }
}
