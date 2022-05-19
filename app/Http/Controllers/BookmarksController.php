<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBookmarkRequest;
use App\Http\Requests\UpdateBookmarkRequest;
use App\Http\Resources\BookmarkResource;
use App\Models\Bookmark;
use App\Models\BookmarkDetails;
use Illuminate\Http\Request;

class BookmarksController extends Controller
{
    public function __construct()
    {

    }

    public function index(Request $request)
    {
        $user = $request->user();

        return BookmarkResource::collection(Bookmark::where('user_id', $user->id)
            ->orderBy('updated_at', 'desc')
            ->paginate($perPage = 50, $columns = ['*'], $pageName = 'bookmarks')
        );
    }

    public function show(Request $request, Bookmark $bookmark)
    {
        $user = $request->user();

        return ($user->id !== $bookmark->user_id) ? abort(403, 'Unauthorized action')
            : new BookmarkResource($bookmark);
    }

    public function store(StoreBookmarkRequest $request)
    {
        $data = $request->validated();

        $bookmark = new Bookmark();

        $bookmark->name = $data['name'];
        $bookmark->url = $data['url'];
        $bookmark->user_id = $data['user_id'];
        $bookmark->category_id = $data['category_id'];
        $bookmark->save();

        $bookmarkDetails = new BookmarkDetails();
        $bookmarkDetails->description = $data['description'];
        $bookmark->details()->save($bookmarkDetails);

        return new BookmarkResource($bookmark);
    }

    public function update(UpdateBookmarkRequest $request, Bookmark $bookmark)
    {
        $data = $request->validated();

        $bookmark->name = $data['name'];
        $bookmark->url = $data['url'];
        $bookmark->category_id = $data['category_id'];
        $bookmark->update();

        $bookmark->details->description = $data['description'];
        $bookmark->details->update();

        return new BookmarkResource($bookmark);
    }

    public function destroy(Request $request, Bookmark $bookmark)
    {
        $user = $request->user();

        if ($user->id !== $bookmark->user_id)
            abort(403, 'Unauthorized action');

        $bookmark->details()->delete();
        $bookmark->delete();

        return response('', 204);
    }
}
