CREATE TABLE saving(
   id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
   name varchar(50) NOT NULL,
   target_amount REAL NOT NULL,
   status varchar(20),
   card_id INTEGER,
   user_id INTEGER,

   foreign key (card_id) references card(id),
   foreign key (user_id) references user(id)
)