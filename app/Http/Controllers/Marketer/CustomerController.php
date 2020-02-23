<?php

namespace App\Http\Controllers\Marketer;

use Illuminate\Http\Request;
use Validator;
use App\Http\Controllers\Controller;
use App\Http\Middleware\MarketerMiddleware;
use App\MarketerCustomer;
use App\Imports\CustomersImport;
use Maatwebsite\Excel\Facades\Excel;

class CustomerController extends Controller
{
    public function __construct()
    {
        $this->middleware(MarketerMiddleware::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $customers = MarketerCustomer::select('id','marketer_id','full_name','national_code','phone')->where('marketer_id', $request->header('marketer'))->get();

        return response()->json(['customers' => $customers]);
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
            'full_name.required'     => 'نام و نام خانوادگی نمی تواند خالی باشد.',
            'national_code.required' => 'کد ملی نمی تواند خالی باشد.',
            'national_code.min'      => 'لطفا کد ملی را در 10 رقم و به درستی وارد کنید.',
            'national_code.max'      => 'لطفا کد ملی را در 10 رقم و به درستی وارد کنید.',
            'phone.required'         => 'شماره همراه نمی تواند خالی باشد.',
            'phone.min'              => 'لطفا شماره همراه را در 11 رقم و به درستی وارد کنید.',
            'phone.max'              => 'لطفا شماره همراه را در 11 رقم و به درستی وارد کنید.',
            'address.required'       => 'آدرس نمی تواند خالی باشد.',
            'address.max'            => 'آدرس نمی تواند بیش از 255 کاراکتر باشد.',
        ];

        $validator = Validator::make($request->all(), [
            'full_name'     => 'required',
            'national_code' => 'required|min:10|max:10',
            'phone'         => 'required|min:11|max:11',
            'address'       => 'required|max:255',
        ], $messages);
        if ($validator->fails()) return response($validator->errors(), 405);

        $customer = new MarketerCustomer();
        $customer->marketer_id = $request->header('marketer');
        $customer->full_name = $request->full_name;
        $customer->national_code = $request->national_code;
        $customer->phone = $request->phone;
        $customer->address = $request->address;
        $customer->save();

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
        $customer = MarketerCustomer::findOrFail($id);

        return response()->json(['customer' => $customer]);
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
            'full_name.required'     => 'نام و نام خانوادگی نمی تواند خالی باشد.',
            'national_code.required' => 'کد ملی نمی تواند خالی باشد.',
            'national_code.min'      => 'لطفا کد ملی را در 10 رقم و به درستی وارد کنید.',
            'national_code.max'      => 'لطفا کد ملی را در 10 رقم و به درستی وارد کنید.',
            'phone.required'         => 'شماره همراه نمی تواند خالی باشد.',
            'phone.min'              => 'لطفا شماره همراه را در 11 رقم و به درستی وارد کنید.',
            'phone.max'              => 'لطفا شماره همراه را در 11 رقم و به درستی وارد کنید.',
            'address.required'       => 'آدرس نمی تواند خالی باشد.',
            'address.max'            => 'آدرس نمی تواند بیش از 255 کاراکتر باشد.',
        ];

        $validator = Validator::make($request->all(), [
            'full_name'     => 'required',
            'national_code' => 'required|min:10|max:10',
            'phone'         => 'required|min:11|max:11',
            'address'       => 'required|max:255',
        ], $messages);
        if ($validator->fails()) return response($validator->errors(), 405);

        $customer = MarketerCustomer::findOrFail($id);
        $customer->full_name = $request->full_name;
        $customer->national_code = $request->national_code;
        $customer->phone = $request->phone;
        $customer->address = $request->address;
        $customer->update();

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
        $customer = MarketerCustomer::findOrFail($id);

        $customer->delete();

        return response()->json(['status' => 204]);
    }

    public function uploadCustomers(Request $request)
    {
        $data = $request->file("customers_excel_file");

        $clientExt = $data->getClientOriginalExtension();
        if ($clientExt !== 'xlsx' && $clientExt !== 'csv')
        {
          return response()->json([
            "status" => -1,
            "error" => "wrong_extension"
          ], 406);
        }

        $marketer_id = $request->header('marketer');

        Excel::import(new CustomersImport($marketer_id), $data);

        return response()->json(['status' => 201]);
    }
}
