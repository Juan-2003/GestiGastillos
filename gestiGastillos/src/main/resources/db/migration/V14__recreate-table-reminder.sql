CREATE TABLE reminder(
     id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
     name varchar(50) NOT NULL,
     message varchar(100) NOT NULL,
     card_id INTEGER,
     user_id INTEGER,

     foreign key (card_id) references card(id),
     foreign key (user_id) references user(id)
)
