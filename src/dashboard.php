<!--<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Sistema de Alumbrado Público</title>
    <link rel="icon" type="image/x-icon" href="../public/assets/img/favicon.ico">
    <link rel="stylesheet" href="../public/assets/css/dashboard.css">
</head>
<body>
    <header>
        <div class="header-content">
            <div class="logo-title">
                <img src="../public/assets/img/logo.png" alt="Logo" class="logo">
                <h1>Sistema de Alumbrado Público</h1>
            </div>-->
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
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Sistema de Alumbrado Público</title>
    <link rel="stylesheet" href="../public/assets/css/dashboard.css">
</head>
<body>
    <header>
        <div class="header-content">
            <h1>💡 Sistema de Alumbrado Público</h1>
            <div class="user-info">
                <div class="welcome">
                    Bienvenido, <span class="user-name"><?php echo $nombreUsuario; ?></span>
                </div>
                <a href="logout.php" class="logout-btn">Cerrar Sesión</a>
            </div>
        </div>
    </header>
    
    <main>
        <section class="hero-section">
            <h2>Panel de Control Principal</h2>
            <p>Gestiona eficientemente el sistema de alumbrado público municipal</p>
        </section>

        <section class="modules-grid">
            <div class="module-card">
                <div class="module-icon">💡</div>
                <h3>Gestión de Luminarias</h3>
                <p>Control y monitoreo de todas las luminarias del municipio</p>
                <ul class="module-features">
                    <li>Estado en tiempo real</li>
                    <li>Reportes de fallas</li>
                    <li>Control de consumo</li>
                    <li>Mapa interactivo</li>
                </ul>
            </div>

            <div class="module-card">
                <div class="module-icon">🔧</div>
                <h3>Mantenimiento</h3>
                <p>Programación y seguimiento de actividades de mantenimiento</p>
                <ul class="module-features">
                    <li>Órdenes de trabajo</li>
                    <li>Equipos de mantenimiento</li>
                    <li>Historial de reparaciones</li>
                    <li>Alertas automáticas</li>
                </ul>
            </div>

            <div class="module-card">
                <div class="module-icon">📊</div>
                <h3>Estadísticas y Reportes</h3>
                <p>Análisis y reportes del sistema de alumbrado</p>
                <ul class="module-features">
                    <li>Dashboard analítico</li>
                    <li>Reportes personalizados</li>
                    <li>Métricas de eficiencia</li>
                    <li>Exportación de datos</li>
                </ul>
            </div>
        </section>

        <section class="stats-section">
            <h3>Resumen del Sistema</h3>
            <div class="stats-grid">
                <div class="stat-card">
                    <span class="stat-number">1,247</span>
                    <span class="stat-label">Luminarias Activas</span>
                </div>
                <div class="stat-card">
                    <span class="stat-number">98%</span>
                    <span class="stat-label">Eficiencia Operativa</span>
                </div>
                <div class="stat-card">
                    <span class="stat-number">23</span>
                    <span class="stat-label">Mantenimientos Pendientes</span>
                </div>
                <div class="stat-card">
                    <span class="stat-number">15.2k</span>
                    <span class="stat-label">kWh Consumidos</span>
                </div>
            </div>
        </section>
    </main>
</body>
</html>