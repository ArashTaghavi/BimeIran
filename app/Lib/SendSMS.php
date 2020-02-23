<?php
namespace App\Lib;

class SendSMS
{
    private $webServiceURL = null;
    private $webServiceSignature = null;
    private $webServiceNumber = null;
    private $isFlash = false;

    public function __construct()
    {
       $this->webServiceURL = "http://login.parsgreen.com/Api/SendSMS.asmx?WSDL";
       $this->webServiceSignature="E630AC3F-D196-4D9A-A73D-435C86A0960A";
       $numbers = ['02100021000','10001398','5000290'];
       $number_array = array_rand($numbers);
       $get_number_send_sms = $numbers[$number_array];
       $this->webServiceNumber =$get_number_send_sms;
    }

    public  function send($Mobiles , $textMessage)
    {
        mb_internal_encoding("utf-8");
         $textMessage= mb_convert_encoding($textMessage,"UTF-8"); // encoding to utf-8
         // OR
         //$textMessage=iconv($encoding, 'UTF-8//TRANSLIT', $textMessage); // encoding to utf-8
         // OR
         //$textMessage =  utf8_encode( $str); // encoding to utf-8
             $parameters['signature'] = $this->webServiceSignature;
             $parameters['from' ]= $this->webServiceNumber;
             $parameters['to' ]  = $Mobiles;
             $parameters['text' ]=$textMessage;
             $parameters[ 'isFlash'] = $this->isFlash;
             $parameters['udh' ]= ""; // this is string  empty
             $parameters['success'] = 0x0; // return refrence success count // success count is number of send sms  success
             $parameters[ 'retStr'] = array( 0  ); // return refrence send status and mobile and report code for delivery


        try
        {
            $con = new \SoapClient($this->webServiceURL);

            $responseSTD = (array) $con ->SendGroupSMS($parameters);
            
        }
        catch (SoapFault $ex)
        {
            echo $ex->faultstring;
        }
    }
}

?>
