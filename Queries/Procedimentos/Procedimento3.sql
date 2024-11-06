DELIMITER //

CREATE PROCEDURE EstatisticasVendas()
BEGIN
    -- Variáveis para armazenar resultados
    DECLARE produto_mais_vendido VARCHAR(40);
    DECLARE quantidade_vendida_mais INT;
    DECLARE valor_ganho_mais DECIMAL(10, 2);
    DECLARE mes_mais_vendas VARCHAR(7); -- Mantendo o formato 'YYYY-MM'
    DECLARE mes_menos_vendas VARCHAR(7); -- Mantendo o formato 'YYYY-MM'

    DECLARE produto_menos_vendido VARCHAR(40);
    DECLARE quantidade_vendida_menos INT;
    DECLARE valor_ganho_menos DECIMAL(10, 2);
    DECLARE mes_mais_vendas_menos VARCHAR(7); -- Mantendo o formato 'YYYY-MM'
    DECLARE mes_menos_vendas_menos VARCHAR(7); -- Mantendo o formato 'YYYY-MM'

    -- Produto mais vendido
    SELECT 
        p.nome AS nome_prato,
        SUM(v.quantidade) AS total_vendido,
        SUM(v.valor) AS total_valor,
        DATE_FORMAT(v.dia, '%Y-%m') AS mes_venda
    INTO produto_mais_vendido, quantidade_vendida_mais, valor_ganho_mais, mes_mais_vendas
    FROM venda v
    JOIN prato p ON v.id_prato = p.id
    GROUP BY v.id_prato
    ORDER BY total_vendido DESC
    LIMIT 1;

    -- Obter mês de menor vendas do produto mais vendido
    SELECT 
        DATE_FORMAT(v.dia, '%Y-%m') AS mes_menos
    INTO mes_menos_vendas
    FROM venda v
    JOIN prato p ON v.id_prato = p.id
    WHERE p.nome = produto_mais_vendido
    GROUP BY mes_menos
    ORDER BY SUM(v.quantidade) ASC
    LIMIT 1;

    -- Produto menos vendido
    SELECT 
        p.nome AS nome_prato,
        SUM(v.quantidade) AS total_vendido,
        SUM(v.valor) AS total_valor,
        DATE_FORMAT(v.dia, '%Y-%m') AS mes_venda
    INTO produto_menos_vendido, quantidade_vendida_menos, valor_ganho_menos, mes_mais_vendas_menos
    FROM venda v
    JOIN prato p ON v.id_prato = p.id
    GROUP BY v.id_prato
    ORDER BY total_vendido ASC
    LIMIT 1;

    -- Obter mês de maior vendas do produto menos vendido
    SELECT 
        DATE_FORMAT(v.dia, '%Y-%m') AS mes_mais
    INTO mes_menos_vendas_menos
    FROM venda v
    JOIN prato p ON v.id_prato = p.id
    WHERE p.nome = produto_menos_vendido
    GROUP BY mes_mais
    ORDER BY SUM(v.quantidade) DESC
    LIMIT 1;

    -- Resultado
    SELECT 
        produto_mais_vendido AS 'Produto Mais Vendido',
        quantidade_vendida_mais AS 'Quantidade Vendida (Mais)',
        valor_ganho_mais AS 'Valor Ganho (Mais)',
        mes_mais_vendas AS 'Mês Mais Vendas (Mais)',
        mes_menos_vendas AS 'Mês Menos Vendas (Mais)',
        produto_menos_vendido AS 'Produto Menos Vendido',
        quantidade_vendida_menos AS 'Quantidade Vendida (Menos)',
        valor_ganho_menos AS 'Valor Ganho (Menos)',
        mes_mais_vendas_menos AS 'Mês Mais Vendas (Menos)',
        mes_menos_vendas_menos AS 'Mês Menos Vendas (Menos)';
END //

DELIMITER ;

CALL EstatisticasVendas();

DROP PROCEDURE IF EXISTS EstatisticasVendas;