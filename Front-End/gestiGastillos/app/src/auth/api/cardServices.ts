import { ip } from "../IP/Ip";


export interface User {
  user_id: number;
  name: string;
}

export interface Card {
  card_id?: number;
  card_name: string;
  last_digits?: string;
  expiration_date?: string;
}

export interface CreditCardItem {
  tarjeta_credito_id?: number;
  user: User;
  card: Card;
  debt: number;
  credit_limit: string;
  type: string;
}

export interface DebitCardItem {
  tarjeta_debito_id?: number;
  user: User;
  card: Card;
  current_balance: number;
  type: string;
}

export type CardItem = CreditCardItem | DebitCardItem;

type CardData = {
  user_id: number;
  card: {
    name: string;
    last_digits: string;
    expiration_date: string;
  };
  credit_limit?: string; // Opcional, solo para tarjetas de crédito
  debt?: number; // Opcional, solo para tarjetas de crédito
  current_balance?: string; // Opcional, solo para tarjetas de débito
};

export function isDebitCardItem(item: CardItem): item is DebitCardItem {
  return item.type === "debit";
}

export function isCreditCardItem(item: CardItem): item is CreditCardItem {
  return item.type === "credit";
}

export const handleFetchItem = async (): Promise<CardItem[]> => {
  try {
    const response = await fetch(
      `http://${ip}:8080/gestiGastillos/cards`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      console.log("Se obtuvieron las tarjetas satisfactoriamente!!");
      return await response.json();
    } else {
      const errorData = await response.json();
      if (response.status === 409) {
        console.log("Error 409:", errorData);
      }
      console.log(errorData);
      throw new Error("Error al obtener las tarjetas");
    }
  } catch (error) {
    return [];
  }
};

export const handleSubmit = async (
  navigation: any,
  type: string,
  user_id: number,
  name: string,
  digitos: string,
  fechaVencimiento: string,
  limite: string,
  deudaActual?: number,
  onSuccess?: () => void
) => {
  // DTO de la tarjeta CardDataDTO
  const CardDataDTO = {
      name,
      last_digits: digitos,
      expiration_date: fechaVencimiento,
  };

  // Definir la URL según el tipo de tarjeta
  const url =
    type === "credit"
      ? "http://192.168.100.17:8080/gestiGastillos/creditCard/register"
      : "http://192.168.100.17:8080/gestiGastillos/debitCard";

  let body: any = {};

  // Construimos los DTO's para tarjetas de credito o debito
  if (type === "credit") {
    // Para tarjetas de credito creamos el CreditCardDataDTO
    body = {
      user_id,
      card: CardDataDTO,
      credit_limit: limite,
      debt: deudaActual,
    };
  } else if (type === "debit") {
    // Para tarjetas de debito creamos el DebitCardDataDTO
    body = {
      user_id,
      currentBalance: limite,
      card: CardDataDTO
    };
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
      console.error("Error al agregar la tarjeta:", errorData);
      return;
    }

    const data = await response.json();
    console.log("Tarjeta añadida:", data);

    if (onSuccess) {
      onSuccess();
    }

    navigation.navigate("Card");
  } catch (error) {
    console.error("Error de red:", error);
  }
};

export const handleDelete = async (
  id: number,
  type: string,
  onSuccess: () => void
): Promise<void> => {
  const url =
    type === "credit"
      ? `http://${ip}:8080/gestiGastillos/creditCard/delete/${id}`
      : `http://${ip}:8080/gestiGastillos/debitCard/delete/${id}`; // Ajusta la ruta para tarjetas de débito

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log("Tarjeta eliminada satisfactoriamente!!");
      onSuccess(); // Llama al callback para refrescar la lista
    } else {
      const errorData = await response.json();
      if (response.status === 409) {
        console.log("Error 409:", errorData);
      }
      console.log(errorData);
      throw new Error("Error al eliminar las tarjetas");
    }
  } catch (error) {
    console.error("Error al eliminar la tarjeta: ", error);
  }
};

export const handleEdit = async (
  navigation: any,
  id: number,
  type: string,
  name: string,
  limite: string,
  deudaActual?: number,
  onSuccess?: () => void
) => {
  const user_id = 1; // Si este valor es dinámico, deberías obtenerlo de alguna parte

  // DTO para card
  const updateCardDTO = {
    name,
  };

  // Comprobamos el tipo de tarjeta y construimos el DTO correspondiente
  const url =
    type === "credit"
      ? "http://192.168.100.17:8080/gestiGastillos/creditCard/update"
      : "http://192.168.100.17:8080/gestiGastillos/debitCard/update";

  let body: any = {}; // Variable para el cuerpo de la solicitud

  if (type === "credit") {
    // Para tarjetas de crédito, usamos el DTO UpdateCreditCardDTO
    body = {
      userId: user_id,
      credit_card_id: id,
      credit_limit: limite,
      debt: deudaActual,
      card: updateCardDTO,
    };
  } else if (type === "debit") {
    // Para tarjetas de débito, usamos el DTO UpdateDebitCardDTO
    body = {
      userId: user_id,
      debit_card_id: id,
      current_balance: limite, // Campo específico de tarjetas de débito
      card: updateCardDTO,
    };
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
      console.log("Tarjeta actualizada!!");

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
      throw new Error("Error al actualizar la tarjeta");
    }
  } catch (error) {
    console.error(error);
  }
};
