import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

export default function useAsyncStorage(key: string, initialValue: any) {
  const [storedItem, setStoredItem] = useState<string | null>(null);

  useEffect(() => {
    getStoredItem();
  }, [key, initialValue]);

  async function getStoredItem() {
    try {
      const data = await AsyncStorage.getItem(key);
      const value = data ? JSON.parse(data) : initialValue;
      setStoredItem(value);
    } catch (e) {
      console.log(e);
    }
  }

  async function setValue(value: any) {
    try {
      const valueToStore =
        value instanceof Function ? value(storedItem) : value;
      setStoredItem(valueToStore);
      await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  }

  return { storedItem, setValue };
}
