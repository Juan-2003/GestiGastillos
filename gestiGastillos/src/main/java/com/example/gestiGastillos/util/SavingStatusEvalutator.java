package com.example.gestiGastillos.util;

import com.example.gestiGastillos.model.Saving;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class SavingStatusEvalutator {
    public static SavingStatus savingStatusEvaluator(Double newCurrentBalance, Double targetAmount){
        Double percentage = targetAmount * 0.2; //600

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

    public static SavingStatus generalSavingStatus(List<Saving> savingList){
        Map<SavingStatus, Long> savingMap = savingList.stream().collect(Collectors.groupingBy(Saving::getStatus, Collectors.counting()));

        long majorityStatus = 0;
        SavingStatus savingStatus = SavingStatus.AVERAGE;

        for(Map.Entry<SavingStatus, Long> entry : savingMap.entrySet()){
            if(entry.getValue() > majorityStatus){
                majorityStatus = entry.getValue();
                savingStatus = entry.getKey();
            }
        }
        return savingStatus;
    }
}
