<?php
// src/register.php
require 'db_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = $_POST['nombre'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    try {
        // Validar contraseña
        if (strlen($password) < 6) {
            throw new Exception("La contraseña debe tener al menos 6 caracteres");
        }

        // Hashear contraseña
        $passwordHash = password_hash($password, PASSWORD_BCRYPT);

        // Insertar usuario - usando TU estructura de BD
        $stmt = $pdo->prepare("INSERT INTO usuarios (nombre, email, password_hash, activo) VALUES (?, ?, ?, 1)");
        $stmt->execute([$nombre, $email, $passwordHash]);

        echo "<h2>✅ Usuario registrado exitosamente</h2>";
        echo "<p>Ahora puedes iniciar sesión con tus credenciales.</p>";
        echo "<p><a href='../public/login.html'>Ir al login</a></p>";

    } catch (PDOException $e) {
        if ($e->errorInfo[1] == 1062) {
            echo "<h2>Error: El email ya está registrado</h2>";
        } else {
            echo "<h2>Error: " . $e->getMessage() . "</h2>";
        }
        echo "<p><a href='../public/register.html'>Volver al registro</a></p>";
    } catch (Exception $e) {
        echo "<h2>Error: " . $e->getMessage() . "</h2>";
        echo "<p><a href='../public/register.html'>Volver al registro</a></p>";
    }
} else {
    header('Location: ../public/register.html');
    exit();
}
?>