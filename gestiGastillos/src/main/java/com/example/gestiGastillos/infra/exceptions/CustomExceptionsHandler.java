package com.example.gestiGastillos.infra.exceptions;

import com.sun.jdi.InvalidTypeException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@ControllerAdvice
public class CustomExceptionsHandler {
    private final Set<Class<? extends RuntimeException>> customExeptions = new HashSet<>(
            Arrays.asList(
                    EntityNotFoundException.class,
                    InvalidCreditLimitException.class,
                    InvalidDebtException.class,
                    InvalidExpirationDateException.class,
                    InvalidLastDigitsException.class,
                    InvalidCardNameException.class,
                    DateException.class,
                    ReminderNameException.class,
                    ExpenseAmount.class,
                    InvalidPaymentMethodException.class,
                    InvalidCategoryException.class,
                    TypeInvalidException.class
            )
    );

    @ExceptionHandler({MethodArgumentNotValidException.class})
    public ResponseEntity<DataErrorValidation> handleBeanValidationError(MethodArgumentNotValidException e){
        Set<String> errorMessages =  new HashSet<>();
        e.getBindingResult().getFieldErrors().forEach(fieldError -> {
            String errorMessage = fieldError.getDefaultMessage(); // Capt
            errorMessages.add(errorMessage);
        });

        return ResponseEntity.badRequest().body(new DataErrorValidation("Error en Bean Validation", errorMessages));
    }

    // Nuevo manejador para errores de deserialización (HttpMessageNotReadableException)
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<DataErrorValidation> handleHttpMessageNotReadableException(HttpMessageNotReadableException e) {
        Set<String> errorMessages = new HashSet<>();
        errorMessages.add("El formato del campo no es válido. Asegúrate de que los valores sean del tipo esperado.");

        return ResponseEntity.badRequest().body(new DataErrorValidation("Error en formato de JSON", errorMessages));
    }

    @ExceptionHandler({
            InvalidCreditLimitException.class,
            InvalidDebtException.class,
            InvalidExpirationDateException.class,
            InvalidLastDigitsException.class,
            InvalidCardNameException.class,
            DateException.class,
            ReminderNameException.class,
            ExpenseAmount.class,
            InvalidPaymentMethodException.class,
            InvalidCategoryException.class,
            TypeInvalidException.class,
            ExpenseAmount.class,
            InvalidPaymentMethodException.class,
            InvalidCategoryException.class,
    })

    public ResponseEntity<DataErrorValidation> handleBadRequestCustomExceptions(RuntimeException e){
        for(Class<? extends RuntimeException> exeptionClass : customExeptions){
            if(exeptionClass.isInstance(e)){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new DataErrorValidation("BAD REQUEST EXCEPTION", Set.of(e.getMessage())));
            }
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new DataErrorValidation("Error inesperado", Set.of("Ocurrio un error inesperado")));
    }

    @ExceptionHandler({EntityNotFoundException.class})
    public ResponseEntity<DataErrorValidation> handleNotFoundCustomExceptions(RuntimeException e){
        for(Class<? extends RuntimeException> exeptionClass : customExeptions){
            if(exeptionClass.isInstance(e)){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new DataErrorValidation("NOT FOUND EXCEPTION", Set.of(e.getMessage())));
            }
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new DataErrorValidation("Error inesperado", Set.of("Ocurrio un error inesperado")));
    }

    /*
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<DataErrorValidation> handleUserNotFound(UserNotFoundException e){

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new DataErrorValidation("Usuario no encontrado", Set.of(e.getMessage())));
    }


    @ExceptionHandler(InvalidCreditLimitException.class)
    public ResponseEntity<DataErrorValidation> handleInvalidCreditLimit(InvalidCreditLimitException e){

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new DataErrorValidation("Limite de tarjeta invalido", Set.of(e.getMessage())));
    }

    @ExceptionHandler(InvalidDebtException.class)
    public ResponseEntity<DataErrorValidation> handleInvalidDebtException(InvalidDebtException e){

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new DataErrorValidation("Deuda de tarjeta invalida",  Set.of(e.getMessage())));
    }

    @ExceptionHandler(InvalidExpirationDateException.class)
    public ResponseEntity<DataErrorValidation> handleInvaliExpitationDateException(InvalidExpirationDateException e){

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new DataErrorValidation("Fecha de expiracion invalida",  Set.of(e.getMessage())));
    }

    @ExceptionHandler(InvalidLastDigitsException.class)
    public ResponseEntity<DataErrorValidation> handleInvalidLastDigitsException(InvalidLastDigitsException e){

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new DataErrorValidation("Ultimos digitos invalidos",  Set.of(e.getMessage())));
    }

    @ExceptionHandler(InvalidCardNameException.class)
    public ResponseEntity<DataErrorValidation> handleInvalidCardException(InvalidCardNameException e){

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new DataErrorValidation("Nombre de tarjeta invalido",  Set.of(e.getMessage())));
    }*/

    private record DataErrorValidation(String title,Set<String> errorMessages){
        public DataErrorValidation(FieldError error, Set<String> errorMessages){
            this(error.getField(), errorMessages);
        }
    }
}