<?php

namespace App\Http\Controllers\AdminPanel;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaymentMethodRequest;
use App\Models\PaymentMethod;
use App\Services\Payment\PaymentMethodService;
use Illuminate\Http\Request;

class PaymentMethodsController extends Controller
{
    public function __construct(PaymentMethodService $paymentMethodService)
    {
        $this->paymentMethodService = $paymentMethodService;
    }

    public function all()
    {
        $methods = PaymentMethod::paginate(15);

        return view('admin-panel.payments.allmethodstable', compact('methods'));
    }

    public function create()
    {
        return view('admin-panel.payments.method-create-form');
    }

    public function store(PaymentMethodRequest $request)
    {
        $this->paymentMethodService->create($request);

        return redirect()->route('all-methods');
    }

    public function show($id)
    {
        $method = PaymentMethod::query()->find($id);

        return view('admin-panel.payments.method-update-form',compact('method'));
    }


    public function update(PaymentMethodRequest $request, $id)
    {
        $method = PaymentMethod::query()->find($id);

        $method = $this->paymentMethodService->update($method, $request);

        return view('admin-panel.payments.method-update-form',compact('method'));
    }

    public function delete($id)
    {
        $method = PaymentMethod::query()->find($id);

        $method->delete();

        return redirect()->route('all-methods');
    }


    public function cascadeSet()
    {
        return view('admin-panel.payments.cascade');
    }
}
