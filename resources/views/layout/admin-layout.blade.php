<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Admin-panel | Wrangle.win</title>

    <!-- Google Font: Source Sans Pro -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
    <!-- Font Awesome Icons -->
    <link rel="stylesheet" href="{{asset('admin-layout/plugins/fontawesome-free/css/all.min.css')}}">
    <!-- IonIcons -->
    <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
    <!-- Theme style -->
    <link rel="stylesheet" href="{{asset('admin-layout/dist/css/adminlte.min.css')}}">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    @livewireStyles
    @yield('style')
</head>
<!--
`body` tag options:

  Apply one or more of the following classes to to the body tag
  to get the desired effect

  * sidebar-collapse
  * sidebar-mini
-->
<body class="hold-transition sidebar-mini">
<div class="wrapper">
    <!-- Navbar -->
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
        <!-- Left navbar links -->
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
            </li>
            <li class="nav-item d-none d-sm-inline-block">
                <a href="index3.html" class="nav-link">Home</a>
            </li>
            <li class="nav-item d-none d-sm-inline-block">
                <a href="#" class="nav-link">Contact</a>
            </li>
        </ul>

        <!-- Right navbar links -->
        <ul class="navbar-nav ml-auto">
            <!-- Navbar Search -->
            <li class="nav-item">
                <a class="nav-link" data-widget="navbar-search" href="#" role="button">
                    <i class="fas fa-search"></i>
                </a>
                <div class="navbar-search-block">
                    <form class="form-inline">
                        <div class="input-group input-group-sm">
                            <input class="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search">
                            <div class="input-group-append">
                                <button class="btn btn-navbar" type="submit">
                                    <i class="fas fa-search"></i>
                                </button>
                                <button class="btn btn-navbar" type="button" data-widget="navbar-search">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </li>



            <li class="nav-item">
                <a class="nav-link" data-widget="fullscreen" href="#" role="button">
                    <i class="fas fa-expand-arrows-alt"></i>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-widget="control-sidebar" data-slide="true" href="#" role="button">
                    <i class="fas fa-th-large"></i>
                </a>
            </li>
        </ul>
    </nav>
    <!-- /.navbar -->

    <!-- Main Sidebar Container -->
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
        <!-- Brand Logo -->
        <a href="{{route('admin-panel')}}" class="brand-link">
            <img src="{{asset('admin-layout/dist/img/AdminLTELogo.png')}}" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
            <span class="brand-text font-weight-light">Wrangle.win</span>
        </a>

        <!-- Sidebar -->
        <div class="sidebar">

            <!-- Sidebar Menu -->
            <nav class="mt-2">
                <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                    <!-- Add icons to the links using the .nav-icon class
                         with font-awesome or any other icon font library -->
                    @hasrole('admin')
                    <li class="nav-item">
                        <a href="#" class="nav-link">
                            <i class="nav-icon fas fa-edit"></i>
                            <p>
                                Admins
                                <i class="fas fa-angle-left right"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <a href="{{ route('all-users') }}" class="nav-link">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>All admins</p>
                                </a>
                            </li>
                        </ul>
                    </li>
                    @endhasrole
                    @hasrole(['admin','finance manager'])
                    <li class="nav-item">
                        <a href="#" class="nav-link">
                            <i class="nav-icon fas fa-edit"></i>
                            <p>
                                Users
                                <i class="fas fa-angle-left right"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <a href="{{ route('all-users') }}" class="nav-link">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>All users</p>
                                </a>
                            </li>
                        </ul>
                    </li>
                    @endhasrole
                    <li class="nav-item">
                        <a href="#" class="nav-link">
                            <i class="nav-icon fas fa-copy"></i>
                            <p>
                                BETS
                                <i class="fas fa-angle-left right"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <a href="{{ route('bets-all') }}" class="nav-link">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>All bets</p>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="{{ route('bets-and-bits') }}" class="nav-link">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>Bets and bits</p>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="{{ route('bet-select-form') }}" class="nav-link">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>Select bets</p>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="{{ route('bet-create') }}" class="nav-link">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>Create bet</p>
                                </a>
                            </li>
                        </ul>
                    </li>
                    @hasrole(['admin','finance manager'])
                    <li class="nav-item">
                        <a href="#" class="nav-link">
                            <i class="nav-icon fas fa-chart-pie"></i>
                            <p>
                                Bits
                                <i class="right fas fa-angle-left"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <a href="{{ route('bits-all') }}" class="nav-link">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>All bits</p>
                                </a>
                            </li>
                        </ul>
                    </li>
                    @endhasrole
                    @hasrole(['admin','content manager'])
                    <li class="nav-item">
                        <a href="#" class="nav-link">
                            <i class="nav-icon fas fa-tree"></i>
                            <p>
                                Categories
                                <i class="fas fa-angle-left right"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <a href="{{ route('bet-categories.index') }}" class="nav-link">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>Bet categories menu</p>
                                </a>
                            </li>
                        </ul>
                    </li>
                    @endhasrole
                    @hasrole(['admin','finance manager'])
                    <li class="nav-item">
                        <a href="#" class="nav-link">
                            <i class="nav-icon fas fa-edit"></i>
                            <p>
                                Transactions
                                <i class="fas fa-angle-left right"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <a href="{{ route('from-admin-form') }}" class="nav-link">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>Add money manual</p>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="{{ route('all-transactions') }}" class="nav-link">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>All transactions</p>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="{{ route('search-form-transactions') }}" class="nav-link">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>Search transactions</p>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="{{ route('payment-logs') }}" class="nav-link">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>Paymnets' logs</p>
                                </a>
                            </li>
                        </ul>
                    </li>

                    <li class="nav-item">
                        <a href="#" class="nav-link">
                            <i class="nav-icon fas fa-tree"></i>
                            <p>
                                Payments
                                <i class="fas fa-angle-left right"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <a href="{{ route('all-methods') }}" class="nav-link">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>All methods</p>
                                </a>
                            </li>

                            <li class="nav-item">
                                <a href="{{ route('create-method-form') }}" class="nav-link">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>Create payment method</p>
                                </a>
                            </li>

                            <li class="nav-item">
                                <a href="{{ route('all-payments') }}" class="nav-link">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>All payments</p>
                                </a>
                            </li>


                            <li class="nav-item">
                                <a href="{{ route('create-payment') }}" class="nav-link">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>Create payment</p>
                                </a>
                            </li>

                            <li class="nav-item">
                                <a href="{{ route('cascade-setup') }}" class="nav-link">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>Cascade setup</p>
                                </a>
                            </li>

                        </ul>
                    </li>
                    @endhasrole

                </ul>
            </nav>
            <!-- /.sidebar-menu -->
        </div>
        <!-- /.sidebar -->
    </aside>

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0">@yield('title')</h1>
                    </div><!-- /.col -->
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><a href="{{ route('admin-panel') }}">Home</a></li>
                            <li class="breadcrumb-item active">@yield('title')</li>
                        </ol>
                    </div><!-- /.col -->
                </div><!-- /.row -->
            </div><!-- /.container-fluid -->
        </div>
        <!-- /.content-header -->

        <!-- Main content -->
        <div class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card">
                            <div class="card-header border-0">
                                <div class="d-flex justify-content-between">
                                    @yield('title')
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="d-flex">
                                   @yield('content')
                                </div>
                            </div>
                        </div>
                        <!-- /.card -->


                    </div>
                </div>
                <!-- /.row -->
            </div>
            <!-- /.container-fluid -->
        </div>
        <!-- /.content -->
    </div>
    <!-- /.content-wrapper -->

    <!-- Control Sidebar -->
    <aside class="control-sidebar control-sidebar-dark">
        <!-- Control sidebar content goes here -->
    </aside>
    <!-- /.control-sidebar -->

    <!-- Main Footer -->
    <footer class="main-footer">
        <strong>Copyright &copy; 2014-2021 <a href="https://adminlte.io">AdminLTE.io</a>.</strong>
        All rights reserved.
        <div class="float-right d-none d-sm-inline-block">
            <b>Version</b> 3.1.0
        </div>
    </footer>
</div>
<!-- ./wrapper -->

<!-- REQUIRED SCRIPTS -->

<!-- jQuery -->
<script src="{{asset('admin-layout/plugins/jquery/jquery.min.js')}}"></script>
<!-- Bootstrap -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="{{asset('admin-layout/plugins/bootstrap/js/bootstrap.bundle.min.js')}}"></script>
<!-- AdminLTE -->
<script src="{{asset('admin-layout/dist/js/adminlte.js')}}"></script>

<!-- OPTIONAL SCRIPTS -->
<script src="{{asset('admin-layout/plugins/chart.js/Chart.min.js')}}"></script>
<!-- AdminLTE for demo purposes -->
<script src="{{asset('admin-layout/dist/js/demo.js')}}"></script>
<!-- AdminLTE dashboard demo (This is only for demo purposes) -->
<script src="{{asset('admin-layout/dist/js/pages/dashboard3.js')}}"></script>
@livewireScripts
@yield('scripts')
</body>
</html>
