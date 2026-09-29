<?php
require __DIR__ . '/_mail.php';

$engagementOptions = [
    'AI as a Service',
    'Dedicated Developers',
    'Custom Development',
    'Build With Us',
    'Monthly Retainer',
    'Launch & Rescue',
    'Not sure yet',
];
$timelineOptions = ['As soon as possible', 'Within a month', 'In 1–3 months', 'Just exploring'];

$data = read_json_body();

// Honeypot: pretend success so bots don't retry.
if (field($data, 'website') !== '') {
    respond(201, ['ok' => true]);
}

$name = field($data, 'name');
$email = field($data, 'email');
$company = mb_substr(field($data, 'company'), 0, 150);
$phone = mb_substr(field($data, 'phone'), 0, 40);
$engagement = field($data, 'engagement');
$timeline = field($data, 'timeline');
$message = field($data, 'message');

$errors = [];
if (mb_strlen($name) < 2 || mb_strlen($name) > 100) $errors['name'] = 'Please enter your name';
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 200) $errors['email'] = 'Please enter a valid email';
if (!in_array($engagement, $engagementOptions, true)) $errors['engagement'] = 'Please choose an option';
if ($timeline !== '' && !in_array($timeline, $timelineOptions, true)) $errors['timeline'] = 'Please choose an option';
if (mb_strlen($message) < 10) $errors['message'] = 'Tell us a little more (at least 10 characters)';
elseif (mb_strlen($message) > 5000) $errors['message'] = 'Please keep it under 5000 characters';

if ($errors) {
    respond(400, ['ok' => false, 'error' => 'Please fix the highlighted fields.', 'fieldErrors' => $errors]);
}

$body = implode("\n", [
    'New enquiry from vaug.in',
    '',
    "Name:       $name",
    "Email:      $email",
    'Company:    ' . ($company ?: '-'),
    'Phone:      ' . ($phone ?: '-'),
    "Interested: $engagement",
    'Timeline:   ' . ($timeline ?: '-'),
    '',
    'Message:',
    $message,
    '',
    '---',
    'Sent ' . gmdate('Y-m-d H:i') . ' UTC from ' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown'),
]);

if (!send_mail("New enquiry: $name ($engagement)", $body, "$name <$email>")) {
    respond(500, ['ok' => false, 'error' => 'We could not send your message. Please email hello@vaug.in directly.']);
}

respond(201, ['ok' => true]);
