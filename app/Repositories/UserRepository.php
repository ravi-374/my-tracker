<?php

namespace App\Repositories;

use App\User;
use App\Traits\ImageTrait;
use Auth;
use Crypt;
use Exception;
use Hash;
use Illuminate\Container\Container as Application;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;

/**
 * Class UserRepository.
 *
 * @version May 2, 2019, 12:42 pm UTC
 */
class UserRepository extends BaseRepository
{


    /**
     * UserRepository constructor.
     * @param Application $app
     * @throws Exception
     */
    public function __construct(Application $app)
    {
        parent::__construct($app);
    }

    /**
     * @var array
     */
    protected $fieldSearchable = [
        'name',
        'email',
        'phone',
    ];
    /**
     * @param array $input
     *
     * @throws Exception
     *
     * @return User|null
     */
    public function store($input)
    {
        //$input = $this->validateInput($input);
        $input['password'] = Hash::make($input['password']);
        $user = User::create($input);

        $roles = !empty($input['role_id']) ? $input['role_id'] : [];
        $user->assignRole($roles);
    }

    public function update($input,$id)
    {
        //$input = $this->validateInput($input);

        $user = User::findOrFail($id);
        $user->update($input);

        $roles = !empty($input['role_id']) ? $input['role_id'] : [];
        $user->syncRoles($roles);

        return $user->fresh();
    }
    /**
     * @param array $input
     *
     * @return mixed
     */
    public function validateInput($input)
    {
        if (!empty($input['password'])) {
            $input['password'] = Hash::make($input['password']);
        } else {
            unset($input['password']);
        }



        return $input;
    }
    /**
     * Return searchable fields.
     *
     * @return array
     */
    public function getFieldsSearchable()
    {
        return $this->fieldSearchable;
    }

    /**
     * Configure the Model.
     **/
    public function model()
    {
        return User::class;
    }

    /**
     * @param array $input
     *
     * @return true
     */
    public function profileUpdate($input)
    {
        /** @var User $user */
        $user = $this->findOrFail(Auth::id());

        try {
            if (isset($input['photo']) && !empty($input['photo'])) {
                $input['image_path'] = ImageTrait::makeImage(
                    $input['photo'],
                    User::IMAGE_PATH,
                    ['width' => 150, 'height' => 150]
                );

                $imagePath = $user->image_path;
                if (!empty($imagePath)) {
                    $user->deleteImage();
                }
            }

            $user->update($input);
        } catch (Exception $e) {
            if (!empty($input['image_path'])) {
                unlink(User::IMAGE_PATH.DIRECTORY_SEPARATOR.$input['image_url']);
            }
        }

        return true;
    }
    /**
     * @param array $projectIds
     *
     * @return Collection
     */
    public function getUserList($projectIds = [])
    {
        /** @var Builder $query */
        $query = User::orderBy('name');
        if (!empty($projectIds)) {
            $query = $query->whereHas('projects', function (Builder $query) use ($projectIds) {
                $query->whereIn('projects.id', $projectIds);
            });
        }

        return $query->pluck('name', 'id');
    }
}
