<?php
// src/login.php
session_start();
require 'db_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];

    try {
        // Buscar usuario - usando la estructura de TU base de datos
        $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE email = ? AND activo = 1");
        $stmt->execute([$email]);
        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($usuario && password_verify($password, $usuario['password_hash'])) {
            // Login exitoso
            $_SESSION['user_id'] = $usuario['id'];
            $_SESSION['user_nombre'] = $usuario['nombre'];
            $_SESSION['user_email'] = $usuario['email'];
            
            // Actualizar último login
            $update_stmt = $pdo->prepare("UPDATE usuarios SET ultimo_login = NOW() WHERE id = ?");
            $update_stmt->execute([$usuario['id']]);
            
            // Redirigir al dashboard
            header('Location: dashboard.php');
            exit();
        } else {
            echo "<h2>Error: Usuario o contraseña incorrectos</h2>";
            echo "<p><a href='../public/login.html'>Volver al login</a></p>";
        }
    } catch (Exception $e) {
        echo "<h2>Error del sistema: " . $e->getMessage() . "</h2>";
    }
} else {
    header('Location: ../public/login.html');
    exit();
}
?>