import { ip } from "../IP/Ip";

export interface User {
    user_id: number;
    name: string;
}

export const handleFetchItem = async () => {
    try {
      const response = await fetch(
        `http://${ip}:8080/gestiGastillos/user`,
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