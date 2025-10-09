<?php
// public/index.php - PUNTO DE ENTRADA
session_start();

// Mostrar errores para debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Determinar qué acción tomar
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';
} else {
    $action = $_GET['action'] ?? 'show_login';
}

// Router simple
switch ($action) {
    case 'login':
        require '../src/login.php';
        break;
        
    case 'register':
        require '../src/register.php';
        break;
        
    case 'dashboard':
        require '../src/dashboard.php';
        break;
        
    case 'logout':
        require '../src/logout.php';
        break;
        
    case 'show_login':
    default:
        // Mostrar página de login por defecto
        header('Location: login.html');
        exit;
}
?>