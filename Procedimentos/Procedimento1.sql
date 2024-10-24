-- reajuste [pepeu]
DROP PROCEDURE IF EXISTS reajuste;

-- reveba um ajuste em percentual e aumente o valor em todos os pratos

DELIMITER //

CREATE PROCEDURE IF NOT EXISTS reajuste(percent DECIMAL(5,4))
BEGIN
    UPDATE 
	prato
    SET
        valor = valor * (1+percent);
END//

DELIMITER ;
