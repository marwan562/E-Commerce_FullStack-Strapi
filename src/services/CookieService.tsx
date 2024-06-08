import Cookies, { CookieSetOptions } from "universal-cookie";

const cookies = new Cookies();

class CookieService {
  //get
  get(name: string) {
    return cookies.get(name);
  }
  //set

  set(name: string, value: string, options: CookieSetOptions) {
    return cookies.set(name, value, options);
  }
  //remove

  remove(name: string) {
    return cookies.remove(name);
  }
}

export default new CookieService();
