package com.example.gestiGastillos.infra.exceptions;

import com.example.gestiGastillos.validation.reminder.ReminderName;

public class ReminderNameException extends RuntimeException{
    public ReminderNameException(String message){
        super(message);
    }
}
