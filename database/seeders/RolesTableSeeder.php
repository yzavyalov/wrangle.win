<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        // Удаляем старые роли и права
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Создание прав
        $permissions = [
            'create bet',
            'edit own bet',
            'edit all bet',
            'moderate bets',
            'delete own bets',
            'delete all bets',
            'finishing bets',
            'block user',
            'unblock user',
            'change payment status',
            'allow payment',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Создание ролей и назначение прав
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $financeManager = Role::firstOrCreate(['name' => 'finance manager']);
        $userRole = Role::firstOrCreate(['name' => 'user']);
        $badUserRole = Role::firstOrCreate(['name' => 'badUser']);

        // Назначаем права ролям
        $adminRole->givePermissionTo(['create bet','edit all bet','moderate bets','delete all bets','finishing bets','block user','unblock user']);
        $financeManager->givePermissionTo(['change payment status','allow payment']);
        $userRole->givePermissionTo(['create bet','edit own bet','delete own bets']);
        $badUserRole->givePermissionTo([]);

        $this->command->info('Роли и права были успешно созданы.');
    }
}
