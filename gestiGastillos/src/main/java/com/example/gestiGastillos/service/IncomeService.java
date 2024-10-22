package com.example.gestiGastillos.service;

import com.example.gestiGastillos.dto.creditCard.UpdateCreditCardDTO;
import com.example.gestiGastillos.dto.transactions.income.IncomeDataDTO;
import com.example.gestiGastillos.dto.transactions.income.IncomeResponseDTO;
import com.example.gestiGastillos.dto.transactions.income.UpdateIncomeDTO;
import com.example.gestiGastillos.dto.transactions.income.UpdateIncomeResponseDTO;
import com.example.gestiGastillos.model.card.Card;
import com.example.gestiGastillos.model.debitCard.DebitCard;
import com.example.gestiGastillos.model.transactions.TransactionType;
import com.example.gestiGastillos.model.transactions.Transactions;
import com.example.gestiGastillos.model.transactions.income.IncomeValidator;
import com.example.gestiGastillos.repository.CardRepository;
import com.example.gestiGastillos.repository.DebitCardRepository;
import com.example.gestiGastillos.repository.TransactionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IncomeService {
    private final TransactionsRepository transactionsRepository;
    private final CardRepository cardRepository;
    private final DebitCardRepository debitCardRepository;
    private final List<IncomeValidator> incomeValidator;

    @Autowired
    public IncomeService(TransactionsRepository transactionsRepository, CardRepository cardRepository, DebitCardRepository debitCardRepository, List<IncomeValidator> incomeValidator){
        this.transactionsRepository =  transactionsRepository;
        this.cardRepository = cardRepository;
        this.incomeValidator = incomeValidator;
        this.debitCardRepository = debitCardRepository;
    }

    public IncomeResponseDTO registerIncome(IncomeDataDTO incomeDataDTO) {
        incomeValidator.forEach(i -> i.validation(incomeDataDTO));
        Transactions transactions;

        if(incomeDataDTO.debitCardId() != null){//La transaccion se hizo con tarjeta
            DebitCard debitCard = debitCardRepository.findById(incomeDataDTO.debitCardId())
                    .orElseThrow(() -> new RuntimeException("La tarjeta no existe"));

            Double currentBalance = debitCard.getCurrentBalance();
            currentBalance += incomeDataDTO.amount();
            debitCard.setCurrentBalance(currentBalance);
            transactions = new Transactions(incomeDataDTO, debitCard.getCard());
        }else{
            transactions = new Transactions(incomeDataDTO);
        }

        transactionsRepository.save(transactions);
        return new IncomeResponseDTO(transactions);
    }

    public IncomeResponseDTO getIncome(Long id){
        Transactions transactions = transactionsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaccion no encontrada"));
        Card card = cardRepository.getReferenceById(transactions.getCard().getId());

        return new IncomeResponseDTO(transactions);
    }

    public List<IncomeResponseDTO> getIncomeList(Pageable pageable){
        List<IncomeResponseDTO> incomeList = transactionsRepository.findAll(pageable).getContent().stream()
                .filter(transaction -> transaction.getType().equals(TransactionType.INCOME))
                .map(transactions -> new IncomeResponseDTO(transactions))
                .toList();

        return incomeList;
    }

    public UpdateIncomeResponseDTO upateIncome(UpdateIncomeDTO updateIncomeDTO){
        Transactions transaction = transactionsRepository.findById(updateIncomeDTO.incomeId())
                .orElseThrow(() -> new RuntimeException("Transaccion no encontrada"));

        transaction.update(updateIncomeDTO);

        transactionsRepository.save(transaction);
        return new UpdateIncomeResponseDTO(transaction);
    }

    public void deleteIcome(Long id){
        Transactions transaction = transactionsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaccion no encontrada"));

        transactionsRepository.delete(transaction);
    }
}
