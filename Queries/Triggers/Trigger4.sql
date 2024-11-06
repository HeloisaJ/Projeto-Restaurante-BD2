-- Se o cliente está tentando comprar um prato que está indisponível, não realize a compra (gabriel)
DROP TRIGGER IF EXISTS verifica_disponibilidade_prato;

DELIMITER //

DELIMITER //

CREATE TRIGGER verifica_disponibilidade_prato
BEFORE INSERT ON venda
FOR EACH ROW
BEGIN
    DECLARE disponibilidade_prato BOOLEAN;

    -- Obtém a disponibilidade do prato
    SELECT disponibilidade INTO disponibilidade_prato
    FROM prato 
    WHERE id = NEW.id_prato
    LIMIT 1;

    -- Verifica se o prato está disponível
    IF disponibilidade_prato = FALSE THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Erro: O prato está indisponível para venda.';
    END IF;
END //

DELIMITER ;
