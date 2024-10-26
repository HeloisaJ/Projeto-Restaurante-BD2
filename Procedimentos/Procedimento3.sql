DELIMITER //

CREATE PROCEDURE ObterEstatisticasVendas()
BEGIN
    DECLARE produto_mais_vendido VARCHAR(255);
    DECLARE produto_menos_vendido VARCHAR(255);
    DECLARE valor_mais_vendido DECIMAL(10, 2);
    DECLARE valor_menos_vendido DECIMAL(10, 2);
    DECLARE mes_mais_vendas VARCHAR(7);
    DECLARE mes_menos_vendas VARCHAR(7);
    
    -- Produto mais vendido
    SELECT p.nome, SUM(v.quantidade) AS total_vendido, SUM(v.valor) AS total_valor
    INTO produto_mais_vendido, valor_mais_vendido
    FROM venda v
    JOIN prato p ON v.id_prato = p.id
    GROUP BY v.id_prato
    ORDER BY total_vendido DESC
    LIMIT 1;

    -- Produto menos vendido
    SELECT p.nome, SUM(v.quantidade) AS total_vendido, SUM(v.valor) AS total_valor
    INTO produto_menos_vendido, valor_menos_vendido
    FROM venda v
    JOIN prato p ON v.id_prato = p.id
    GROUP BY v.id_prato
    ORDER BY total_vendido ASC
    LIMIT 1;

    -- Mês de maior vendas do produto mais vendido
    SELECT DATE_FORMAT(v.dia, '%Y-%m') AS mes, SUM(v.quantidade) AS total_vendido
    INTO mes_mais_vendas
    FROM venda v
    JOIN prato p ON v.id_prato = p.id
    WHERE p.nome = produto_mais_vendido
    GROUP BY mes
    ORDER BY total_vendido DESC
    LIMIT 1;

    -- Mês de menor vendas do produto menos vendido
    SELECT DATE_FORMAT(v.dia, '%Y-%m') AS mes, SUM(v.quantidade) AS total_vendido
    INTO mes_menos_vendas
    FROM venda v
    JOIN prato p ON v.id_prato = p.id
    WHERE p.nome = produto_menos_vendido
    GROUP BY mes
    ORDER BY total_vendido ASC
    LIMIT 1;

    -- Exibir resultados
    SELECT 
        produto_mais_vendido AS 'Produto Mais Vendido',
        valor_mais_vendido AS 'Valor Ganho com Produto Mais Vendido',
        mes_mais_vendas AS 'Mês de Maior Vendas do Produto Mais Vendido',
        produto_menos_vendido AS 'Produto Menos Vendido',
        valor_menos_vendido AS 'Valor Ganho com Produto Menos Vendido',
        mes_menos_vendas AS 'Mês de Menor Vendas do Produto Menos Vendido';
END //

DELIMITER ;
