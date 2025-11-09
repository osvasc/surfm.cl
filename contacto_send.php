<?php
// Handler simple para formulario de contacto.
// EDITA EL CORREO DE DESTINO:
$destino = "contacto@radioelportal.cl";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $nombre  = trim($_POST["nombre"] ?? "");
    $email   = trim($_POST["email"] ?? "");
    $mensaje = trim($_POST["mensaje"] ?? "");

    if ($nombre && $email && $mensaje) {
        $asunto = "Nuevo mensaje desde sitio Radio El Portal";
        $body  = "Nombre: {$nombre}\n";
        $body .= "Correo: {$email}\n";
        $body .= "Mensaje:\n{$mensaje}\n";

        $headers  = "From: no-reply@radioelportal.cl\r\n";
        $headers .= "Reply-To: {$email}\r\n";

        @mail($destino, $asunto, $body, $headers);
        header("Location: contactos.html?ok=1");
        exit;
    } else {
        header("Location: contactos.html?error=1");
        exit;
    }
}
header("Location: contactos.html");
exit;
?>
