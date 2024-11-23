package com.example.gestiGastillos.service;

import com.example.gestiGastillos.dto.creditCard.UpdateCreditCardDTO;
import com.example.gestiGastillos.dto.transactions.income.IncomeDataDTO;
import com.example.gestiGastillos.dto.transactions.income.IncomeResponseDTO;
import com.example.gestiGastillos.dto.transactions.income.UpdateIncomeDTO;
import com.example.gestiGastillos.dto.transactions.income.UpdateIncomeResponseDTO;
import com.example.gestiGastillos.infra.exceptions.EntityNotFoundException;
import com.example.gestiGastillos.model.Saving;
import com.example.gestiGastillos.model.card.Card;
import com.example.gestiGastillos.model.debitCard.DebitCard;
import com.example.gestiGastillos.model.transactions.TransactionType;
import com.example.gestiGastillos.model.transactions.Transactions;
import com.example.gestiGastillos.repository.CardRepository;
import com.example.gestiGastillos.repository.DebitCardRepository;
import com.example.gestiGastillos.repository.SavingRepository;
import com.example.gestiGastillos.repository.TransactionsRepository;
import com.example.gestiGastillos.util.SavingStatus;
import com.example.gestiGastillos.util.SavingStatusEvalutator;
import com.example.gestiGastillos.validation.Transactions.PostValidations.TransactionValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IncomeService {
    private final TransactionsRepository transactionsRepository;
    private final CardRepository cardRepository;
    private final DebitCardRepository debitCardRepository;
    private final SavingRepository savingRepository;
    private final List<TransactionValidator<Object>> incomeValidator;

    @Autowired
    public IncomeService(TransactionsRepository transactionsRepository, CardRepository cardRepository, DebitCardRepository debitCardRepository, List<TransactionValidator<Object>> incomeValidator,
                         SavingRepository savingRepository){
        this.transactionsRepository =  transactionsRepository;
        this.cardRepository = cardRepository;
        this.incomeValidator = incomeValidator;
        this.debitCardRepository = debitCardRepository;
        this.savingRepository = savingRepository;
    }

    public IncomeResponseDTO registerIncome(IncomeDataDTO incomeDataDTO) {
        incomeValidator.forEach(i -> i.validation(incomeDataDTO));

        Transactions transactions;
        if(incomeDataDTO.debitCardId() != null){//La transaccion se hizo con tarjeta de debuito
            DebitCard debitCard = debitCardRepository.findById(incomeDataDTO.debitCardId())
                    .orElseThrow(() -> new EntityNotFoundException("La tarjeta de debito con el id: " + incomeDataDTO.debitCardId()));

            Double oldCurrentBalance = debitCard.getCurrentBalance();
            Double newCurrentBalance = oldCurrentBalance + incomeDataDTO.amount();
            debitCard.setCurrentBalance(newCurrentBalance);
            transactions = new Transactions(incomeDataDTO, debitCard.getCard());

            if(debitCard.getCard().getSaving() != null){
                Saving saving = debitCard.getCard().getSaving();
                SavingStatus savingStatus = SavingStatusEvalutator.savingStatusEvaluator(newCurrentBalance, saving.getTargetAmount());
                saving.setStatus(savingStatus);
                savingRepository.save(saving);
            }
        }else{
            transactions = new Transactions(incomeDataDTO);
        }

        transactionsRepository.save(transactions);

        return new IncomeResponseDTO(transactions);
    }

    public IncomeResponseDTO getIncome(Long id){
        Transactions transaction = transactionsRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Transaccion no encontrada con el id: " + id));

        if(transaction.getType() != TransactionType.INCOME){
            throw new RuntimeException("La transaccion no es un ingreso");
        }

        return new IncomeResponseDTO(transaction);
    }

    public List<IncomeResponseDTO> getIncomeList(Pageable pageable){
        /*List<IncomeResponseDTO> incomeList = transactionsRepository.findAll(pageable).getContent().stream()
                .filter(transaction -> transaction.getType().equals(TransactionType.INCOME))
                .map(transactions -> new IncomeResponseDTO(transactions))
                .toList();*/
        List<IncomeResponseDTO> incomeList = transactionsRepository.findAllByType(TransactionType.INCOME).stream()
                .map(IncomeResponseDTO::new)
                .toList();
        return incomeList;
    }

    public UpdateIncomeResponseDTO updateIncome(UpdateIncomeDTO updateIncomeDTO){
        incomeValidator.forEach(i -> i.validation(updateIncomeDTO));
        Transactions transaction = transactionsRepository.findById(updateIncomeDTO.incomeId())
                .orElseThrow(() -> new EntityNotFoundException("Transaccion no encontrada con id: " + updateIncomeDTO.incomeId()));

        transaction.updateIncome(updateIncomeDTO);

        transactionsRepository.save(transaction);
        return new UpdateIncomeResponseDTO(transaction);
    }

    public void deleteIcome(Long id){
        Transactions transaction = transactionsRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Transaccion no encontrada con id: " + id));

        transactionsRepository.delete(transaction);
    }
}
