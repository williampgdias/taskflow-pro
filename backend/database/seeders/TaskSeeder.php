<?php

namespace Database\Seeders;

use App\Models\Task;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds to populate initial testing data.
     */
    public function run(): void
    {
        Task::truncate();

        Task::create([
            'title' => 'Complete Docker Infrastructure setup',
            'description' => 'Ensure backend and database container are running and communicating properly.',
            'status' => 'done'
        ]);

        Task::create([
            'title' => 'Configure API endpoints',
            'description' => 'Setup routes/api.php to handle task listing and management.',
            'status' => 'in_progress'
        ]);

        Task::create([
            'title' => 'Integrate Next.js frontend',
            'description' => 'Connect the client application with the Laravel API.',
            'status' => 'todo'
        ]);
    }
}