<?php
// public/test.php
require_once '../config/init.php';

echo "<h1>🔧 TEST COMPLETO DEL SISTEMA</h1>";
echo "<p><strong>Aplicación:</strong> " . APP_NAME . " v" . APP_VERSION . "</p>";

// Probar conexión a BD
try {
    $stmt = $pdo->query("SELECT COUNT(*) as total FROM usuarios");
    $result = $stmt->fetch();
    echo "<p style='color: green;'>✅ Conexión a MySQL exitosa (" . $result['total'] . " usuarios)</p>";
} catch (Exception $e) {
    echo "<p style='color: red;'>❌ Error BD: " . $e->getMessage() . "</p>";
}

// Probar sesiones
session_start();
$_SESSION['test_time'] = date('Y-m-d H:i:s');
echo "<p style='color: green;'>✅ Sesiones funcionan (" . $_SESSION['test_time'] . ")</p>";

// Probar rutas
echo "<h3>📁 Rutas del sistema:</h3>";
echo "<ul>";
echo "<li><a href='login.html'>Login</a></li>";
echo "<li><a href='register.html'>Registro</a></li>";
echo "<li><a href='../src/dashboard.php'>Dashboard</a> (requiere login)</li>";
echo "<li><a href='index.html'>Buscador GitHub</a></li>";
echo "</ul>";

echo "<p><strong>Entorno:</strong> " . ENVIRONMENT . "</p>";
?>