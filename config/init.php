<?php
// config/init.php - Configuraciones globales del sistema

// Configuración de entorno
define('APP_NAME', 'Sistema de Alumbrado Público');
define('APP_VERSION', '1.0.0');
define('ENVIRONMENT', 'development'); // production, development

// Configuración de base de datos
define('DB_HOST', 'localhost');
define('DB_NAME', 'alumbrado_publico');
define('DB_USER', 'root');
define('DB_PASS', '553051922428536000');

// Configuración de sesión
ini_set('session.cookie_httponly', 1);
ini_set('session.use_strict_mode', 1);

if (ENVIRONMENT === 'development') {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
} else {
    error_reporting(0);
    ini_set('display_errors', 0);
}

// Incluir automáticamente db_connect en todos los archivos que necesiten BD
require_once __DIR__ . '/../src/db_connect.php';
?>