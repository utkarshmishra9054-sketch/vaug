<?php
// Shared helpers for the static-hosting form handlers (Hostinger PHP).
// Mirrors backend/src/lib/validation.ts so the forms get the same responses.

const MAIL_TO = 'hello@vaug.in';
// Hostinger only delivers PHP mail() whose From is a mailbox on this domain.
const MAIL_FROM = 'hello@vaug.in';

if (basename($_SERVER['SCRIPT_FILENAME']) === '_mail.php') {
    http_response_code(404);
    exit;
}

header('Content-Type: application/json; charset=utf-8');
header('X-Robots-Tag: noindex');

function respond(int $status, array $body): void
{
    http_response_code($status);
    echo json_encode($body);
    exit;
}

function read_json_body(): array
{
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        respond(405, ['ok' => false, 'error' => 'Method not allowed']);
    }
    $data = json_decode(file_get_contents('php://input') ?: '', true);
    if (!is_array($data)) {
        respond(400, ['ok' => false, 'error' => 'Invalid request']);
    }
    return $data;
}

function field(array $data, string $key): string
{
    return isset($data[$key]) && is_string($data[$key]) ? trim($data[$key]) : '';
}

function clean_header(string $value): string
{
    return trim(preg_replace('/[\r\n]+/', ' ', $value));
}

function send_mail(string $subject, string $body, string $replyTo = ''): bool
{
    $headers = [
        'From: VAUG Website <' . MAIL_FROM . '>',
        'Content-Type: text/plain; charset=UTF-8',
    ];
    if ($replyTo !== '') {
        $headers[] = 'Reply-To: ' . clean_header($replyTo);
    }
    $subject = '=?UTF-8?B?' . base64_encode(clean_header($subject)) . '?=';
    return mail(MAIL_TO, $subject, $body, implode("\r\n", $headers), '-f' . MAIL_FROM);
}
