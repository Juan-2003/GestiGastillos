import { Double } from "react-native/Libraries/Types/CodegenTypes";
import { ip } from "../IP/Ip";

export interface SavingResponseDTO {
    saving_id: number;
    name: string,
    target_amount: number;
    status: string;
    current_balance: string;
    debit_card_id: number;
    debit_card_name:string,
    last_digits:string

}

export const getSavingList = async (): Promise<SavingResponseDTO[]> => {
    try {
      const response = await fetch(`http://${ip}:8080/gestiGastillos/saving/savingList`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      console.log("Response status:", response.status);
      if (!response.ok) {
        // Si la respuesta no es exitosa, lanza un error con más detalles.
        throw new Error(`Error fetching Saving Plans. Status: ${response.status}`);
      }
  
      // Convertir la respuesta a JSON
      const data: SavingResponseDTO[] = await response.json();
      return data;
  
    } catch (error: any) {
      // Imprime el error detallado
      console.error("Error fetching:", error.message);
      
      // Si el error tiene un response, lo logueamos también (esto aplica si el error tiene una respuesta específica).
      if (error.response) {
        console.error("Response error:", error.response);
      }
  
      // Puedes agregar más detalles si es necesario
      if (error instanceof Error) {
        console.error("Error stack trace:", error.stack);
      }
  
      // Re-lanzamos el error
      throw error;
    }
  };
  

// reminderServices.js
export const deleteSaving = async (id: number) => {
  try {
    const response = await fetch(`http://${ip}:8080/gestiGastillos/saving/delete/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('No se pudo eliminar el plan');
    }
    return response;
  } catch (error) {
    console.error("Error al eliminar plan de ahorro:", error);
    throw error;
  }
};



