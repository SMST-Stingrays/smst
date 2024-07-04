import { goto, invalidateAll } from '$app/navigation';

export function delete_cookie( name: string, path: string, domain: string ) {
	document.cookie = name + "=" +
		((path) ? ";path="+path:"")+
		((domain)?";domain="+domain:"")+
		";expires=Thu, 01 Jan 1970 00:00:01 GMT";
}
export async function logout() {
	delete_cookie("token", "/", window.location.hostname);
	await invalidateAll();
	await goto('/');
	window.location.reload();
	document.cookie.split(';').forEach(cookie => {
		const eqPos = cookie.indexOf('=');
		const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
		document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
	});
}