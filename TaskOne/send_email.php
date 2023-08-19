<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
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

