-- group by
-- idea: group by sex, or if the plate is avaliable
SELECT
    -- columns
	*
FROM 
    -- tables
	cliente
WHERE 
    -- condition
	cliente.sexo = "M"
GROUP BY
    -- group
	cliente.idade
;
