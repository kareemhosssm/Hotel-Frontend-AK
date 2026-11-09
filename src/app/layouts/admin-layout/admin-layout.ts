import { Component } from '@angular/core';
import { Dashboard } from "../../pages/dashboard/dashboard";
import { AdminNavbar } from "../../shared/components/admin-navbar/admin-navbar";
import { Sidebar } from "../../shared/components/sidebar/sidebar";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet ,Sidebar, AdminNavbar],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.scss',
})
export class AdminLayout {

}
