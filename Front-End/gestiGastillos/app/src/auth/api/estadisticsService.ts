import { useMyContext } from "@/app/contextProvider";
import { ip } from "../IP/Ip";
import { ExpenseItem, IncomeItem } from "./IncomeExpensesServices";

interface barDataItem {
    value: number;
    label: string;
    frontColor: string;
    spacing?: number;
    labelWidth?: number;
    labelTextStyle?: { color: string };
  }
  
  export interface EstadisticItem {
    month: string;
    estadistics: {
      income_sum: number;
      expense_sum: number;
      total_sum: number;
      income: any[];
      expense: any[];
    };
    bars: barDataItem[]; // Aquí mapeamos las barras
  }

export interface TransactionEstadistic {
  income_sum: number;
  expense_sum: number;
  total_sum: number;
  income: IncomeItem;
  expense: ExpenseItem;
}

interface Props {
    user_id: number | null;
}

export const handleFetchEstadistic = async ({user_id}: Props) => {
    try {
    const response = await fetch(
      `http://${ip}:8080/gesti-gastillos/estaditics/all-months/${user_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",  // Corrige el tipo de contenido
        },
      }
    );

    if (response.ok) {
      console.log("Se obtuvieron las estadisticas satisfactoriamente!!");
      return await response.json();
    } else {
      const errorData = await response.json();
      if (response.status === 409) {
        console.log("Error 409:", errorData);
      }
      console.log(errorData);
      throw new Error("Error al obtener las estadisticas");
    }
  } catch (error) {
    return [];
  }
};
