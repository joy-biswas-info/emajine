<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ServiceController extends Controller
{
    //! Show Services 
    public function show()
    {
        return Inertia::render("Services/Services");
    }

    //! Get all services 
    public function index()
    {
        $data = Service::get();
        return response()->json($data, 200);
    }

    //! create services 
    public function create()
    {
        return Inertia::render("Admin/Services/AddServices");
    }
    public function createAllServices()
    {
        return Inertia::render("Admin/Services/AllServices");
    }

    //! Store services 
    public function store(Request $request)
    {
        // dd($request->thumb);

        $validatedData = $request->validate([
            'title' => 'required|max:255',
            'short_description' => 'nullable|max:255',
            'description' => 'required',
            'price' => 'required|numeric',
            'thumb' => 'required|image'
        ]);

        $timestamp = now()->timestamp;
        $customThumbName = $timestamp . '_' . 'emajine' . '.' . $request->file('thumb')->getClientOriginalExtension();

        $thumbPath = $request->file('thumb')->storeAs('images', $customThumbName, 'public');

        $service = Service::create([
            'title' => $validatedData['title'],
            'short_description' => $validatedData['short_description'],
            'description' => $validatedData['description'],
            'price' => $validatedData['price'],
            'thumb' => $thumbPath,
        ]);

        // Optionally, you can redirect to a success page or return a response
        return response()->json(['message' => 'Service added successfully'], 201);
    }

    public function destroy(Service $service)
    {
        if (!$service) {
            return abort(404);
        }
        $service->delete();
        return response()->json(['message' => 'Service deleted successfully'], 200);
    }

    public function single(Service $service)
    {
        if (!$service) {
            return "No service Found";
        }
        ;
        return Inertia('Services/ServiceDetails');
    }
    public function getSingleService(Service $service)
    {
        if (!$service) {
            return "No Service Found";
        }
        return response()->json($service, 201);
    }

}
