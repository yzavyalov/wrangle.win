@extends('layout.admin-layout')

@section('title')
    All payments methods.
@endsection

@section('content')
    <!-- /.card-header -->
    <div class="card-body">
        <table id="example1" class="table table-bordered table-striped">
            <thead>
            <tr>
                <th>id</th>
                <th>title</th>
                <th>logo</th>
                <th>comission</th>
                <th>fixfee</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            @foreach($methods as $method)
                <tr>
                    <td>{{ $method->id }}</td>
                    <td>{{ $method->title }}</td>
{{--                    <td><img src="{{ asset('storage/' . $method->logo) }}" style="width: 80px; height: auto"></td>--}}
                    <td>
                        @if(file_exists(public_path('storage/' . $method->logo)))
                            <img src="{{ asset('storage/' . $method->logo) }}" style="width: 80px; height: auto">
                        @else
                            <span>Image not found: {{ $method->logo }}</span>
                        @endif
                    </td>
                    <td>{{ $method->comission }}</td>
                    <td>{{ $method->fixfee }}</td>
                    <td>
                        <button class="btn btn-info" onclick="window.location.href='{{ route('method-show',$method->id) }}'">EDIT</button>
                        <button class="btn btn-danger"
                            onclick="if (confirm('Are you shure?')) window.location.href='{{ route('method-del',$method->id) }}'">
                            DELETE
                        </button>
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
        {{ $methods->links('pagination::bootstrap-4') }}
    </div>
@endsection


@section('scripts')

@endsection
