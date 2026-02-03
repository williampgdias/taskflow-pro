<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\JsonResponse;

class TaskController extends Controller
{
    /**
     * Retrieve a listing of all tasks from the database.
     * * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        // Getting the fresh data from the database
        $tasks = \App\Models\Task::all();

        return response()->json([
            'status' => 'success',
            'data' => $tasks
        ]);
    }

    /**
     * Store a newly created task in the database.
     */
    public function store(\Illuminate\Http\Request $request): JsonResponse
    {
        // Validating the incoming request data
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'status'      => 'required|in:todo,in_progress,done',
        ]);

        // Creating the task using the validated data
        $task = \App\Models\Task::create($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Task created successfully',
            'data' => $task
        ], 201);
    }
}