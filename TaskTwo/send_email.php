<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $captchaSecretKey = 'YOUR_RECAPTCHA_KEY';
    $captchaResponse = $_POST['g-recaptcha-response'];

    $url = 'https://www.google.com/recaptcha/api/siteverify';
    $data = array(
        'secret' => $captchaSecretKey,
        'response' => $captchaResponse
    );

    $options = array(
        'http' => array(
            'header' => "Content-type: application/x-www-form-urlencoded\r\n",
            'method' => 'POST',
            'content' => http_build_query($data)
        )
    );

    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    $captchaResult = json_decode($result, true);

    if ($captchaResult['success'] !== true) {
        exit('Captcha verification failed.');
    }

    // Continue processing the form data and sending the email
    $to = $_POST["email"];
    $subject = "Survey Responses";
    $message = "Here are your survey responses:\n\n";
    $surveyData = json_decode($_POST["surveyData"], true);

    foreach ($surveyData as $page => $questions) {
        $message .= "Page: " . $page . "\n";
        foreach ($questions as $question => $response) {
            $message .= $question . ": " . $response . "\n";
        }
        $message .= "\n";
    }

    $headers = "From: jaya2004kra@gmail.com"; // Change this to your email address
    mail($to, $subject, $message, $headers);
}
?>
