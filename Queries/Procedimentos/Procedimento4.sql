-- Sorteio [gabriel]
DELIMITER //

CREATE PROCEDURE sorteia_cliente_premiado()
BEGIN
    DECLARE cliente_id INT;

    SELECT id INTO cliente_id
    FROM cliente
    ORDER BY RAND()
    LIMIT 1;

    UPDATE cliente
    SET pontos = pontos + 100
    WHERE id = cliente_id;

END //

DELIMITER ;
