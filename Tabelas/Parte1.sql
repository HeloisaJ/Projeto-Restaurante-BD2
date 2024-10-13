CREATE TABLE fornecedor(
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(40),
    estado_origem VARCHAR(19)
);

CREATE TABLE ingredientes(
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(30),
    data_fabricacao DATE,
    data_validade DATE,
    quantidade SMALLINT,
    observacao VARCHAR(100)
);

CREATE TABLE usos(
	id_prato INT,
    id_ingrediente INT,
	FOREIGN KEY (id_prato) REFERENCES prato(id),
    FOREIGN KEY (id_ingrediente) REFERENCES ingredientes(id)
);