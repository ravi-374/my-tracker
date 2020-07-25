<?php
namespace App\Http\Requests;

use App\User;
use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
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
        $id = $this->route('user')->id;
        $rules = [
            'name'                  => 'required|unique:users,name,'.$id,
            'email'                 => 'required|email|unique:users,email,'.$id,
            'role_id'               => 'required',
            'password'              => 'nullable|min:6|required_with:password_confirmation|same:password_confirmation',
            'password_confirmation' => 'nullable|min:6',
        ];

        return $rules;
    }


}
