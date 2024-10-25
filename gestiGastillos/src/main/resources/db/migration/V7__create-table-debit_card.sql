CREATE TABLE debit_card(
       id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
       current_balance REAL NOT NULL,
       card_id INTEGER,
       user_id INTEGER,

       foreign key (card_id) references card(id),
       foreign key (user_id) references user(id)
)