-- Recebe um valor representando a compra e retorna a quantidade de pontos referente à compra

CREATE DEFINER=`testerpizza`@`localhost` FUNCTION `calculo_pontos`(valor DECIMAL(5, 2)) RETURNS int(11)
BEGIN
	DECLARE pontos INT;
    
    SET pontos := FLOOR(valor/10);
    
RETURN pontos;
END