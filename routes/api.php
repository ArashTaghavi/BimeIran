<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the 'api' middleware group. Enjoy building your API!
|
*/

// Authentication
Route::post('request_login', 'ApiAuthController@request_login');
Route::post('authenticate_token', 'ApiAuthController@authenticate_token');
Route::post('login', 'ApiAuthController@login');
Route::post('forgot_password', 'ApiAuthController@forgot_password');
Route::post('logout', 'ApiAuthController@logout');

// Public Resources
Route::get('company-info', 'PublicController@getCompanyInfo');
Route::get('cars', 'PublicController@getCars');
Route::get('car/{car_brand_id}/models', 'PublicController@getCarModels');
Route::get('medic/{medic_id}/specialties', 'PublicController@getSpecialties');
Route::get('provinces', 'PublicController@getProvinces');
Route::get('cities/{province_id}', 'PublicController@getCities');
Route::post('persian-calendar', 'PublicController@loadCalendar');
Route::post('reminders', 'PublicController@storeReminder');

// Insurance Calculations
Route::prefix('calculation')->group(function() {
    Route::post('fire', 'CalculationController@calculateFireInsurance');
    Route::post('earthquake', 'CalculationController@calculateEarthquakeInsurance');
    Route::post('thirdparty', 'CalculationController@calculateThirdpartyInsurance');
    Route::post('body', 'CalculationController@calculateBodyInsurance');
    Route::post('travel', 'CalculationController@calculateTravelInsurance');
    Route::post('medic', 'CalculationController@calculateMedicInsurance');
});

// Orders
Route::post('submit-order', 'User\OrderController@submitOrder');

// User
Route::get('user', 'User\UserController@getUser');
Route::post('user/{id}', 'User\UserController@updateUser');
Route::post('marketer-req', 'User\UserController@toMarketerRequest');
Route::post('change-password', 'User\UserController@changePassword');
Route::post('reset-marketer-password', 'User\UserController@resetMarketerPassword');

// Marketer
Route::prefix('marketer')->group(function() {
    Route::post('login', 'MarketerController@login');
    Route::post('change-password', 'MarketerController@changePassword');
    Route::get('statistics', 'Marketer\StatisticsController@getStatistics');
    Route::get('account-info', 'Marketer\FinancialController@getAccountInfo');
    Route::post('account-info', 'Marketer\FinancialController@updateAccountInfo');
    Route::get('withdraws', 'Marketer\FinancialController@getWithdraws');
    Route::post('withdraw-request', 'Marketer\FinancialController@handleWithdrawRequest');
    Route::post('upload-customers', 'Marketer\CustomerController@uploadCustomers');
    Route::apiResources([
        'customers' => 'Marketer\CustomerController',
    ]);
});

// Admin
Route::prefix('admin')->group(function() {
    Route::post('login', 'AdminController@login');
    Route::post('change-password', 'AdminController@changePassword');
    Route::post('company-info', 'Admin\StatisticsController@updateCompanyInfo');
    Route::get('statistics', 'Admin\StatisticsController@getStatistics');
    Route::get('users', 'Admin\UserController@getUsers');
    Route::get('user/{user_id}', 'Admin\UserController@show');
    Route::get('reminders', 'Admin\ReminderController@getReminders');
    Route::get('reminder/{reminder_id}', 'Admin\ReminderController@show');
    Route::post('reminder/{reminder_id}', 'Admin\ReminderController@update');
    Route::get('marketers', 'Admin\MarketerController@getMarketers');
    Route::get('marketers/{marketer_id}', 'Admin\MarketerController@showMarketer');
    Route::get('marketers/{marketer_id}/customers', 'Admin\MarketerController@getCustomers');
    Route::get('marketers/{marketer_id}/customers/{customer_id}', 'Admin\MarketerController@getCustomer');
    Route::get('to-marketers', 'Admin\ToMarketerController@getToMarketerRequests');
    Route::get('to-marketer/{to_marketer_id}', 'Admin\ToMarketerController@show');
    Route::post('to-marketer/accept', 'Admin\ToMarketerController@acceptRequest');
    Route::post('to-marketer/reject', 'Admin\ToMarketerController@rejectRequest');
    Route::get('withdraws', 'Admin\MarketerController@getWithdraws');
    Route::get('withdraw/{withdraw_id}', 'Admin\MarketerController@getWithdraw');
    Route::post('withdraw/accept', 'Admin\MarketerController@acceptWithdrawRequest');
    Route::apiResources([
        'news' => 'Admin\NewsController',
    ]);
    Route::get('insurance-rates', 'Admin\RateController@getInsuranceRates');
    Route::get('insurance-rates/{rate_id}', 'Admin\RateController@showInsuranceRate');
    Route::put('insurance-rates/{rate_id}', 'Admin\RateController@editInsuranceRate');
    Route::get('medic-rates', 'Admin\RateController@getMedicRates');
    Route::get('medic-rates/{rate_id}', 'Admin\RateController@showMedicRate');
    Route::put('medic-rates/{rate_id}', 'Admin\RateController@editMedicRate');
});
