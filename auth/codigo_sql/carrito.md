REGLAS:
lo que esta entre /**/ es un comentario

##codigo SQL para crear carrito

CREATE TABLE carritos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    FOREING KEY (user_id) REFERENCES usuarios(id) 
)