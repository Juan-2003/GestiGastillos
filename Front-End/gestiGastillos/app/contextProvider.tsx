import React, { createContext, ReactNode, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Definir el tipo de datos que vamos a manejar en el contexto
interface MyContextType {
  userId: number | null;
  setUserId: (id: number | null) => void;
  userName: string | null;
  setUserName: (name: string | null) => void;
}

interface MyContextProviderProps {
  children: ReactNode;
}

const MyContext = createContext<MyContextType | undefined>(undefined);

const MyContextProvider = ({ children }: MyContextProviderProps) => {
  // Estado local para manejar userId y userName
  const [userId, setUserId] = useState<number | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  // Cargar datos desde AsyncStorage cuando la app inicia
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId");
        const storedUserName = await AsyncStorage.getItem("userName");

        if (storedUserId && storedUserName) {
          setUserId(Number(storedUserId)); // Asegurarse de que es un número
          setUserName(storedUserName);
        }
      } catch (error) {
        console.error("Error loading user data from AsyncStorage", error);
      }
    };

    loadUserData();
  }, []);

  // Guardar los datos de usuario en AsyncStorage cuando cambian
  useEffect(() => {
    const saveUserData = async () => {
      if (userId !== null && userName !== null) {
        try {
          await AsyncStorage.setItem("userId", userId.toString());
          await AsyncStorage.setItem("userName", userName);
        } catch (error) {
          console.error("Error saving user data to AsyncStorage", error);
        }
      }
    };

    saveUserData();
  }, [userId, userName]);

  return (
    <MyContext.Provider value={{ userId, setUserId, userName, setUserName }}>
      {children}
    </MyContext.Provider>
  );
};

const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};

export { MyContextProvider, useMyContext };
