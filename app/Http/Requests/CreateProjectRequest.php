<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Project;

class CreateProjectRequest extends FormRequest
{

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array The given data was invalid.
     */
    public function rules()
    {
        $rules = Project::$rules;
        $rules['prefix'] = 'required|alpha_num|max:6|min:2|unique:projects,prefix';

        return $rules;
    }

    /**
     * @return array
     */
    public function messages()
    {
        return Project::$messages;
    }
}
