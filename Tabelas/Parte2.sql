-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS Pizzaria;
USE Pizzaria;

-- Tabela de Clientes
CREATE TABLE cliente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    sexo ENUM('M', 'F') NOT NULL,
    idade INT NOT NULL,
    nascimento DATE NOT NULL,
    pontos INT NOT NULL
);

-- Tabela de Pratos
CREATE TABLE prato (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    disponibilidade BOOLEAN NOT NULL
);

-- Tabela de Vendas
CREATE TABLE venda (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    id_prato INT NOT NULL,
    quantidade INT NOT NULL,
    dia DATE NOT NULL,
    hora TIME NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES cliente(id),
    FOREIGN KEY (id_prato) REFERENCES prato(id)
);