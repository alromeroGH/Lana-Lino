-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-06-2025 a las 04:36:36
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `lanaylino`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id_categoria` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_pedido`
--

CREATE TABLE `detalle_pedido` (
  `id_detalle_pedido` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL,
  `id_pedido` int(11) NOT NULL,
  `id_inventario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favorito`
--

CREATE TABLE `favorito` (
  `id_favorito` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventario`
--

CREATE TABLE `inventario` (
  `id_inventario` int(11) NOT NULL,
  `talle` varchar(20) NOT NULL,
  `color` varchar(50) NOT NULL,
  `stock` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `id_pedido` int(11) NOT NULL,
  `fecha_pedido` date NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `metodo_pago` varchar(20) NOT NULL,
  `estado` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id_producto` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `genero` varchar(20) NOT NULL,
  `id_categoria` int(11) NOT NULL,
  `imagen` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(20) NOT NULL,
  `direccion` varchar(50) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `rol` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  ADD PRIMARY KEY (`id_detalle_pedido`),
  ADD KEY `id_pedido` (`id_pedido`),
  ADD KEY `id_inventario` (`id_inventario`);

--
-- Indices de la tabla `favorito`
--
ALTER TABLE `favorito`
  ADD PRIMARY KEY (`id_favorito`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `inventario`
--
ALTER TABLE `inventario`
  ADD PRIMARY KEY (`id_inventario`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`id_pedido`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id_producto`),
  ADD KEY `id_categoria` (`id_categoria`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  MODIFY `id_detalle_pedido` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `favorito`
--
ALTER TABLE `favorito`
  MODIFY `id_favorito` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `inventario`
--
ALTER TABLE `inventario`
  MODIFY `id_inventario` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `id_pedido` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  ADD CONSTRAINT `detalle_pedido_ibfk_1` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id_pedido`),
  ADD CONSTRAINT `detalle_pedido_ibfk_2` FOREIGN KEY (`id_inventario`) REFERENCES `inventario` (`id_inventario`);

--
-- Filtros para la tabla `favorito`
--
ALTER TABLE `favorito`
  ADD CONSTRAINT `favorito_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  ADD CONSTRAINT `favorito_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`);

--
-- Filtros para la tabla `inventario`
--
ALTER TABLE `inventario`
  ADD CONSTRAINT `inventario_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`);

--
-- Filtros para la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

INSERT INTO `categoria` (`nombre`) VALUES
('Remeras'),
('Pantalones'),
('Camperas'),
('Accesorios'),
('Calzado'),
('Vestidos'),
('Faldas'),
('Buzos');

INSERT INTO `producto` (`nombre`, `descripcion`, `precio`, `genero`, `id_categoria`, `imagen`) VALUES
('Remera Algodón Básica', 'Remera de algodón 100%, ideal para uso diario.', 15.99, 'Unisex', 1, 'remera_basica.jpg'),
('Jean Slim Fit', 'Jean moderno con corte ajustado, cómodo y duradero.', 45.00, 'Masculino', 2, 'jean_slim.jpg'),
('Campera Impermeable', 'Campera ligera e impermeable, perfecta para días de lluvia.', 79.50, 'Unisex', 3, 'campera_impermeable.jpg'),
('Gorra Deportiva', 'Gorra ajustable con logo bordado, ideal para actividades al aire libre.', 12.00, 'Unisex', 4, 'gorra_deportiva.jpg'),
('Zapatillas Urbanas', 'Zapatillas cómodas y con estilo para el uso diario.', 65.00, 'Unisex', 5, 'zapatillas_urbanas.jpg'),
('Vestido Verano Floral', 'Vestido fresco con estampado floral, perfecto para el verano.', 39.99, 'Femenino', 6, 'vestido_floral.jpg'),
('Falda Plisada Midi', 'Falda elegante con plisado, ideal para un look casual o formal.', 30.50, 'Femenino', 7, 'falda_plisada.jpg'),
('Buzo con Capucha Oversize', 'Buzo de algodón con capucha, estilo oversize para mayor comodidad.', 55.00, 'Unisex', 8, 'buzo_oversize.jpg'),
('Remera Estampada Vintage', 'Remera de algodón con estampado estilo vintage.', 19.99, 'Unisex', 1, 'remera_estampada.jpg'),
('Pantalón Chino Clásico', 'Pantalón chino de corte clásico, versátil para cualquier ocasión.', 40.00, 'Masculino', 2, 'pantalon_chino.jpg'),
('Campera Denim', 'Clásica campera de jean, un infaltable en tu guardarropa.', 69.00, 'Unisex', 3, 'campera_denim.jpg'),
('Cinturón de Cuero', 'Cinturón de cuero genuino, duradero y elegante.', 25.00, 'Unisex', 4, 'cinturon_cuero.jpg'),
('Botas de Cuero Urbanas', 'Botas de cuero cómodas y con estilo, ideales para el invierno.', 85.00, 'Masculino', 5, 'botas_cuero.jpg'),
('Vestido Noche Elegante', 'Vestido de noche con detalles elegantes, perfecto para eventos especiales.', 95.00, 'Femenino', 6, 'vestido_noche.jpg'),
('Falda Corta Jean', 'Falda corta de jean, ideal para un look casual y juvenil.', 28.00, 'Femenino', 7, 'falda_jean.jpg'),
('Buzo Cuello Redondo', 'Buzo de cuello redondo sin capucha, ideal para un look más formal.', 48.00, 'Unisex', 8, 'buzo_cuello_redondo.jpg');

INSERT INTO `inventario` (`talle`, `color`, `stock`, `id_producto`) VALUES
('S', 'Blanco', 50, 1),
('M', 'Blanco', 60, 1),
('L', 'Blanco', 45, 1),
('S', 'Negro', 55, 1),
('M', 'Negro', 65, 1),
('L', 'Negro', 50, 1),
('30', 'Azul Oscuro', 30, 2),
('32', 'Azul Oscuro', 35, 2),
('34', 'Azul Oscuro', 25, 2),
('M', 'Gris', 20, 3),
('L', 'Gris', 22, 3),
('Único', 'Negro', 70, 4),
('40', 'Blanco', 28, 5),
('42', 'Blanco', 32, 5),
('S', 'Floral', 15, 6),
('M', 'Floral', 18, 6),
('S', 'Negro', 25, 7),
('M', 'Negro', 30, 7),
('L', 'Negro', 20, 7),
('M', 'Gris Melange', 40, 8),
('L', 'Gris Melange', 35, 8),
('XL', 'Gris Melange', 30, 8),
('M', 'Blanco', 25, 9),
('L', 'Negro', 20, 9),
('32', 'Beige', 18, 10),
('34', 'Verde Oliva', 15, 10),
('M', 'Azul Claro', 22, 11),
('L', 'Azul Oscuro', 19, 11),
('Único', 'Marrón', 40, 12),
('41', 'Negro', 15, 13),
('43', 'Marrón', 12, 13),
('S', 'Negro', 10, 14),
('M', 'Rojo', 8, 14),
('S', 'Azul Claro', 30, 15),
('M', 'Azul Medio', 25, 15),
('L', 'Azul Oscuro', 20, 15),
('M', 'Negro', 35, 16),
('L', 'Gris', 30, 16);

INSERT INTO `usuario` (`nombre`, `apellido`, `email`, `password`, `direccion`, `telefono`, `rol`) VALUES
('Juan', 'Perez', 'juan.perez@example.com', 'pass123', 'Calle Falsa 123', '3425551111', 'cliente'),
('Maria', 'Gomez', 'maria.gomez@example.com', 'securepass', 'Avenida Siempreviva 742', '3425552222', 'cliente'),
('Carlos', 'Rodriguez', 'carlos.rod@example.com', 'adminpass', 'Boulevard de los Sueños 500', '3425553333', 'admin'),
('Laura', 'Fernandez', 'laura.f@example.com', 'mypass', 'Pasaje del Sol 10', '3425554444', 'cliente'),
('Pedro', 'Martinez', 'pedro.m@example.com', 'password01', 'Ruta 1 Km 5', '3425555555', 'cliente');

INSERT INTO `pedido` (`fecha_pedido`, `total`, `metodo_pago`, `estado`, `id_usuario`) VALUES
('2025-06-10', 65.98, 'Tarjeta de Crédito', 1, 1),
('2025-06-11', 120.00, 'Mercado Pago', 1, 2),
('2025-06-12', 79.50, 'Transferencia Bancaria', 0, 1),
('2025-06-12', 127.00, 'Tarjeta de Débito', 1, 4),
('2025-06-13', 55.00, 'Mercado Pago', 0, 5);

INSERT INTO `detalle_pedido` (`cantidad`, `precio_unitario`, `id_pedido`, `id_inventario`) VALUES
(2, 15.99, 1, 1), -- Remera Algodón Básica, Blanco, S
(1, 30.00, 1, 7), -- Jean Slim Fit, Azul Oscuro, 30
(1, 45.00, 2, 7), -- Jean Slim Fit, Azul Oscuro, 30
(1, 65.00, 2, 9), -- Zapatillas Urbanas, Blanco, 40
(1, 79.50, 3, 10), -- Campera Impermeable, Gris, M
(1, 65.00, 4, 11), -- Zapatillas Urbanas, Blanco, 42
(1, 40.00, 4, 23), -- Pantalón Chino Clásico, Beige, 32
(1, 55.00, 5, 17); -- Buzo con Capucha Oversize, Gris Melange, M

INSERT INTO `favorito` (`id_usuario`, `id_producto`) VALUES
(1, 1),
(1, 5),
(2, 2),
(2, 8),
(4, 6),
(5, 1),
(5, 3);