-- Se o cliente está tentando comprar um prato que está indisponível, não realize a compra (gabriel)
DROP TRIGGER IF EXISTS verifica_disponibilidade_prato;

DELIMITER //

CREATE TRIGGER verifica_disponibilidade_prato
BEFORE INSERT ON venda
FOR EACH ROW
BEGIN
    DECLARE mensagem_erro VARCHAR(255);
    
    -- Verifica se o prato está disponível
    IF (SELECT disponibilidade FROM prato WHERE id = NEW.id_prato) = FALSE THEN
        SET mensagem_erro = CONCAT('Erro: O prato "', (SELECT nome FROM prato WHERE id = NEW.id_prato), '" está indisponível para venda.');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = mensagem_erro;
    END IF;
END //

DELIMITER ;







