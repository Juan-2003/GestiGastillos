CREATE TABLE saving(
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    name varchar(50) NOT NULL,
    target_amount REAL NOT NULL,
    card_id INTEGER,

    foreign key (card_id) references card(id)
)