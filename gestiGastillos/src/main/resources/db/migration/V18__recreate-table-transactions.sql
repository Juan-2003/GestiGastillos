CREATE TABLE transactions(
     id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
     amount REAL NOT NULL,
     concept varchar(100) NOT NULL,
     category varchar(50) NOT NULL,
     payment_method varchar(50) NOT NULL,
     type varchar(10) NOT NULL,
     date varchar(12) NOT NULL,
     title varchar(20) NOT NULL,
     card_id INTEGER,
     user_id INTEGER,

     FOREIGN KEY (card_id) REFERENCES card(id),
     FOREIGN KEY (user_id) REFERENCES user(id)
)