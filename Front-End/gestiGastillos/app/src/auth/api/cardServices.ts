
export interface User {
    user_id: number;
    name: string;
}

export interface Card {
    card_id: number;
    card_name: string;
    last_digits: string;
    expiration_date: string;
}

export interface CreditCardItem {
    tarjeta_credito_id: number;
    user: User;
    card: Card;
    debt: number;
    credit_limit: string;
    type: string;
}

export interface DebitCardItem {
    tarjeta_credito_id: number;
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
    debt?: number;         // Opcional, solo para tarjetas de crédito
    current_balance?: string; // Opcional, solo para tarjetas de débito
  }

export function isDebitCardItem(item: CardItem): item is DebitCardItem {
    return item.type === 'debit';
}

export function isCreditCardItem(item: CardItem): item is CreditCardItem {
    return item.type === 'credit';
}

export const handleFetchItem = async (): Promise<CardItem[]> => {
    try {
        const response = await fetch(
            "http://192.168.100.17:8080/gestiGastillos/cards",
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
    type: string,
    user_id: number,
    name: string,
    digitos: string,
    fechaVencimiento: string,
    limite: string,
    deudaActual?: number
) => {
    const cardData: CardData = {
      user_id,
      card: {
        name,
        last_digits: digitos,
        expiration_date: fechaVencimiento,
      },
    };

    // Definir la URL según el tipo de tarjeta
    const url =
      type === 'credito'
        ? "http://192.168.100.19:8080/gestiGastillos/creditCard/register"
        : "http://192.168.100.19:8080/gestiGastillos/debitCard/register"; // Ajusta la ruta para tarjetas de débito

    // Agregar propiedades específicas según el tipo de tarjeta
    if (type === 'credito') {
      cardData.credit_limit = limite;
      cardData.debt = deudaActual;
    } else if (type === 'debito') {
      cardData.current_balance = limite; // Ajusta este campo según tu modelo de datos
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cardData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error al agregar la tarjeta:", errorData);
        return;
      }

      const data = await response.json();
      console.log("Tarjeta añadida:", data);
      // Aquí puedes navegar a otra pantalla o mostrar un mensaje de éxito
    } catch (error) {
      console.error("Error de red:", error);
    }
  };