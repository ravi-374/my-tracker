<?php

namespace App\Jobs;

use DebugBar;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendWelcomeEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $email;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($user)
    {
        $this->email=$user->email;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        DebugBar::info("Welcome Mail Sending..".$this->email);
    }
}
