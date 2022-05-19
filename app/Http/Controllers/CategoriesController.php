<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoriesController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        return CategoryResource::collection(Category::where('user_id', $user->id)->paginate());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return CategoryResource
     */
    public function store(StoreCategoryRequest $request)
    {
        $result = Category::create($request->validated());

        return new CategoryResource($result);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return CategoryResource
     */
    public function show(Request $request, Category $category)
    {
        $user = $request->user();

        return ($user->id !== $category->user_id) ? abort(403, 'Unauthorized action')
            : new CategoryResource($category);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return CategoryResource
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $user = $request->user();

        $data = $request->validated();

        $category->update($data);

        return ($user->id !== $category->user_id) ? abort(403, 'Unauthorized action')
            : new CategoryResource($category);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Category $category)
    {
        $user = $request->user();

        if ($user->id !== $category->user_id)
            abort(403, 'Unauthorized action');

        $category->delete();

        return response('', 204);
    }
}
