import React, {createContext, ReactNode, useContext} from "react";

//Propiedades del componente
interface MyContextType{
    userId: number | null;
    setUserId: (id: number | null) => void;
    userName: string | null;
    setUserName: (name: string | null) => void;
}

interface MyContextProvider{
    children: ReactNode;
}

const MyContext = createContext<MyContextType | undefined>(undefined);

function MyContextProvider({children}:MyContextProvider){
    //Variables globales
    const [userId, setUserId] = React.useState<number | null>(null);
    const [userName, setUserName] = React.useState<string | null>(null);

    return(
        <MyContext.Provider value={{userId, setUserId, userName, setUserName}}>
            {children}
        </MyContext.Provider>
    )
}

//Para usar las variables globales se debe de llamar a esta función
const useMyContext = () => {
    const context = useContext(MyContext);

    if(!context){
        throw new Error("Trying to acess to MyContext");
    }
    return context;
}

export{MyContext, MyContextProvider, useMyContext};