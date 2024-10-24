-- outer join
SELECT
    -- columns
	a.nome AS nome_prato,
	b.nome AS nome_ingrediente
FROM
    -- tables
	prato a
LEFT JOIN 
    -- other tables
	usos c
ON 
    -- condition
	a.id = c.id_prato
RIGHT JOIN
	ingredientes b
ON
	b.id = c.id_ingrediente
;
