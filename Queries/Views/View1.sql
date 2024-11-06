-- Pepeu

-- inner join
-- idea: see all products that use some ingredient
SELECT
    -- columns
	a.nome,
	b.dia,
	b.valor
FROM
    -- tables
	cliente a
INNER JOIN 
    -- table
	venda b
ON 
    -- condition
	a.id = b.id_cliente
;

