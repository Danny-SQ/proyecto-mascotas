import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'; // ajusta la ruta si es diferente


export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
   
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.page').then( m => m.LoginPage),
   
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/register/register.page').then( m => m.RegisterPage),
     
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./auth/forgot-password/forgot-password.page').then( m => m.ForgotPasswordPage),
     
  },
  {
    path: 'caregiver-edit',
    loadComponent: () => import('./auth/caregiver-edit/caregiver-edit.page').then( m => m.CaregiverEditPage),
     canActivate: [AuthGuard]
  },
  {
    path: 'add-pet',
    loadComponent: () => import('./pets/add-pet/add-pet.page').then( m => m.AddPetPage),
     canActivate: [AuthGuard]
  },
  {
    path: 'edit-pet/:id',
    loadComponent: () => import('./pets/edit-pet/edit-pet.page').then( m => m.EditPetPage),
     canActivate: [AuthGuard]
  },
  {
    path: 'add-daily-activity',
    loadComponent: () => import('./daily_activity/add-daily-activity/add-daily-activity.page').then( m => m.AddDailyActivityPage),
     canActivate: [AuthGuard]
  },
  {
    path: 'edit-daily-activity/:id',
    loadComponent: () => import('./daily_activity/edit-daily-activity/edit-daily-activity.page').then( m => m.EditDailyActivityPage),
     canActivate: [AuthGuard]
  },
  {
    path: 'delete-daily-activity/:id',
    loadComponent: () => import('./daily_activity/delete-daily-activity/delete-daily-activity.page').then( m => m.DeleteDailyActivityPage),
     canActivate: [AuthGuard]
  },
  {
    path: 'home-daily-activity',
    loadComponent: () => import('./daily_activity/home-daily-activity/home-daily-activity.page').then( m => m.HomeDailyActivityPage),
     canActivate: [AuthGuard]
  },
  {
    path: 'home-pet',
    loadComponent: () => import('./pets/home-pet/home-pet.page').then( m => m.HomePetPage),
    canActivate: [AuthGuard]
    
  },
  {
    path: 'home-deworming',
    loadComponent: () => import('./deworming/home-deworming/home-deworming.page').then( m => m.HomeDewormingPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'add-deworming',
    loadComponent: () => import('./deworming/add-deworming/add-deworming.page').then( m => m.AddDewormingPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-deworming/:id',
    loadComponent: () => import('./deworming/edit-deworming/edit-deworming.page').then( m => m.EditDewormingPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'delete-deworming/:id',
    loadComponent: () => import('./deworming/delete-deworming/delete-deworming.page').then( m => m.DeleteDewormingPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'add-visit-veterinary',
    loadComponent: () => import('./visit-veterinary/add-visit-veterinary/add-visit-veterinary.page').then( m => m.AddVisitVeterinaryPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-visit-veterinary/:id',
    loadComponent: () => import('./visit-veterinary/edit-visit-veterinary/edit-visit-veterinary.page').then( m => m.EditVisitVeterinaryPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'delete-visit-veterinary/:id',
    loadComponent: () => import('./visit-veterinary/delete-visit-veterinary/delete-visit-veterinary.page').then( m => m.DeleteVisitVeterinaryPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'home-visit-veterinary',
    loadComponent: () => import('./visit-veterinary/home-visit-veterinary/home-visit-veterinary.page').then( m => m.HomeVisitVeterinaryPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'home-vaccine',
    loadComponent: () => import('./vaccine/home-vaccine/home-vaccine.page').then( m => m.HomeVaccinePage),
    canActivate: [AuthGuard]
  },
  {
    path: 'add-vaccine',
    loadComponent: () => import('./vaccine/add-vaccine/add-vaccine.page').then( m => m.AddVaccinePage),
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-vaccine/:id',
    loadComponent: () => import('./vaccine/edit-vaccine/edit-vaccine.page').then( m => m.EditVaccinePage),
    canActivate: [AuthGuard]
  },
  {
    path: 'delete-vaccine/:id',
    loadComponent: () => import('./vaccine/delete-vaccine/delete-vaccine.page').then( m => m.DeleteVaccinePage),
    canActivate: [AuthGuard]
  },
  {
    path: 'home-reminder',
    loadComponent: () => import('./reminder/home-reminder/home-reminder.page').then( m => m.HomeReminderPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'add-reminder',
    loadComponent: () => import('./reminder/add-reminder/add-reminder.page').then( m => m.AddReminderPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-reminder/:id',
    loadComponent: () => import('./reminder/edit-reminder/edit-reminder.page').then( m => m.EditReminderPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'delete-reminder/:id',
    loadComponent: () => import('./reminder/delete-reminder/delete-reminder.page').then( m => m.DeleteReminderPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'home-recommendation',
    loadComponent: () => import('./recommendation/home-recommendation/home-recommendation.page').then( m => m.HomeRecommendationPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'add-recommendation',
    loadComponent: () => import('./recommendation/add-recommendation/add-recommendation.page').then( m => m.AddRecommendationPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-recommendation/:id',
    loadComponent: () => import('./recommendation/edit-recommendation/edit-recommendation.page').then( m => m.EditRecommendationPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'delete-recommendation/:id',
    loadComponent: () => import('./recommendation/delete-recommendation/delete-recommendation.page').then( m => m.DeleteRecommendationPage),
    canActivate: [AuthGuard]
  },
];
