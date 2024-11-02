CREATE USER 'Administrador'@'localhost' IDENTIFY BY '123';
CREATE USER 'Gerente'@'localhost' IDENTIFY BY '456';
CREATE USER 'Funcionario'@'localhost' IDENTIFY BY '789';

GRANT ALL PRIVILEGES ON restaurante.* TO 'Administrador'@'localhost';
GRANT SELECT, UPDATE, DELETE ON restaurante.* TO 'Gerente'@'localhost';
GRANT INSERT, SELECT ON restaurante.venda TO 'Funcionario'@'localhost';

FLUSH PRIVILEGES;
