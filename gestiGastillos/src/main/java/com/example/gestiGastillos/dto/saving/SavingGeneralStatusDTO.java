package com.example.gestiGastillos.dto.saving;

import com.example.gestiGastillos.util.SavingStatus;

public record SavingGeneralStatusDTO(
        String generalStatus
) {
    public SavingGeneralStatusDTO(SavingStatus savingStatus){
        this(savingStatus.toString());
    }
}
