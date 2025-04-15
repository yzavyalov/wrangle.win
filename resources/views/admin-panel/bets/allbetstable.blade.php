@extends('layout.admin-layout')

@section('title')
    All bets
@endsection

@section('content')
        <!-- /.card-header -->
        <div class="card-body">
            <table id="example1" class="table table-bordered table-striped">
                <thead>
                <tr>
                    <th>id</th>
                    <th>user_id</th>
                    <th>title</th>
                    <th>image</th>
                    <th>status</th>
                    <th>description</th>
                    <th>finish</th>
                    <th>created_at</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                @foreach($bets as $bet)
                    <tr>
                        <td>{{ $bet->id }}</td>
                        <td>{{ $bet->user_id }}</td>
                        <td>{{ $bet->title }}</td>
                        <td>{{ $bet->image }}</td>
                        <td>{{ \App\Enum\BetStatusEnum::from($bet->status)->label() }}</td>
                        <td>{{ $bet->description }}</td>
                        <td>{{ $bet->finish }}</td>
                        <td>{{ $bet->created_at }}</td>
                        <td>
                            <button onclick="window.location.href='{{ route('bet-show',$bet->id) }}'">EDIT</button>
                            <button onclick="if (confirm('Are you shure?')) window.location.href='{{ route('bet-del',$bet->id) }}'">DELETE</button>
                        </td>
                    </tr>
                @endforeach
                </tbody>
            </table>
         {{ $bets->links() }}
        </div>
@endsection


@section('scripts')

    <!-- DataTables  & Plugins -->
{{--    <script src="{{asset('admin-layout/plugins/datatables/jquery.dataTables.min.js')}}"></script>--}}
{{--    <script src="{{asset('admin-layout/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js')}}"></script>--}}
{{--    <script src="{{asset('admin-layout/plugins/datatables-responsive/js/dataTables.responsive.min.js')}}"></script>--}}
{{--    <script src="{{asset('admin-layout/plugins/datatables-responsive/js/responsive.bootstrap4.min.js')}}"></script>--}}
{{--    <script src="{{asset('admin-layout/plugins/datatables-buttons/js/dataTables.buttons.min.js')}}"></script>--}}
{{--    <script src="{{asset('admin-layout/plugins/datatables-buttons/js/buttons.bootstrap4.min.js')}}"></script>--}}
{{--    <script src="{{asset('admin-layout/plugins/jszip/jszip.min.js')}}"></script>--}}
{{--    <script src="{{asset('admin-layout/plugins/pdfmake/pdfmake.min.js')}}"></script>--}}
{{--    <script src="{{asset('admin-layout/plugins/pdfmake/vfs_fonts.js')}}"></script>--}}
{{--    <script src="{{asset('admin-layout/plugins/datatables-buttons/js/buttons.html5.min.js')}}"></script>--}}
{{--    <script src="{{asset('admin-layout/plugins/datatables-buttons/js/buttons.print.min.js')}}"></script>--}}
{{--    <script src="{{asset('admin-layout/plugins/datatables-buttons/js/buttons.colVis.min.js')}}"></script>--}}
    <!-- AdminLTE App -->

    <!-- AdminLTE for demo purposes -->

    <!-- Page specific script -->
{{--    <script>--}}
{{--        $(function () {--}}
{{--            $("#example1").DataTable({--}}
{{--                "responsive": true, "lengthChange": false, "autoWidth": false,--}}
{{--                "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]--}}
{{--            }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');--}}
{{--            $('#example2').DataTable({--}}
{{--                "paging": true,--}}
{{--                "lengthChange": false,--}}
{{--                "searching": false,--}}
{{--                "ordering": true,--}}
{{--                "info": true,--}}
{{--                "autoWidth": false,--}}
{{--                "responsive": true,--}}
{{--            });--}}
{{--        });--}}
{{--    </script>--}}
@endsection
