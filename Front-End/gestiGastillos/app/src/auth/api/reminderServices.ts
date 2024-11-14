// src/services/reminderServices.ts
import { ip } from "../IP/Ip";

export interface ReminderItem {
  id: string;
  name: string;
  message: string;
  date: string;
  credit_card_id?: number | null;
  debit_card_id?: number | null;
  card_name:string;
  last_digits:string;
}

// Función para obtener los recordatorios desde el backend
export const fetchReminders = async (): Promise<ReminderItem[]> => {
  try {
    const response = await fetch(`http://${ip}:8080/gestiGastillos/reminder/reminderList`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener los recordatorios");
    }

    const data: ReminderItem[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener los recordatorios:", error);
    throw error; // Propaga el error para que el componente pueda manejarlo si es necesario
  }
};

// reminderServices.js
export const deleteReminder = async (id: number) => {
  try {
    const response = await fetch(`http://${ip}:8080/gestiGastillos/reminder/delete/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('No se pudo eliminar el recordatorio');
    }
    return response;
  } catch (error) {
    console.error("Error al eliminar recordatorio:", error);
    throw error;
  }
};




