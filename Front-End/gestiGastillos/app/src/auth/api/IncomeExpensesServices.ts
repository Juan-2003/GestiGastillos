import { ip } from "../IP/Ip";

export interface ExpenseItem {
  // Dto de gastos
  transaction_id: number;
  type: string;
  amount: number;
  concept: string;
  category: string;
  payment_method: string;
  debit_card_id?: number;
  credit_card_id?: number;
}

export interface IncomeItem {
  // Dto de ingresos
  transaction_id: number;
  type: string;
  amount: number;
  concept: string;
  category: string;
  payment_method: string;
  debit_card_id: number;
}

export type MovementItem = ExpenseItem | IncomeItem;

export const handleFetchIncomeExpense = async (
  type: string
): Promise<MovementItem[]> => {
  try {
    const url =
      type === "income"
        ? `http://${ip}:8080/gestiGastillos/income/incomeList`
        : `http://${ip}:8080/gestiGastillos/expense/expenseList`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log("Se obtuvieron los datos satisfactoriamente!!");
      return await response.json();
    } else {
      const errorData = await response.json();
      if (response.status === 409) {
        console.log("Error 409:", errorData);
      }
      console.log(errorData);
      throw new Error("Error al obtener los datos");
    }
  } catch (error) {
    return [];
  }
};

export const handleSubmitIncomeExpense = async (
  navigation: any,
  type: string,
  amount: number,
  concept: string,
  category: string,
  payment_method: string,
  credit_card_id?: number | null,
  debit_card_id?: number | null,
  onSuccess?: () => void
) => {

  // DTO de IncomeDataDTO
  const IncomeDataDTO = {
    type,
    amount,
    concept,
    category,
    payment_method,
    debit_card_id: debit_card_id ?? null
  };

  // DTO de ExpenseDataDTO con propiedades comunes
  const ExpenseDataDTO: {
    type: string;
    amount: number;
    concept: string;
    category: string;
    payment_method: string;
    credit_card_id?: number;
    debit_card_id?: number;
  } = {
    type,
    amount,
    concept,
    category,
    payment_method,
  };

  // Definir la URL según el tipo de tarjeta
  const url =
    type === "income"
      ? `http://${ip}:8080/gestiGastillos/income`
      : `http://${ip}:8080/gestiGastillos/expense`;

  if (credit_card_id) {
    // DTO con id de tarjeta de credito o debito
    ExpenseDataDTO.credit_card_id = credit_card_id;
  } else if (debit_card_id) {
    ExpenseDataDTO.debit_card_id = debit_card_id;
  }

  let body: any = {};

  if (type === "income") {
    body = IncomeDataDTO;
  } else {
    body = ExpenseDataDTO;
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error al agregar un ingreso o gasto:", errorData);
      return;
    }

    const data = await response.json();
    console.log("Ingreso/Gasto añadido:", data);

    if (onSuccess) {
      onSuccess();
    }

    navigation.navigate("Ingresos/Gastos");
  } catch (error) {
    console.error("Error de red:", error);
  }
};

export const handleDeleteIncomeExpense = async (
  id: number,
  type: string,
  onSuccess: () => void
): Promise<void> => {
  const url =
    type === "income"
      ? `http://${ip}:8080/gestiGastillos/income/delete/${id}`
      : `http://${ip}:8080/gestiGastillos/expense/delete/${id}`; // Ajusta la ruta para tarjetas de débito

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log("Item eliminado satisfactoriamente!!");
      onSuccess(); // Llama al callback para refrescar la lista
    } else {
      const errorData = await response.json();
      if (response.status === 409) {
        console.log("Error 409:", errorData);
      }
      console.log(errorData);
      throw new Error("Error al eliminar el item");
    }
  } catch (error) {
    console.error("Error al eliminar el item: ", error);
  }
};

export const handleEditIncomeExpense = async (
  navigation: any,
  item_id: number,
  type: string,
  amount: number,
  concept: string,
  
  // Parametros que recibira un gasto
  payment_method?: string,

  onSuccess?: () => void
) => {

  const user_id = 1; // Usuario 1

  // DTO para un ingreso
  const UpdateIncomeDTO = {
    income_id: item_id,
    type,
    amount,
    concept,
    payment_method
  }

  // DTO para un gasto
  const UpdateExpenseDTO = {
    expense_id: item_id,
    amount,
    concept
  }

  // Comprobamos el tipo de tarjeta y construimos el DTO correspondiente
  const url =
    type === "income"
      ? `http://${ip}:8080/gestiGastillos/income/update`
      : `http://${ip}:8080/gestiGastillos/expense/update`;

  let body: any = {}; // Variable para el cuerpo de la solicitud

  if (type === "income") {
    body = UpdateIncomeDTO;
  } else {
    body = UpdateExpenseDTO;
  }

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Item actualizado!!");

      if (onSuccess) {
        onSuccess();
      }

      navigation.navigate("Card");
    } else {
      const errorData = await response.json();
      if (response.status === 409) {
        console.log("Error 409:", errorData);
      }
      console.log(errorData);
      throw new Error("Error al actualizar el item");
    }
  } catch (error) {
    console.error(error);
  }
};
