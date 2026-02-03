<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        return response()->json([
            'message' => 'Connected to TaskFlow API!',
            'status' => 'success',
            'data' => []
        ]);
    }
}