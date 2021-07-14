<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Переменные, которые отправляет пользователь
$sum = $_POST['sum'];
$currency = $_POST['currency'];
$currency = $_POST['currency'];
$output = $_POST['output'];
$email = $_POST['email'];

// Формирование самого письма
$title = "Заявка на обмен валюты";
$body = "
<h2>Новое письмо</h2>
<b>Рублей к обмену:</b> $sum<br>
<b>По курсу:</b> $currency<br><br>
<b>Сумма в валюте:</b><br>$output";

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $mail->isSMTP();   
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    $mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

    // Настройки вашей почты
    $mail->Host       = 'smtp.yandex.ru'; // SMTP сервера вашей почты
    $mail->Username   = 'sashnevski@yandex.ru'; // Логин на почте
    $mail->Password   = 'xwrwyiicggwvecex'; // Пароль приложения
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom('sashnevski@yandex.ru', 'sashnevski'); // Адрес самой почты и имя отправителя

    // Получатель письма
    $mail->addAddress($email);
    


// Отправка сообщения
$mail->isHTML(true);
$mail->Subject = $title;
$mail->Body = $body;    

// Проверяем отравленность сообщения
if ($mail->send()) {$result = "success";} 
else {$result = "error";}

} catch (Exception $e) {
    $result = "error";
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}

// Отображение результата
echo json_encode(["result" => $result, "resultfile" => $rfile, "status" => $status]);
