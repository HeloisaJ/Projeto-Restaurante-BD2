CREATE TABLE fornecedor(
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(40) NOT NULL,
    estado_origem VARCHAR(19) NOT NULL
);

CREATE TABLE ingredientes(
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(30) NOT NULL,
    data_fabricacao DATE NOT NULL,
    data_validade DATE NOT NULL,
    quantidade SMALLINT NOT NULL,
    observacao VARCHAR(100)
);

CREATE TABLE usos(
	id_prato INT NOT NULL,
    id_ingrediente INT NOT NULL,
	FOREIGN KEY (id_prato) REFERENCES prato(id),
    FOREIGN KEY (id_ingrediente) REFERENCES ingredientes(id)
);