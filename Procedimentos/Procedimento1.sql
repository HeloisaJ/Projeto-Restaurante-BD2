-- reajuste [pepeu]
DELIMITER //

CREATE PROCEDURE reajuste(percent)
BEGIN
    UPDATE prato
    SET
        valor = valor * (1+percent);
END//

DELIMITER ;