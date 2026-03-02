<?php
/**
 * Formulario de contacto para La Casa Del Pan
 * Versión mejorada con PHPMailer
 */

// Cargar PHPMailer manualmente si existe, si no usar mail() básico
$phpmailer_loaded = false;
if (file_exists('PHPMailer/src/PHPMailer.php')) {
    require 'PHPMailer/src/PHPMailer.php';
    require 'PHPMailer/src/SMTP.php';
    require 'PHPMailer/src/Exception.php';
    $phpmailer_loaded = true;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validar y sanear datos
    $nombre = htmlspecialchars(trim($_POST['nombre'] ?? ''));
    $email = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
    $telefono = htmlspecialchars(trim($_POST['telefono'] ?? ''));
    $mensaje = htmlspecialchars(trim($_POST['mensaje'] ?? ''));

    // Validaciones
    $errores = [];
    
    if (empty($nombre)) {
        $errores[] = "El nombre es obligatorio.";
    }
    
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errores[] = "El email no es válido.";
    }
    
    if (empty($mensaje)) {
        $errores[] = "El mensaje es obligatorio.";
    }

    if (!empty($errores)) {
        echo "Errores: " . implode(" ", $errores);
        exit;
    }

    // Destinatario
    $para = "juandiex2005@gmail.com";
    $asunto = "Nuevo mensaje de: $nombre - La Casa Del Pan";
    
    $cuerpo = "Nombre: $nombre\n";
    $cuerpo .= "Email: $email\n";
    $cuerpo .= "Teléfono: $telefono\n";
    $cuerpo .= "Mensaje:\n$mensaje";
    
    $cabeceras = "From: $email\r\n";
    $cabeceras .= "Reply-To: $email\r\n";
    $cabeceras .= "Content-Type: text/plain; charset=UTF-8\r\n";

    if ($phpmailer_loaded) {
        // Usar PHPMailer
        try {
            $mail = new PHPMailer\PHPMailer\PHPMailer(true);
            
            // Configuración del servidor
            $mail->isSMTP();
            $mail->Host       = 'smtp.gmail.com';
            $mail->SMTPAuth   = true;
            $mail->Username   = 'TU_EMAIL@gmail.com';  // CAMBIA ESTO
            $mail->Password   = 'TU_APP_PASSWORD';     // CAMBIA ESTO - Genera una App Password en Gmail
            $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port       = 587;

            // Remitente y destinatario
            $mail->setFrom('TU_EMAIL@gmail.com', 'La Casa Del Pan');
            $mail->addAddress($para, 'Panadería');
            $mail->addReplyTo($email, $nombre);

            // Contenido
            $mail->isHTML(false);
            $mail->Subject = $asunto;
            $mail->Body    = $cuerpo;

            $mail->send();
            echo "Mensaje enviado con éxito. ¡Gracias por contactarnos!";
        } catch (Exception $e) {
            echo "Error al enviar el mensaje: " . $mail->ErrorInfo;
        }
    } else {
        // Usar función mail() básica (funciona en servidores con SMTP configurado)
        if (mail($para, $asunto, $cuerpo, $cabeceras)) {
            echo "Mensaje enviado con éxito. ¡Gracias por contactarnos!";
        } else {
            echo "Error al enviar el mensaje. Por favor, contactanos directamente.";
        }
    }
} else {
    echo "Método no permitido.";
}
?>
