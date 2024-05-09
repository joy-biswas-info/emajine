<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        return Inertia::render('Users/Users');

    }
    public function getUsers(Request $request)
    {

        $data = User::all();
        return response()->json($data, 200);
    }
    public function getSingleUser()
    {

    }

    public function dashboard()
    {
        return Inertia::render('Admin/AdminDashBoard');
    }

}
