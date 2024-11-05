-- Se o cliente está tentando comprar um prato que está indisponível, não realize a compra (gabriel)
DROP TRIGGER IF EXISTS verifica_disponibilidade_prato;

DELIMITER //

CREATE TRIGGER verifica_disponibilidade_prato
BEFORE INSERT ON venda
FOR EACH ROW
BEGIN
    -- Verifica se o prato está disponível
    IF (SELECT disponibilidade FROM prato WHERE id = NEW.id_prato) = FALSE THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Erro: O prato está indisponível para venda.';
    END IF;
END //

DELIMITER ;






