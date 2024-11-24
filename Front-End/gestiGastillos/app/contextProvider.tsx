import React, { createContext, ReactNode, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Definir el tipo de datos que vamos a manejar en el contexto
interface MyContextType {
  userId: number | null;
  setUserId: (id: number | null) => void;
  userName: string | null;
  setUserName: (name: string | null) => void;
  isRegistered: boolean;
  setIsRegistered: (status: boolean) => void;  // Nuevo estado para manejo de registro
}

interface MyContextProviderProps {
  children: ReactNode;
}

const MyContext = createContext<MyContextType | undefined>(undefined);

const MyContextProvider = ({ children }: MyContextProviderProps) => {
  // Estado local para manejar userId, userName y isRegistred
  const [userId, setUserId] = useState<number | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);  // Nuevo estado

  // Cargar datos desde AsyncStorage cuando la app inicia
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId");
        const storedUserName = await AsyncStorage.getItem("userName");
        const storedIsRegistered = await AsyncStorage.getItem("isRegistered");

        if (storedUserId && storedUserName) {
          setUserId(Number(storedUserId)); // Asegurarse de que es un número
          setUserName(storedUserName);
        }

        if (storedIsRegistered === "true") {
          setIsRegistered(true);
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
          await AsyncStorage.setItem("isRegistered", isRegistered.toString());
        } catch (error) {
          console.error("Error saving user data to AsyncStorage", error);
        }
      }
    };

    saveUserData();
  }, [userId, userName]);

  return (
    <MyContext.Provider value={{ userId, setUserId, userName, setUserName, isRegistered, setIsRegistered }}>
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
