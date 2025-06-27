//La función sirve para decodificar un token JWT

export function parseJwt(token) {
    // Separa el token por los puntos y toma el payload 
    // (la segunda parte que, entre otras cosas, contiene el id)
  const base64Url = token.split('.')[1];
    // Convierte el payload a base64 estándar para decodificarlo correctamente
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // reemplaza '-' a '+' y '_' a '/' 
    // atob() decodifica la base64 a un string
    // .split('').map(...).join('') convierte cada caracter a un valor %XX
    // decodeURIComponent() convierte el string a texto legible JSON
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(c =>
    '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  ).join(''));

    // Convierte el string JSON en un objeto
  return JSON.parse(jsonPayload);
}

/**
 * Explicación extensa de .split('').map(...).join(''):
 * 
 * Esta línea convierte un string con caracteres normales 
 * (por ejemplo: {, ", :) a una forma codificada como URI (URL encoding), 
 * como %7B, %22, %3A. 
 * Esto se hace para que luego se pueda usar 
 * decodeURIComponent(...) y convertir correctamente cualquier carácter especial.
 */