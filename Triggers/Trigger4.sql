-- O cliente ganha 1 ponto para cada 10 reais gastos, implemente o trigger que automatiza este calculo; (gabriel)
DROP TRIGGER IF EXISTS increment_point;

DELIMITER //

CREATE TRIGGER increment_point
AFTER INSERT
ON vendas
FOR EACH ROW
BEGIN
    UPDATE cliente
    SET ponto = ponto + calculo_pontos(NEW.valor)
    WHERE id = NEW.id_cliente;
END//

DELIMITER ;






