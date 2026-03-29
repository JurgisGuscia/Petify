<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AvailableServicesController;
use App\Http\Controllers\Api\BreedsController;
use App\Http\Controllers\Api\PetsController;
use App\Http\Controllers\Api\PetTypesController;
use App\Http\Controllers\Api\PriceProfilesController;
use App\Http\Controllers\Api\ServiceCategoriesController;
use App\Http\Controllers\Api\ServicePricesController;
use App\Http\Controllers\Api\ServicesController;
use App\Http\Controllers\Api\UserPicturesController;
use App\Http\Controllers\Api\PetPicturesController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::get('/users', [UserController::class, 'getAllUsers']);
Route::get('/users/{id}', [UserController::class, 'getUser']);
Route::post('/users', [UserController::class, 'saveUser']);
Route::patch('/users/{id}', [UserController::class, 'updateUser']);
Route::delete('/users/{id}', [UserController::class, 'deleteUser']);

Route::get('/availableServices', [AvailableServicesController::class, 'getAllAvailableServices']);
Route::get('/availableServices/{id}', [AvailableServicesController::class, 'getAvailableService']);
Route::post('/availableServices', [AvailableServicesController::class, 'saveAvailableService']);
Route::patch('/availableServices/{id}', [AvailableServicesController::class, 'updateAvailableService']);
Route::delete('/availableServices/{id}', [AvailableServicesController::class, 'deleteAvailableService']);

Route::get('/breeds', [BreedsController::class, 'getAllBreeds']);
Route::get('/breeds/{id}', [BreedsController::class, 'getBreed']);
Route::post('/breeds', [BreedsController::class, 'saveBreed']);
Route::patch('/breeds/{id}', [BreedsController::class, 'updateBreed']);
Route::delete('/breeds/{id}', [BreedsController::class, 'deleteBreed']);

Route::get('/pets', [PetsController::class, 'getAllPets']);
Route::get('/pets/{id}', [PetsController::class, 'getPet']);
Route::post('/pets', [PetsController::class, 'savePet']);
Route::patch('/pets/{id}', [PetsController::class, 'updatePet']);
Route::delete('/pets/{id}', [PetsController::class, 'deletePet']);

Route::get('/usersPets/{userId}', [PetsController::class, 'getUsersPets']);

Route::get('/petTypes', [PetTypesController::class, 'getAllPetTypes']);
Route::get('/petTypes/{id}', [PetTypesController::class, 'getPetType']);
Route::post('/petTypes', [PetTypesController::class, 'savePetType']);
Route::patch('/petTypes/{id}', [PetTypesController::class, 'updatePetType']);
Route::delete('/petTypes/{id}', [PetTypesController::class, 'deletePetType']);

Route::get('/priceProfiles', [PriceProfilesController::class, 'getAllPriceProfiles']);
Route::get('/priceProfiles/{id}', [PriceProfilesController::class, 'getPriceProfile']);
Route::post('/priceProfiles', [PriceProfilesController::class, 'savePriceProfile']);
Route::patch('/priceProfiles/{id}', [PriceProfilesController::class, 'updatePriceProfile']);
Route::delete('/priceProfiles/{id}', [PriceProfilesController::class, 'deletePriceProfile']);

Route::get('/serviceCategories', [ServiceCategoriesController::class, 'getAllServiceCategories']);
Route::get('/serviceCategories/{id}', [ServiceCategoriesController::class, 'getServiceCategory']);
Route::post('/serviceCategories', [ServiceCategoriesController::class, 'saveServiceCategory']);
Route::patch('/serviceCategories/{id}', [ServiceCategoriesController::class, 'updateServiceCategory']);
Route::delete('/serviceCategories/{id}', [ServiceCategoriesController::class, 'deleteServiceCategory']);

Route::get('/servicePrices', [ServicePricesController::class, 'getAllServicePrices']);
Route::get('/servicePrices/{id}', [ServicePricesController::class, 'getServicePrice']);
Route::post('/servicePrices', [ServicePricesController::class, 'saveServicePrice']);
Route::patch('/servicePrices/{id}', [ServicePricesController::class, 'updateServicePrice']);
Route::delete('/servicePrices/{id}', [ServicePricesController::class, 'deleteServicePrice']);

Route::get('/services', [ServicesController::class, 'getAllServices']);
Route::get('/services/{id}', [ServicesController::class, 'getService']);
Route::post('/services', [ServicesController::class, 'saveService']);
Route::patch('/services/{id}', [ServicesController::class, 'updateService']);
Route::delete('/services/{id}', [ServicesController::class, 'deleteService']);
Route::get('/getServicesByPetId/{petId}', [ServicesController::class, 'getServicesByPet']);
Route::post('/getServicesByPetIds', [ServicesController::class,'getServicesByPets']);


Route::get('/userPictures', [UserPicturesController::class, 'getAllPictures']);
Route::get('/userPictures/{id}', [UserPicturesController::class, 'getPicture']);
Route::post('/userPictures', [UserPicturesController::class, 'savePicture']);
Route::put('/userPictures/{id}', [UserPicturesController::class, 'updatePicture']);
Route::delete('/userPictures/{id}', [UserPicturesController::class, 'deletePicture']);

Route::get('/petPictures', [PetPicturesController::class, 'getAllPetPictures']);
Route::get('/petPictures/{id}', [PetPicturesController::class, 'getPetPicture']);
Route::post('/petPictures', [PetPicturesController::class, 'savePetPicture']);
Route::put('/petPictures/{id}', [PetPicturesController::class, 'updatePetPicture']);
Route::delete('/petPictures/{id}', [PetPicturesController::class, 'deletePetPicture']);

Route::post('/petUserPetPictures', [PetPicturesController::class, 'getPetPictures']);
Route::get('/getPicturesByPetId/{petId}', [PetPicturesController::class, 'getPicturesByPetId']);








?>