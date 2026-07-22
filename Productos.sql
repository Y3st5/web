-- =========================================================
-- Productos.sql
-- Generado a partir de Catalogo.html - La Casa Del Pan
-- =========================================================

CREATE TABLE IF NOT EXISTS productos (
    id              INT PRIMARY KEY,
    nombre          VARCHAR(100)   NOT NULL,
    categoria       VARCHAR(20)    NOT NULL,   -- panes | bolleria | pasteles
    descripcion     TEXT,
    precio          DECIMAL(10,2)  NOT NULL,   -- precio unitario usado en el carrito (data-price)
    precio_display  VARCHAR(20),               -- texto mostrado en la tarjeta (ej. "4 x S/1")
    rating          DECIMAL(2,1),
    badge           VARCHAR(20),               -- Popular | Nuevo | NULL
    imagen_url      VARCHAR(255)
);

INSERT INTO productos (id, nombre, categoria, descripcion, precio, precio_display, rating, badge, imagen_url) VALUES
(1,  'Pan Frances',                  'panes',    'Pan tradicional con corteza crujiente y miga esponjosa, horneado en horno de leña con masa madre natural.', 0.25, '4 x S/1',  4.9, 'Popular', 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'),
(2,  'Pan Ciabatta',                 'panes',    'Pan italiano de corteza fina y miga alveolada, ideal para sándwiches y bruschettas.', 0.25, '4 x S/1',  4.7, 'Popular', 'https://images.unsplash.com/photo-1568471173242-461f0a730452?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'),
(3,  'Pan Baguetino',                'panes',    'Auténtica baguette con corteza dorada y miga alveolada, perfecta para acompañar cualquier comida.', 0.25, '4 x S/1',  4.7, NULL,      'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'),
(4,  'Pan Integral',                 'panes',    'Pan integral con mezcla de semillas de girasol, sésamo y chía. Rico en fibra y nutrientes.', 0.33, '3 x S/1',  4.8, 'Nuevo',   'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'),
(5,  'Pan De Camote',                'panes',    'Pan artesanal de camote con masa suave y ligeramente dulce. Acompaña perfecto con mantequilla o mermelada.', 0.33, '3 x S/1',  4.8, 'Nuevo',   'https://images.unsplash.com/photo-1606101206420-c4d3eb04c3cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'),
(6,  'Pan De Caracol',               'panes',    'Delicioso pan en forma de caracol con canela y pasas, cubierto con glaseado de vainilla. Esponjoso y aromático.', 0.33, '3 x S/1',  4.8, 'Nuevo',   'https://images.unsplash.com/photo-1583527976767-cbb5ee6c4b1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'),
(7,  'Torta de Chocolate',           'pasteles', 'Deliciosa torta de chocolate con ganache, perfecta para celebraciones. Disponible en diferentes tamaños.', 25.00, 'S/25.00', 5.0, 'Popular', 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'),
(8,  'Cheesecake de Frutos Rojos',   'pasteles', 'Cremoso cheesecake con base de galleta y topping de frutos rojos frescos. Una delicia irresistible.', 4.50, 'S/4.50',  4.9, NULL,      'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'),
(9,  'Tarta de Frutas',              'pasteles', 'Tarta con crema pastelera y frutas frescas de estación. Un postre ligero y refrescante.', 18.00, 'S/18.00', 4.7, NULL,      'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'),
(10, 'Croissants de Mantequilla',    'bolleria', 'Croissants franceses con capas de mantequilla, perfectos para el desayuno. Crujientes por fuera, tiernos por dentro.', 0.33, 'S/1.75', 4.9, 'Popular', 'https://images.unsplash.com/photo-1555507036-ab794f4afe5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'),
(11, 'Medialunas Dulces',            'bolleria', 'Tradicionales medialunas argentinas con un toque dulce, perfectas para acompañar con café o mate.', 0.33, 'S/1.50',  4.6, NULL,      'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'),
(12, 'Facturas Surtidas (12 unidades)', 'bolleria', 'Variedad de facturas tradicionales: vigilantes, bolas de fraile, cañoncitos y más. Precio por docena.', 12.00, 'S/12.00', 4.8, NULL,      'https://images.unsplash.com/photo-1509365465985-25d11c17e812?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80');
