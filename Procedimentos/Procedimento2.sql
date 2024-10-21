-- Gastar_pontos: Use os pontos do usuário para comprar um prato

DELIMITER //

CREATE PROCEDURE `Gastar_pontos` (IN id_cliente INT, IN id_prato INT, IN quantidade INT, IN dia DATE, IN hora TIME, IN valor DECIMAL(5, 2))
BEGIN
	DECLARE quant_pontos DECIMAL(5, 2);
    DECLARE valor_pedido INT;
    
	SELECT pontos INTO quant_pontos
    FROM cliente
    WHERE id_cliente = cliente.id;
    
    SET valor_pedido := CEILING(valor);
    
    IF quant_pontos >= valor_pedido THEN
		SET quant_pontos := quant_pontos - valor_pedido;
        UPDATE cliente SET pontos = quant_pontos WHERE id = id_cliente;
        
        INSERT INTO venda (id_cliente, id_prato, quantidade, dia, hora, valor) VALUES
        (id_cliente, id_prato, quantidade, dia, hora, valor);
	ELSE 
		SELECT quant_pontos;
    END IF;
END //

DELIMITER ;