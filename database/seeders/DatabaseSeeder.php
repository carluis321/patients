<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        $faker = Faker::create();

        DB::table('patients')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'countryCode' =>  "+1",
            'address' =>  Str::random(30),
            'phone' =>  $faker->numberBetween(1000000000,9999999999),
            'document' =>  'paciente.jpg',
        ]);

        DB::table('patients')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'countryCode' =>  "+1",
            'address' =>  Str::random(30),
            'phone' =>  $faker->numberBetween(1000000000,9999999999),
            'document' =>  'paciente-2.jpg',
        ]);

        DB::table('patients')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'countryCode' =>  "+1",
            'address' =>  Str::random(30),
            'phone' =>  $faker->numberBetween(1000000000,9999999999),
            'document' =>  'paciente-3.jpg',
        ]);

        DB::table('patients')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'countryCode' =>  "+1",
            'address' =>  Str::random(30),
            'phone' =>  $faker->numberBetween(1000000000,9999999999),
            'document' =>  'paciente-4.jpg',
        ]);

        DB::table('patients')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'countryCode' =>  "+1",
            'address' =>  Str::random(30),
            'phone' =>  $faker->numberBetween(1000000000,9999999999),
            'document' =>  'paciente-4.jpg',
        ]);

        DB::table('patients')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'countryCode' =>  "+1",
            'address' =>  Str::random(30),
            'phone' =>  $faker->numberBetween(1000000000,9999999999),
            'document' =>  'paciente-4.jpg',
        ]);

        DB::table('patients')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'countryCode' =>  "+1",
            'address' =>  Str::random(30),
            'phone' =>  $faker->numberBetween(1000000000,9999999999),
            'document' =>  'paciente-4.jpg',
        ]);

        DB::table('patients')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'countryCode' =>  "+1",
            'address' =>  Str::random(30),
            'phone' =>  $faker->numberBetween(1000000000,9999999999),
            'document' =>  'paciente-4.jpg',
        ]);

        DB::table('patients')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'countryCode' =>  "+1",
            'address' =>  Str::random(30),
            'phone' =>  $faker->numberBetween(1000000000,9999999999),
            'document' =>  'paciente-4.jpg',
        ]);
    }
}
