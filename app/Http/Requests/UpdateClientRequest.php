<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Client;

class UpdateClientRequest extends FormRequest
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
     * @return array
     */
    public function rules()
    {
        $rules = Client::$editRules;
        $rules['name'] = 'required|unique:clients,name,'.$this->route('client')->id;

        return $rules;
    }

    /**
     * @return array
     */
    public function messages()
    {
        return Client::$messages;
    }
}
