export async function loginPost(name: string, password: string) {


    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
    });

    const result = await response.json();

    if (!response.ok) return false;

    const token = result.token;

    const payloadBase64 = token.split('.')[1];
    const payload = JSON.parse(atob(payloadBase64));
    const userId = payload.id;

    localStorage.setItem('token', token);
    localStorage.setItem('usuarioLogueado', name);
    localStorage.setItem('usuarioId', userId);

    return true;
}