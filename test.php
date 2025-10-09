<?php
// test.php
echo "<h1>🔧 TEST DEL SISTEMA</h1>";

// Probar conexión a BD
try {
    require_once 'src/db_connect.php';
    echo "<p style='color: green;'>✅ Conexión a MySQL exitosa</p>";
    
    // Probar consulta
    $stmt = $pdo->query("SELECT COUNT(*) as total FROM usuarios");
    $result = $stmt->fetch();
    echo "<p style='color: green;'>✅ Tabla usuarios accesible (" . $result['total'] . " usuarios)</p>";
    
} catch (Exception $e) {
    echo "<p style='color: red;'>❌ Error BD: " . $e->getMessage() . "</p>";
}

// Probar sesiones
session_start();
$_SESSION['test'] = 'Sesiones OK';
echo "<p style='color: green;'>✅ Sesiones funcionan</p>";

echo "<p><a href='public/login.html'>Ir al Login</a></p>";
?>
