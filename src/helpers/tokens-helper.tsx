export function setCookie(name: string, value: string, props?: any) {
  props = {
    path: '/',
    ...props
  };
  if (props.expires instanceof Date) {
    props.expires = props.expires.toUTCString();
  }
  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  for (let optionKey in props) {
    updatedCookie += "; " + optionKey;
    let optionValue = props[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }
  document.cookie = updatedCookie;
}

export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name: string) {
  setCookie(name, "", {
    'max-age': -1
  })
}

export function getRefreshToken() {
  return localStorage.getItem('token');
}

export function assignTokens(accessToken: string, refreshToken: string) {
  accessToken = accessToken.split('Bearer ')[1];
  setCookie('token', accessToken);
  localStorage.setItem('token', refreshToken);
}

export function clearTokens() {
  deleteCookie('token');
  localStorage.removeItem('token');
}