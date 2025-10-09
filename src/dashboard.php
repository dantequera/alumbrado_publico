<?php
// src/dashboard.php
session_start();

// Verificar si está logueado
if (!isset($_SESSION['user_id'])) {
    header('Location: ../public/login.html');
    exit();
}

$nombreUsuario = htmlspecialchars($_SESSION['user_nombre']);
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Dashboard - Alumbrado Público</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header>
        <h1>🔆 Sistema de Alumbrado Público</h1>
        <p>Bienvenido, <?php echo $nombreUsuario; ?>!</p>
        <a href="index.php?action=logout">Cerrar Sesión</a>
    </header>
    
    <main>
        <h2>Panel de Control</h2>
        <p>Esta es una página protegida.</p>
        
        <div class="menu">
            <h3>Módulos:</h3>
            <ul>
                <li>💡 Gestión de Luminarias</li>
                <li>🔧 Reportes de Mantenimiento</li>
                <li>📊 Estadísticas</li>
            </ul>
        </div>
    </main>
</body>
</html>