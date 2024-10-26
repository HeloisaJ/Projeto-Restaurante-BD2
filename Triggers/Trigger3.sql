DELIMITER //
CREATE TRIGGER calcula_pontos
AFTER INSERT ON venda
FOR EACH ROW 
BEGIN
    DECLARE pontos_ganhos INT;

    -- Verifica se o valor da venda é válido (não negativo)
    IF NEW.valor > 0 THEN
        -- Calcula os pontos ganhos com base no valor da venda
        SET pontos_ganhos = FLOOR(NEW.valor / 10);

        -- Verifica se o cliente existe antes de atualizar os pontos
        IF EXISTS (SELECT 1 FROM cliente WHERE id = NEW.id_cliente) THEN
            -- Atualiza os pontos do cliente
            UPDATE cliente
            SET pontos = pontos + pontos_ganhos
            WHERE id = NEW.id_cliente;
        END IF;
    END IF;
END //
DELIMITER ;
