CREATE USER 'Administrador'@'localhost' IDENTIFY BY '123';
CREATE USER 'Gerente'@'localhost' IDENTIFY BY '456';
CREATE USER 'Funcionario'@'localhost' IDENTIFY BY '789';

GRANT ALL PRIVILEGES ON Pizzaria.* TO 'Administrador'@'localhost';
GRANT SELECT, UPDATE, DELETE ON Pizzaria.* TO 'Gerente'@'localhost';
GRANT INSERT, SELECT ON Pizzaria.venda TO 'Funcionario'@'localhost';

FLUSH PRIVILEGES;
