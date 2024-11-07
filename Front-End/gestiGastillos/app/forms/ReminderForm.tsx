import { View,TextInput } from "react-native";
import globalStylesMenu from "@/styles/GlobalStylesMenu";
import globalStyles from "@/styles/GlobalStyles";
import ButtonClass from "@/components/buttons";
import TextClass from "@/components/TextClass";
import TopBarForms from "@/components/TopBarForms";
import { handleFetchItem, CardItem } from "../src/auth/api/cardServices";
import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";

interface CardsResponse {
    credit_cards: any;
    debit_cards: any;
  }

export default function ReminderForm({credit_cards,debit_cards}:CardsResponse){
    const [cards, setCards] = useState<CardItem[]>([]);
    const [selectedCardId, setSelectedCardId] = useState<number | null>(null); // Estado para el ID de la tarjeta seleccionada
  
    // Obtiene las tarjetas cuando el componente se monta
    useEffect(() => {
        const fetchCards = async () => {
          const fetchedCards = await handleFetchItem();
          console.log("hola");
          console.log(fetchedCards);
          
          // Combinar tarjetas de crédito y débito
          const allCards = [
            ...(fetchedCards.credit_cards || [])
          ];
      
          setCards(allCards);
        };
        fetchCards();
      }, []);
      

    return(
        <View style={globalStyles.container}>
      
        <TopBarForms title="RECORDATORIOS"/>
            <View style={globalStylesMenu.container}>
            
                <View style={globalStylesMenu.containerMiddle}>
                    <View style={globalStyles.inputTextContainer}>
                        <TextClass text="selecciona una tarjeta" />
                        <View style={globalStyles.pickerContainer}>
                            <Picker
                                selectedValue={selectedCardId}
                                onValueChange={(itemValue) => setSelectedCardId(itemValue)}
                                style={globalStyles.picker}
                                >
                                <Picker.Item label="Selecciona una tarjeta" value={null} />
                                {cards.map((card) => (
                                    <Picker.Item
                                    key={card.card.card_id}
                                    label={`${card.card.card_name} - ${card.card.last_digits}`}
                                    value={card.card.card_id}
                                    />
                                ))}
                            </Picker>
                        </View>
                        <TextClass text="Titulo"/>

                        <TextInput
                            style={globalStyles.textInput}
                            placeholder="Ingresa tu texto aquí"
                        />
                        
                        <TextClass text="Descripcion"/>

                        <TextInput
                            style={globalStyles.textInput}
                            placeholder="Ingresa tu texto aquí"
                        />

                        <TextClass text="Fecha de recordatorio"/>

                        <TextInput
                            style={globalStyles.textInput}
                            placeholder="Ingresa tu texto aquí"
                        />
                       
                    </View>
                </View >
                <View style={globalStylesMenu.containerBottom}>
                    <ButtonClass text="Agregar"/>
                </View >
                
            </View>
        </View>
    );
}