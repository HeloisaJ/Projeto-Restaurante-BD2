-- Quando um ingrediente vence a validade, torne o prato que tem o ingrediente indisponível (Heloísa).

-- Fiz de duas formas, uma com trigger e outra usando event.


-- TRIGGER
-- Verifica antes da venda se tem um ou mais ingredientes no prato a ser vendido fora da validade, se sim, atualiza pra FALSE a disponibilidade 

DELIMITER //
CREATE TRIGGER validade_ingrediente
BEFORE INSERT ON venda
FOR EACH ROW PRECEDES teste -- nome do trigger de checar se prato disponível, quando ele estiver feito, eu troco, mas é para garantir que ele seja executado antes de 'teste'
BEGIN 
	UPDATE prato 
    SET disponibilidade = FALSE
    WHERE id = (SELECT usos.id_prato
			FROM usos INNER JOIN ingredientes ON usos.id_ingrediente = ingredientes.id
			WHERE NEW.id_prato = usos.id_prato AND DATEDIFF(ingredientes.data_validade, CURDATE()) < 0);
END //

DELIMITER ;

--EVENT
-- A cada 15 segundos (pra fins de demonstração) verifica e faz o update dos pratos caso ele esteja associado a um ingrediente fora da validade

SET GLOBAL event_scheduler = ON; -- Configuração para permitir o uso de events no projeto

DELIMITER //

CREATE EVENT verificar_validade 
ON SCHEDULE EVERY 15 SECOND
DO
BEGIN
	UPDATE prato 
    SET disponibilidade = FALSE
    WHERE id IN (SELECT usos.id_prato
			FROM usos INNER JOIN ingredientes ON usos.id_ingrediente = ingredientes.id
			WHERE DATEDIFF(ingredientes.data_validade, CURDATE()) < 0);
END //

DELIMITER ;