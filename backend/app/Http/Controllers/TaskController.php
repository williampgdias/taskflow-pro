<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    /**
     * Retrieve a listing of all tasks from the database.
     * * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        // Getting the fresh data from the database
        $tasks = Auth::user()->tasks;

        return response()->json([
            'status' => 'success',
            'data' => $tasks
        ]);
    }

    /**
     * Store a newly created task in the database.
     */
    public function store(Request $request): JsonResponse
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

    /**
     * Display the specified task.
     */
    public function show(Task $task): JsonResponse
    {
        // Ensuring the user only sees their own task
        if ($task->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json(['status' => 'success', 'data' => $task]);
    }

    /**
     * Update the specified task in storage.
     */
    public function update(Request $request, Task $task): JsonResponse
    {
        if ($task->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'title'       => 'string|max:255',
            'description' => 'nullable|string',
            'status'      => 'in:todo,in_progress,done',
        ]);

        $task->update($validated);

        return response()->json(['status' => 'success', 'data' => $task]);
    }

    /**
     * Remove the specified task from storage.
     */
    public function destroy(Task $task): JsonResponse
    {
        if ($task->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $task->delete();

        return response()->json(['status' => 'success', 'message' => 'Task deleted']);
    }
}