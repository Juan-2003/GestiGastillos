package com.example.gestiGastillos.util;

public class SavingStatusEvalutator {
    public static SavingStatus savingStatusEvaluator(Double newCurrentBalance, Double targetAmount){
        Double percentage = targetAmount * 0.2;

        if(newCurrentBalance.equals(targetAmount)){
            return SavingStatus.AVERAGE;
        }
        else if(newCurrentBalance > targetAmount){
            if(newCurrentBalance > targetAmount + percentage){
                return SavingStatus.EXCELENT;
            }else{
                return SavingStatus.GOOD;
            }
        }
        else if(newCurrentBalance < targetAmount){
            if(newCurrentBalance < targetAmount - percentage){
                return SavingStatus.VERY_POOR;
            }else{
                return SavingStatus.POOR;
            }
        }
        return SavingStatus.AVERAGE;
    }
}
