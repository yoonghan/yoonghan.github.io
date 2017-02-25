interface Navigator {
	serviceWorker: ServiceWorkerContainer;
}

interface ServiceWorkerContainer {
	register(url: string, options?: any): any;
	controller?: ServiceWorker;
}

interface ServiceWorker extends Worker {
	scriptURL: string;
	state: ServiceWorkerState;
	onstatechange: any;
}

interface ServiceWorkerRegistration {
	active?: ServiceWorker;
	installing?: ServiceWorker;
	onupdatefound?: (event?: Event) => any;
	pushManager: PushManager;
	scope: string;
	waiting?: ServiceWorker;
	getNotifications(options?: any): any;
	update(): void;
	unregister(): any;
}

interface PushManager {
	getSubscription(): any;
	permissionState(): any;
	subscribe(): any;
}

type ServiceWorkerState = "installing" | "installed" | "activating" | "activated" | "redundant";
