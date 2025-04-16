@extends('layout.admin-layout')

@section('title')
    Bets' categories menu
@endsection

@section('content')
    <!-- /.card-header -->
    <div class="card-body">
        <div class="overflow-hidden shadow-sm dashboard-bg dash-window">
            <div class="p-6">
                <div>
                    <form class="mb-3" action="{{ route('search-category') }}" method="get">
                        @csrf
                        <input type="text" class="btn-search search" id="search-category" name="name" placeholder="Input name category">

                        <label for="menu_status">In main menu</label>
                        <input type="checkbox" name="menu_status" value="1">

                        <button type="submit" class="btn btn-secondary">Search</button>
                    </form>
                    <table id="transactions-table" class="table table-bordered table-striped">
                        <thead>
                        <tr>
                            <th>menu status</th>
                            <th>name</th>
                            <th>quantity of bets</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach($categories as $category)
                            <tr>
                                <td>@if($category->menu_status == 1) In main menu @else No @endif</td>
                                <td>{{ $category->name }}</td>
                                <td>{{ $category->bets->count() }}</td>
                                <td>
                                    <button class="btn btn-secondary" onclick="window.location.href='{{ route('bet-categories.edit',$category->id) }}'">Edit category</button>
                                    @if($category->bets->count() >0)@else
                                        <form action="{{ route('bet-categories.destroy', $category->id) }}" method="POST" style="display:inline;">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" class="btn btn-danger" onclick="return confirm('Are you sure?')">Del Category</button>
                                        </form>
                                    @endif
                                </td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                    {{ $categories->links('pagination::bootstrap-5') }}
                </div>
            </div>
        </div>
    </div>
@endsection


@section('scripts')

@endsection
