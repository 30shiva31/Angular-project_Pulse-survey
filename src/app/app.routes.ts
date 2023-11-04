import { Routes } from '@angular/router';
import { VerificationComponent } from './verification/verification.component';
import { RegisterEmployeeComponent } from './register-employee/register-employee.component';
import { LoginEmployeeComponent } from './login-employee/login-employee.component';
import { HomeComponent } from './home/home.component';
import { MeComponent } from './me/me.component';
import { AdminComponent } from './admin/admin.component';
import { SurveysComponent } from './admin/surveys/surveys.component';
import { SettingsComponent } from './admin/settings/settings.component';
import { ActiveSurveysComponent } from './admin/surveys/active-surveys/active-surveys.component';
import { ClosedSurveysComponent } from './admin/surveys/closed-surveys/closed-surveys.component';
import { SmallModalsComponent } from './admin-modals/small-modals/small-modals.component';
import { LaunchSurveyComponent } from './admin-modals/launch-survey/launch-survey.component';

export const routes: Routes = [
    { path: '', redirectTo: 'pulseSurvey', pathMatch: 'full' },
    { path: 'pulseSurvey', component: VerificationComponent },
    {
        path: 'pulseSurvey',
        children: [
            { path: 'register', component: RegisterEmployeeComponent },
            { path: 'login', component: LoginEmployeeComponent },
            { path: 'home', component:HomeComponent,
                children: [
                    {path: 'Me', component: MeComponent},
                    {path: 'Admin', component: AdminComponent,                    
                        children: [
                            {path: 'surveys', component: SurveysComponent,                            
                                children:[
                                    {path:'active',component:ActiveSurveysComponent,
                                        children: [
                                            {path:'updateSurvey',component:SmallModalsComponent},
                                            {path: 'closeSurveys',component:SmallModalsComponent},
                                            {path:'LaunchNewSurvey',component:LaunchSurveyComponent},
                                        ],                               
                                
                                    },
                                    
                                    {path:'closed',component:ClosedSurveysComponent},
                                ]
                            },
                            {path: 'settings', component: SettingsComponent}
                        ]
                    }
                   
                ]
            }
                       
        ],
    },
];