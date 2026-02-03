<?php

namespace Database\Seeders;

use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds to populate initial testing data.
     */
    public function run(): void
    {

        $user = User::first();

        if ($user) {
            Task::create([
                'user_id'     => $user->id,
                'title'       => 'Complete Docker Infrastructure setup',
                'description' => 'Ensure backend and database containers are stable.',
                'status'      => 'done'
            ]);

            Task::create([
                'user_id'     => $user->id,
                'title'       => 'Configure API authentication',
                'description' => 'Implement Laravel Sanctum for secure access.',
                'status'      => 'in_progress'
            ]);
        }
    }
}