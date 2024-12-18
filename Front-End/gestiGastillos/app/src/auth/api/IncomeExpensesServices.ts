import { useMyContext } from "@/app/contextProvider";
import { ip } from "../IP/Ip";

export interface ExpenseItem {
  // Dto de gastos
  user_id: number;
  transaction_id: number;
  type: string;
  title: string,
  amount: number;
  concept: string;
  category: string;
  payment_method: string;
  date: string;
  debit_card_id?: number;
  credit_card_id?: number;
}

export interface IncomeItem {
  // Dto de ingresos
  user_id: number;
  transaction_id: number;
  type: string;
  title: string,
  amount: number;
  concept: string;
  category: string;
  payment_method: string;
  date: string;
  debit_card_id: number;
}

export type MovementItem = ExpenseItem | IncomeItem;

export const handleFetchIncomeExpense = async (): Promise<MovementItem[]> => {
  try {
    const response = await fetch(
      `http://${ip}:8080/gestiGastillos/transactions`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

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
  user_id: number,
  type: string,
  title: string,
  amount: number,
  concept: string,
  category: string,
  payment_method: string,
  date: string,
  credit_card_id?: number | null,
  debit_card_id?: number | null,
  onSuccess?: () => void,
  setError?: React.Dispatch<
    React.SetStateAction<{ title: string; errorMessages: string[] } | null>
  >
) => {

  console.log("ID: ",user_id)

  // DTO de IncomeDataDTO
  const IncomeDataDTO = {
    user_id,
    type,
    title,
    amount,
    concept,
    category,
    payment_method,
    date,
    debit_card_id: debit_card_id ?? null,
  };

  // DTO de ExpenseDataDTO con propiedades comunes
  const ExpenseDataDTO: {
    user_id: number;
    type: string;
    title: string;
    amount: number;
    concept: string;
    category: string;
    payment_method: string;
    date: string;
    credit_card_id?: number;
    debit_card_id?: number;
  } = {
    user_id,
    type,
    title,
    amount,
    concept,
    category,
    payment_method,
    date,
  };

  console.log("Tipo:", type)

  // Definir la URL según el tipo de tarjeta
  const url =
    type === "ingreso"
      ? `http://${ip}:8080/gestiGastillos/income`
      : `http://${ip}:8080/gestiGastillos/expense`;

  if (credit_card_id) {
    // DTO con id de tarjeta de credito o debito
    ExpenseDataDTO.credit_card_id = credit_card_id;
  } else if (debit_card_id) {
    ExpenseDataDTO.debit_card_id = debit_card_id;
  }

  let body: any = {};

  if (type === "ingreso") {
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
      const errorTitle = errorData.title || "Error";
      const errorMessages = Array.isArray(errorData.errorMessages)
        ? errorData.errorMessages
        : [errorData.errorMessages || "Error desconocido"];

      if (setError) {
        setError({ title: errorTitle, errorMessages });
      }
      console.error("Error al agregar un ingreso o gasto:", errorData);
      console.log(errorData);
      return;
    }

    const data = await response.json();
    console.log("Ingreso/Gasto añadido:", data);

    if (onSuccess) {
      onSuccess();
    }

    navigation.goBack();
  } catch (error) {
    console.error("Error de red:", error);
    if (setError) {
      setError({
        title: "Error de red",
        errorMessages: ["No se pudo conectar al servidor"],
      });
    }
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
  title: string,
  amount: number,
  concept: string,

  // Parametros que recibira un gasto

  date: string,

  onSuccess?: () => void,
  setError?: React.Dispatch<
    React.SetStateAction<{ title: string; errorMessages: string[] } | null>
  >
) => {
  const user_id = 1; // Usuario 1

  // DTO para un ingreso
  const UpdateIncomeDTO = {
    income_id: item_id,
    type,
    title,
    amount,
    concept,
  };

  // DTO para un gasto
  const UpdateExpenseDTO = {
    expense_id: item_id,
    title,
    amount,
    concept,
  };

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

      navigation.goBack();
    } else {
      const errorData = await response.json();
      const errorTitle = errorData.title || "Error";
      const errorMessages = Array.isArray(errorData.errorMessages)
        ? errorData.errorMessages
        : [errorData.errorMessages || "Error desconocido"];

      if (setError) {
        setError({ title: errorTitle, errorMessages });
      }
      console.error("Error al editar:", errorData);
      console.log(errorData);
      return;
    }
  } catch (error) {
    console.error("Error de red:", error);
    if (setError) {
      setError({
        title: "Error de red",
        errorMessages: ["No se pudo conectar al servidor"],
      });
    }
  }
};
