<?php

namespace App\Services;

use App\Mail\Email;
use Illuminate\Support\Facades\Mail;

class Notification {
    public static function sendEmail($email, $name) {
        Mail::to($email)->send(new Email($email, $name));
    }

    public static function sendSMS($phone) {
        //TODO
    }
}