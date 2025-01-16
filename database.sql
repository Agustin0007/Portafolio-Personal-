CREATE DATABASE portafolioagustinpatat;
USE portafolioagustinpatat;

CREATE TABLE `formulario_de_consulta` (
  `Nombre` varchar(49) NOT NULL,
  `Telefono` bigint NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Mensaje` varchar(500) NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
)