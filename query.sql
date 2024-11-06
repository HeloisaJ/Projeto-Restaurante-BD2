DROP DATABASE Pizzaria;
CREATE DATABASE IF NOT EXISTS Pizzaria;
USE Pizzaria;

CREATE TABLE IF NOT EXISTS cliente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(60) NOT NULL,
    sexo ENUM('M', 'F') NOT NULL,
    idade INT NOT NULL,
    nascimento DATE NOT NULL,
    pontos INT NOT NULL
);

CREATE TABLE IF NOT EXISTS prato (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(40) NOT NULL,
    descricao TEXT NOT NULL,
    valor DECIMAL(5, 2) NOT NULL,
    disponibilidade BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS venda (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    id_prato INT NOT NULL,
    quantidade INT NOT NULL,
    dia DATE NOT NULL,
    hora TIME NOT NULL,
    valor DECIMAL(5, 2) NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES cliente(id),
    FOREIGN KEY (id_prato) REFERENCES prato(id)
);

CREATE TABLE IF NOT EXISTS fornecedor(
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(40) NOT NULL,
    estado_origem VARCHAR(19) NOT NULL
);

CREATE TABLE IF NOT EXISTS ingredientes(
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(30) NOT NULL,
    data_fabricacao DATE NOT NULL,
    data_validade DATE NOT NULL,
    quantidade SMALLINT NOT NULL,
    observacao VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS usos(
	id_prato INT NOT NULL,
    id_ingrediente INT NOT NULL,
	FOREIGN KEY (id_prato) REFERENCES prato(id),
    FOREIGN KEY (id_ingrediente) REFERENCES ingredientes(id)
);

INSERT INTO cliente (nome, sexo, idade, nascimento, pontos) VALUES
('Goku', 'M', 35, '1989-05-16', 100),
('Vegeta', 'M', 36, '1989-06-01', 150),
('Bulma', 'F', 34, '1989-04-25', 200),
('Gohan', 'M', 20, '2000-07-14', 250),
('Piccolo', 'M', 40, '1990-08-03', 80),
('Krillin', 'M', 34, '1990-10-10', 120),
('Frieza', 'M', 50, '1975-09-08', 300),
('Android 18', 'F', 29, '1994-12-15', 90),
('Trunks', 'M', 18, '2003-03-29', 60),
('Chi-Chi', 'F', 35, '1989-02-05', 110);   

INSERT INTO fornecedor (nome, estado_origem) VALUES
('Granja do Sol', 'Pernambuco'),
('Laticínios Alvez', 'Minas Gerais'),
('Distribuidora SP', 'Sao Paulo'),
('Fazenda Cooperativa', 'Paraiba'),
('Distribuidora Atacadão', 'Pernambuco'),
('Fábrica de Doces', 'Minas Gerais'),
('Fábrica de Chocolate', 'Rio Grande do Sul'),
('Fábrica da Perdigão', 'Santa Catarina'),
('Salina Cristal', 'Piaui'),
('Fazenda Azul', 'Rio Grande do Norte');

INSERT INTO ingredientes (nome, data_fabricacao, data_validade, quantidade) VALUES
('Farinha de trigo', '2024-10-02', '2025-01-23', 20), 
('Ovo', '2024-11-27', '2024-12-29', 24), 
('Presunto', '2024-10-13', '2024-12-15', 10), 
('Tomate', '2024-11-26', '2024-12-14', 14), 
('Muçarela', '2024-11-24', '2024-12-30', 12), 
('Abacaxi', '2024-11-28', '2024-12-15', 15), 
('Frango', '2024-11-27', '2024-12-13', 18), 
('Chocolate', '2024-10-16', '2025-01-10', 15), 
('Calabresa', '2024-11-14', '2024-12-16', 18), 
('Pepperoni', '2024-12-08', '2025-01-30', 19), 
('Fermento', '2024-11-27', '2025-01-02', 6), 
('Sal', '2024-10-08', '2025-01-06', 3), 
('Azeite', '2024-11-15', '2024-12-14', 4), 
('Bacon', '2024-11-24', '2024-12-14', 10), 
('Manjericão', '2024-11-14', '2024-12-29', 5), 
('Cebola', '2024-11-26', '2024-12-19', 5), 
('Catupiry', '2024-11-15', '2025-01-18', 5), 
('Azeitona', '2024-10-02', '2025-04-21', 20); 

INSERT INTO prato (nome, descricao, valor, disponibilidade) VALUES
('Marguerita', 'Pizza com molho de tomate, mozzarella e manjericão.', 30.00, TRUE),
('Chocolate', 'Pizza de chocolate com cobertura de granulado.', 25.00, TRUE),
('Muçarela', 'Pizza clássica de muçarela.', 28.00, TRUE),
('Peperoni', 'Pizza com fatias de peperoni e queijo.', 32.00, TRUE),
('Calabresa', 'Pizza de calabresa com cebola.', 28.00, TRUE),
('Frango com Catupiry', 'Pizza de frango desfiado com catupiry.', 34.00, TRUE),
('Abacaxi', 'Pizza de abacaxi com presunto.', 30.00, TRUE),
('Bacon', 'Pizza de bacon crocante.', 35.00, TRUE),
('Portuguesa', 'Pizza com ovos, presunto, cebola e azeitona.', 33.00, TRUE),
('Mista', 'Pizza com dois sabores: muçarela e calabresa.', 36.00, TRUE);     

INSERT INTO usos (id_prato, id_ingrediente) VALUES
(1, 1),
(1, 4),
(1, 5),
(1, 11),
(1, 12),
(1, 15),
(2, 1),
(2, 8),
(2, 11),
(3, 1),
(3, 4),
(3, 5),
(3, 11),
(3, 12),
(4, 1),
(4, 4),
(4, 5),
(4, 11),
(4, 10),
(5, 1),
(5, 4),
(5, 5),
(5, 9),
(5, 11),
(5, 12),
(5, 16),
(6, 1),
(6, 4),
(6, 5),
(6, 7),
(6, 11),
(6, 12),
(6, 13),
(6, 17),
(7, 1),
(7, 3),
(7, 4),
(7, 5),
(7, 6),
(7, 11),
(7, 12),
(8, 1),
(8, 4),
(8, 5),
(8, 11),
(8, 12),
(8, 14),
(9, 1),
(9, 2),
(9, 3),
(9, 4),
(9, 5),
(9, 11),
(9, 12),
(9, 13),
(9, 16),
(9, 18),
(10, 1),
(10, 4),
(10, 5),
(10, 9),
(10, 11),
(10, 12),
(10, 13),
(10, 16);

INSERT INTO venda (id_cliente, id_prato, quantidade, dia, hora, valor) VALUES
(1, 1, 2, '2024-10-15', '19:30:00', 60.00),
(2, 3, 1, '2024-10-14', '20:00:00', 28.00),
(3, 4, 3, '2024-10-13', '18:00:00', 96.00),
(4, 2, 1, '2024-10-12', '21:00:00', 25.00),
(5, 5, 2, '2024-10-11', '19:00:00', 56.00),
(6, 6, 1, '2024-10-10', '20:30:00', 34.00),
(7, 7, 4, '2024-10-09', '19:15:00', 140.00),
(8, 8, 1, '2024-10-08', '18:45:00', 35.00),
(9, 9, 2, '2024-10-07', '20:00:00', 66.00),
(10, 10, 1, '2024-10-06', '19:30:00', 36.00);

CREATE DEFINER=`testerpizza`@`localhost` FUNCTION `calculo_pontos`(valor DECIMAL(5, 2)) RETURNS INT
BEGIN
    DECLARE pontos INT;
    SET pontos = FLOOR(valor / 10);
    RETURN pontos;
END;

DROP PROCEDURE IF EXISTS reajuste;

CREATE PROCEDURE IF NOT EXISTS reajuste(IN percent DECIMAL(5,4))
BEGIN
    UPDATE prato
    SET valor = valor * (1 + percent);
END;

DROP PROCEDURE IF EXISTS Gastar_pontos;

CREATE PROCEDURE `Gastar_pontos` (IN id_cliente INT, IN id_prato INT, IN quantidade INT, IN dia DATE, IN hora TIME, IN valor DECIMAL(5, 2))
BEGIN
    DECLARE quant_pontos INT;  -- Changed to INT to match pontos type
    DECLARE valor_pedido INT;

    SELECT pontos INTO quant_pontos
    FROM cliente
    WHERE id_cliente = id_cliente;  -- Fixed variable reference
    
    SET valor_pedido := CEILING(valor);
    
    IF quant_pontos >= valor_pedido THEN
        SET quant_pontos := quant_pontos - valor_pedido;
        UPDATE cliente SET pontos = quant_pontos WHERE id_cliente = id_cliente;  -- Fixed variable reference
        
        INSERT INTO venda (id_cliente, id_prato, quantidade, dia, hora, valor) 
        VALUES (id_cliente, id_prato, quantidade, dia, hora, valor);
    ELSE 
        SELECT quant_pontos;  -- This will output the quant_pontos if insufficient
    END IF;
END;

DROP PROCEDURE IF EXISTS EstatisticasVendas;

CREATE PROCEDURE EstatisticasVendas()
BEGIN
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

    SELECT 
        DATE_FORMAT(v.dia, '%Y-%m') AS mes_menos
    INTO mes_menos_vendas
    FROM venda v
    JOIN prato p ON v.id_prato = p.id
    WHERE p.nome = produto_mais_vendido
    GROUP BY mes_menos
    ORDER BY SUM(v.quantidade) ASC
    LIMIT 1;

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

    SELECT 
        DATE_FORMAT(v.dia, '%Y-%m') AS mes_mais
    INTO mes_menos_vendas_menos
    FROM venda v
    JOIN prato p ON v.id_prato = p.id
    WHERE p.nome = produto_menos_vendido
    GROUP BY mes_mais
    ORDER BY SUM(v.quantidade) DESC
    LIMIT 1;

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
END;

CALL EstatisticasVendas();

DROP PROCEDURE IF EXISTS sorteia_cliente_premiado;

CREATE PROCEDURE sorteia_cliente_premiado()
BEGIN
    DECLARE cliente_id INT;

    SELECT id INTO cliente_id
    FROM cliente
    ORDER BY RAND()
    LIMIT 1;

    UPDATE cliente
    SET pontos = pontos + 100
    WHERE id = cliente_id;

END;

DROP TRIGGER IF EXISTS sales_update;

CREATE TRIGGER sales_update
AFTER INSERT
ON venda
FOR EACH ROW
BEGIN
	UPDATE ingredientes
	SET quantidade = quantidade - NEW.quantidade
	WHERE id IN
	(
		SELECT 
			a.id_ingrediente
		FROM 
			usos a
		WHERE 
			a.id_prato = NEW.id_prato 
	);
END;

DROP EVENT IF EXISTS verificar_validade;

SET GLOBAL event_scheduler = ON;

CREATE EVENT verificar_validade 
ON SCHEDULE EVERY 15 SECOND
DO
BEGIN
	UPDATE prato 
    SET disponibilidade = FALSE
    WHERE id IN (SELECT usos.id_prato
			FROM usos INNER JOIN ingredientes ON usos.id_ingrediente = ingredientes.id
			WHERE DATEDIFF(ingredientes.data_validade, CURDATE()) < 0);
END;

DROP TRIGGER IF EXISTS calcula_pontos;

CREATE TRIGGER calcula_pontos
AFTER INSERT ON venda
FOR EACH ROW 
BEGIN
    DECLARE pontos_ganhos INT;

    IF NEW.valor > 0 THEN
        SET pontos_ganhos = FLOOR(NEW.valor / 10);

        IF EXISTS (SELECT 1 FROM cliente WHERE id = NEW.id_cliente) THEN
            UPDATE cliente
            SET pontos = pontos + pontos_ganhos
            WHERE id = NEW.id_cliente;
        END IF;
    END IF;
END;

DROP TRIGGER IF EXISTS verifica_disponibilidade_prato;

CREATE TRIGGER verifica_disponibilidade_prato
BEFORE INSERT ON venda
FOR EACH ROW
BEGIN
    DECLARE disponibilidade_prato BOOLEAN;

    SELECT disponibilidade INTO disponibilidade_prato
    FROM prato 
    WHERE id = NEW.id_prato
    LIMIT 1;

    IF disponibilidade_prato = FALSE THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Erro: O prato está indisponível para venda.';
    END IF;
END;

SELECT
	a.nome,
	b.dia,
	b.valor
FROM
	cliente a
INNER JOIN 
	venda b
ON 
	a.id = b.id_cliente;

SELECT
	*
FROM 
	cliente
WHERE 
	cliente.sexo = "M"
GROUP BY
	cliente.idade;

SELECT
	a.nome AS nome_prato,
	b.nome AS nome_ingrediente
FROM
	prato a
LEFT JOIN 
	usos c
ON 
	a.id = c.id_prato
RIGHT JOIN
	ingredientes b
ON
	b.id = c.id_ingrediente;

CREATE USER 'Administrador'@'localhost' IDENTIFY BY '123';
CREATE USER 'Gerente'@'localhost' IDENTIFY BY '456';
CREATE USER 'Funcionario'@'localhost' IDENTIFY BY '789';

GRANT ALL PRIVILEGES ON Pizzaria.* TO 'Administrador'@'localhost';
GRANT SELECT, UPDATE, DELETE ON Pizzaria.* TO 'Gerente'@'localhost';
GRANT INSERT, SELECT ON Pizzaria.venda TO 'Funcionario'@'localhost';

FLUSH PRIVILEGES;