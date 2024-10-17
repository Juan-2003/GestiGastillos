CREATE TABLE transactions(
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  amount REAL NOT NULL,
  concept varchar(100) NOT NULL,
  category varchar(50) NOT NULL,
  payment_method varchar(50) NOT NULL,
  card_id INTEGER,

  FOREIGN KEY (card_id) REFERENCES card(id)
)