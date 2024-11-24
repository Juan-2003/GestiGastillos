CREATE TABLE card(
     id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
     name varchar(50) NOT NULL,
     last_digits varchar(4) NOT NULL,
     expiration_date varchar(12) NOT NULL,
     credit_card_id INTEGER,
     debit_card_id INTEGER,
     saving_id INTEGER,
     reminder_id INTEGER,
     transactions_id INTEGER,
     user_id INTEGER,

     foreign key (credit_card_id) references credit_card(id),
     foreign key (debit_card_id) references debit_card(id),
     foreign key (saving_id) references saving(id),
     foreign key (reminder_id) references reminder(id),
     foreign key (transactions_id) references transactions(id),
     foreign key (user_id) references user(id)
)
