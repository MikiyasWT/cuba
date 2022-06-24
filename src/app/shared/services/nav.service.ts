import { Injectable, OnDestroy } from '@angular/core';
import { Subject, BehaviorSubject, fromEvent } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import { analyzeAndValidateNgModules } from '@angular/compiler';

// Menu
export interface Menu {
	headTitle1?: string,
	headTitle2?: string,
	path?: string;
	title?: string;
	icon?: string;
	type?: string;
	badgeType?: string;
	badgeValue?: string;
	active?: boolean;
	bookmark?: boolean;
	children?: Menu[];
}

@Injectable({
	providedIn: 'root'
})

export class NavService implements OnDestroy {

	private unsubscriber: Subject<any> = new Subject();
	public  screenWidth: BehaviorSubject<number> = new BehaviorSubject(window.innerWidth);

	// Search Box
	public search: boolean = false;

	// Language
	public language: boolean = false;
	
	// Mega Menu
	public megaMenu: boolean = false;
	public levelMenu: boolean = false;
	public megaMenuColapse: boolean = window.innerWidth < 1199 ? true : false;

	// Collapse Sidebar
	public collapseSidebar: boolean = window.innerWidth < 991 ? true : false;

	// For Horizontal Layout Mobile
	public horizontal: boolean = window.innerWidth < 991 ? false : true;

	// Full screen
	public fullScreen: boolean = false;
	
    public readonly roleType:any = localStorage.getItem('role');
    
	constructor(private router: Router) {
		this.setScreenWidth(window.innerWidth);
		fromEvent(window, 'resize').pipe(
			debounceTime(1000),
			takeUntil(this.unsubscriber)
		).subscribe((evt: any) => {
			this.setScreenWidth(evt.target.innerWidth);
			if (evt.target.innerWidth < 991) {
				this.collapseSidebar = true;
				this.megaMenu = false;
				this.levelMenu = false;
			}
			if(evt.target.innerWidth < 1199) {
				this.megaMenuColapse = true;
			}
		});
		if(window.innerWidth < 991) { // Detect Route change sidebar close
			this.router.events.subscribe(event => { 
				this.collapseSidebar = true;
				this.megaMenu = false;
				this.levelMenu = false;
			});
		}
	}


	ngOnDestroy() {
		this.unsubscriber.next();
		this.unsubscriber.complete();
	}

	private setScreenWidth(width: number): void {
		this.screenWidth.next(width);
	}

	MENUITEMS: Menu[] = [
		
		{
			title: 'Dashboards', icon: 'home', type: 'sub', active: true, children: [
				{ path: '/superadmin/default', title: 'summary', type: 'link' },
				{ path: '/superadmin/client', title: 'Client', type: 'link' },
				{ path: '/superadmin/customer', title: 'Customer', type: 'link' },
				{ path: '/superadmin/visitor', title: 'Visitor', type: 'link' },
				{ path: '/superadmin/security', title: 'Security', type: 'link' }
			]
		}
		];

	CLIENTMENUITEMS: Menu[] = [
			{
				headTitle1: 'Client', headTitle2: 'Dashboard & roles.',
			},
			{
				title: 'Dashboards', icon: 'home', type: 'sub', active: true, children: [
					{ path: '/client/dasboard/default', title: 'summary', type: 'link' },
					{ path: '/client/customer', title: 'Customer', type: 'link' },
					{ path: '/client/visitor', title: 'Visitor', type: 'link' },
					{ path: '/client/security', title: 'Security', type: 'link' }
				]
			}
			];	

	CUSTOMERMENUITEMS: Menu[] = [
				{
					headTitle1: 'Customer', headTitle2: 'Dashboard & roles.',
				},
				{
					title: 'Dashboards', icon: 'home', type: 'sub', active: true, children: [
						{ path: '/customer/dasboard/default', title: 'summary', type: 'link' },
						{ path: '/customer/visitor', title: 'Visitor', type: 'link' },
						{ path: '/customer/security', title: 'Security', type: 'link' }
					]
				}
				];			



	MEGAMENUITEMS: Menu[] = [];

	LEVELMENUITEMS: Menu[] = [];

    NOMENUITEMS: Menu[] = [];

	// Array
	//items = new BehaviorSubject<Menu[]>(this.NOMENUITEMS);
	megaItems = new BehaviorSubject<Menu[]>(this.MEGAMENUITEMS);
	levelmenuitems = new BehaviorSubject<Menu[]>(this.LEVELMENUITEMS);
    items:BehaviorSubject<Menu[]> = this.itemInitializer();
	
     
	itemInitializer(){
		let item=null;
        switch(this.roleType){
			case 'Super Admin': return item = new BehaviorSubject<Menu[]>(this.MENUITEMS);
								 break;
			case 'Admin':  return item = new BehaviorSubject<Menu[]>(this.MENUITEMS);
								 break;                    
			case 'Client': return item = new BehaviorSubject<Menu[]>(this.CLIENTMENUITEMS);
								 break;                 
			case 'Customer': return item = new BehaviorSubject<Menu[]>(this.CUSTOMERMENUITEMS);
								 break;            
			
		  }
	  }

	  
   
	
	

}
