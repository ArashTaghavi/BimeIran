<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Validator;
use App\Http\Controllers\Controller;
use App\Http\Middleware\AdminMiddleware;
use App\News;

class NewsController extends Controller
{
    public function __construct()
    {
        $this->middleware(AdminMiddleware::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $news = News::select('id','title','text')->get();

        return response()->json(['news' => $news]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $messages = [
            'title.required' => 'تیتر خبر نمی تواند خالی باشد.',
            'content.required' => 'متن خبر نمی تواند خالی باشد.',
        ];

        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'content' => 'required',
        ], $messages);
        if ($validator->fails()) return response($validator->errors(), 405);

        $news = new News();
        $news->title = $request->title;
        $news->text = $request->content;
        $news->save();

        return response()->json(['status' => 201]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $news = News::findOrFail($id);

        return response()->json(['news' => $news]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $messages = [
            'title.required' => 'تیتر خبر نمی تواند خالی باشد.',
            'content.required' => 'متن خبر نمی تواند خالی باشد.',
        ];

        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'content' => 'required',
        ], $messages);
        if ($validator->fails()) return response($validator->errors(), 405);

        $news = News::findOrFail($id);
        $news->title = $request->title;
        $news->text = $request->content;
        $news->update();

        return response()->json(['status' => 202]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $news = News::findOrFail($id);

        $news->delete();

        return response()->json(['status' => 204]);
    }
}
