-- [Venda] Sempre que ocorrer uma venda reduzir em 1 a quantidade do produto (pepeu)
DELIMITER //

CREATE TRIGGER sales_update
AFTER UPDATE
ON table_name -- ver em prato quais os ingredientes necessarios e as quantidades necessarias e reduzir todos pela quanditade utilizada
FOR EACH ROW
BEGIN
    -- TRIGGER body
END//

DELIMITER ;
