<?php
namespace App;

use App\Traits\ImageTrait;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use Notifiable;
    use HasRoles;
    use ImageTrait;
    use ImageTrait {
        deleteImage as traitDeleteImage;
    }


    const IMAGE_PATH = 'users';
    protected $appends = ['img_avatar'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password','image_path'
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public static $rules = [
        'name'                  => 'required|unique:users,name',
        'email'                 => 'required|email|unique:users,email',
        'role_id'               => 'required',
        'password'              => 'nullable|min:6|required_with:password_confirmation|same:password_confirmation',
        'password_confirmation' => 'nullable|min:6',
    ];



    /**
     * @return string
     */
    public function getImgAvatarAttribute()
    {
        $userAvtar = $this->getOriginal('image_path');
        if (isset($userAvtar) && !empty($userAvtar)) {
            return $this->imageUrl(self::IMAGE_PATH.DIRECTORY_SEPARATOR.$userAvtar);
        }

        return getUserImageInitial($this->id, $this->name);
    }

    /**
     * @param $value
     *
     * @return string
     */
    public function getImagePathAttribute($value)
    {
        if (!empty($value)) {
            return $this->imageUrl(self::IMAGE_PATH.DIRECTORY_SEPARATOR.$value);
        }

        return getUserImageInitial($this->id, $this->name);
    }

    /**
     * @return bool
     */
    public function deleteImage()
    {
        $image = $this->getOriginal('image_path');
        if (empty($image)) {
            return true;
        }

        return $this->traitDeleteImage(self::IMAGE_PATH.DIRECTORY_SEPARATOR.$image);
    }


}
