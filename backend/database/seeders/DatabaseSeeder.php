<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database manually to avoid factory errors.
     */
    public function run(): void
    {
        $user = User::create([
            'name'     => 'William Dias',
            'email'    => 'test@example.com',
            'password' => Hash::make('password'),
        ]);

        $this->call([
            TaskSeeder::class,
        ]);
    }
}