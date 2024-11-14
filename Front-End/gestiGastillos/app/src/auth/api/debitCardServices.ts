import { ip } from "../IP/Ip";

export interface CardDTO {
    card_id: number;
    card_name: string;
    expiration_date: string;
    last_digits: string;
  }
  
  export interface UserDTO {
    name: string;
    user_id: number;
  }
  
export interface DebitCardResponseDTO {
    tarjeta_debito_id: number;
    current_balance: number;
    card: CardDTO;
    user: UserDTO;
}


// Función para obtener la lista de tarjetas de débito usando fetch
export const getDebitCardsList = async (): Promise<DebitCardResponseDTO[]> => {
  try {
    const response = await fetch(`http://${ip}:8080/gestiGastillos/debitCard/debitCardsList`);
    
    // Verificar si la respuesta fue exitosa
    if (!response.ok) {
      throw new Error("Error fetching debit cards");
    }

    // Convertir la respuesta a JSON
    const data = await response.json();
    console.log("Data received from backend:", data); 
    return data;
  } catch (error) {
    console.error("Error fetching debit cards:", error);
    throw error;
  }
};
