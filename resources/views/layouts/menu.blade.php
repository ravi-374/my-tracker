<li class="nav-item {{ Request::is('departments*') ? 'active' : '' }}">
        <a class="nav-link" href="{!! route('departments.index') !!}">
            <i class="nav-icon fa fa-building"></i> Departments
        </a>
</li>
@can('manage_clients')
<li class="nav-item {{ Request::is('clients*') ? 'active' : '' }}">
    <a class="nav-link" href="{!! route('clients.index') !!}">
        <i class="fas fa-user-tie nav-icon" aria-hidden="true"></i>&nbsp;&nbsp;Clients
    </a>
</li>
@endcan

@can('manage_projects')
<li class="nav-item {{ Request::is('projects*') ? 'active' : '' }}">
    <a class="nav-link" href="{{ route('projects.index') }}">
        <i class="fa fa-folder-open nav-icon"></i>
        <span>Projects</span>
    </a>
</li>
@endcan

@can('manage_roles')
<li class="nav-item {{ Request::is('roles*') ? 'active' : '' }}">
    <a class="nav-link" href="{!! url('roles') !!}">
        <i class="fa fa-user nav-icon" aria-hidden="true"></i>&nbsp;&nbsp;Roles
    </a>
</li>
@endcan

@can('manage_users')
<li class="nav-item {{ Request::is('users*') ? 'active' : '' }}">
    <a class="nav-link" href="{!! route('users.index') !!}">
        <i class="fa fa-users nav-icon" aria-hidden="true"></i>  Users
    </a>
</li>
@endcan
<li class="nav-item {{ Request::is('users*') ? 'active' : '' }}">
    <a class="nav-link" href="{!! route('users.index') !!}">
        <i class="fa fa-users nav-icon" aria-hidden="true"></i>  Permission
    </a>
</li>
<li class="nav-item {{ Request::is('users*') ? 'active' : '' }}">
    <a class="nav-link" href="{!! route('users.index') !!}">
        <i class="fa fa-users nav-icon" aria-hidden="true"></i>  Tag
    </a>
</li>
