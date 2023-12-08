<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Jobs\SendNotificationProcess;
use App\Models\Patient;

class PatientsController extends Controller
{
    public function get() {
        return Patient::all();
    }

    public function post(Request $request) {
        $file = $request->file('file');

        $extension = $file->getClientOriginalExtension();
        $newFileName = Str::uuid() . "." . $extension;
        
        $file->move(public_path('/images/uploads'), $newFileName);

        Patient::create([
            'name' => $request->name,
            'email' => $request->email,
            'address' => $request->address,
            'countryCode' => $request->countryCode,
            'phone' => $request->phone,
            'document' => $newFileName,
        ]);

        SendNotificationProcess::dispatch($request->email, $request->name);

        return response()->json(["message" => "created!"]);
    }

    public function delete(string $id) {
        $patient = Patient::findOrFail($id);

        $patient->delete();

        http_response_code(201);
        return;
    }
}
