CREATE TABLE credit_card(
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    credit_limit varchar(50) NOT NULL,
    debt REAL NOT NULL,
    card_id INTEGER,
    user_id INTEGER,

    foreign key (card_id) references card(id),
    foreign key (user_id) references user(id)
)
