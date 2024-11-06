package com.example.gestiGastillos.util;

public enum SavingStatus {
    EXCELENT("excelente"),
    GOOD("bien"),
    AVERAGE("intermedio"),
    POOR("mal"),
    VERY_POOR("muy mal");

    private String spanishSavingStatus;

    SavingStatus(String spanishSavingStatus){
        this.spanishSavingStatus = spanishSavingStatus;
    }

    public static SavingStatus fromSpanish(String savingStatus1){
        for(SavingStatus savingStatus : SavingStatus.values()){
            if(savingStatus1.equalsIgnoreCase(savingStatus.toString())){
                return savingStatus;
            }
        }
        return null;
    }
}
