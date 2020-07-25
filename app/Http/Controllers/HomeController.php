<?php

namespace App\Http\Controllers;

use App\Jobs\SendWelcomeEmail;
use Illuminate\Http\Request;
use DebugBar;
class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = \Auth::user();
        DebugBar::info("Request Cycle with Queues Begins");
        $this->dispatch(new SendWelcomeEmail($user));
        DebugBar::info("Request Cycle with Queues Ends");
        return view('home');
    }
}
