package com.example.gestiGastillos.util;

public class SavingStatusEvalutator {
    public static SavingStatus savingStatusEvaluator(Double oldCurrentBalance, Double newCurrentBalance, Double targetAmount){
        Double percentage = targetAmount * 0.2;

        if(newCurrentBalance.equals(targetAmount)){
            return SavingStatus.AVERAGE;
        }
        else if(newCurrentBalance  > targetAmount){
            if(newCurrentBalance < oldCurrentBalance + percentage){
                return SavingStatus.GOOD;
            }else{
                return SavingStatus.EXCELENT;
            }
        }
        else if(newCurrentBalance < targetAmount){
            if(newCurrentBalance < percentage){
                return SavingStatus.VERY_POOR;
            }else{
                return SavingStatus.POOR;
            }
        }
        return SavingStatus.AVERAGE;
    }
}
