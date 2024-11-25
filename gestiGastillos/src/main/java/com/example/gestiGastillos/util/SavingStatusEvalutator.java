package com.example.gestiGastillos.util;

import com.example.gestiGastillos.dto.MonthDTO;
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

    public static SavingStatus generalStatus(List<MonthDTO> monthDTOList){
        double incomeSum = 0.0;
        double expenseSum = 0.0;
        double totalSum = 0.0;
        for(MonthDTO monthDTO : monthDTOList){
            incomeSum += monthDTO.transactionListResponseDTO().incomeSum();
            expenseSum += monthDTO.transactionListResponseDTO().expenseSum();
            totalSum += monthDTO.transactionListResponseDTO().totalSum();
        }
        if(totalSum <= -10000){
            return SavingStatus.VERY_POOR;
        }
        else if(totalSum < 0 && totalSum > -10000){
            return SavingStatus.POOR;
        }
        else if(totalSum == 0){
            return SavingStatus.AVERAGE;
        }
        else if(totalSum > 0 && totalSum < 10000){
            return SavingStatus.GOOD;
        }else{
            return SavingStatus.EXCELENT;
        }
    }
}
