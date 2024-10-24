-- [Venda] Sempre que ocorrer uma venda reduzir em 1 a quantidade do produto (pepeu)
DROP TRIGGER IF EXISTS sales_update;

DELIMITER //

CREATE TRIGGER sales_update
AFTER INSERT
ON venda -- apos a venda, diminuir a quantidade de ingredientes
FOR EACH ROW
BEGIN
    -- TRIGGER body
	UPDATE ingredientes
	SET quantidade = quantidade - NEW.quantidade
	WHERE id IN
	(
		SELECT 
			a.id_ingrediente
		FROM 
			usos a
		WHERE 
			a.id_prato = NEW.id_prato 
	);
END//

DELIMITER ;
