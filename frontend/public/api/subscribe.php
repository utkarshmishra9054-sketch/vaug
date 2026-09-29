<?php
require __DIR__ . '/_mail.php';

$data = read_json_body();
$email = strtolower(field($data, 'email'));

if (!filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 200) {
    respond(400, ['ok' => false, 'error' => 'Please enter a valid email']);
}

if (!send_mail("New newsletter subscriber: $email", "New VAUG newsletter subscriber:\n\n$email\n", $email)) {
    respond(500, ['ok' => false, 'error' => 'Something went wrong. Please try again.']);
}

respond(201, ['ok' => true]);
