import getRoute from "api/apiRoutes";
import { API } from "api";

class AppApi extends API {
  getOrders = (credential, page = 1): Promise<any> => {
    const route = getRoute("getOrders", { credential, page });
    return this.fetch(route);
  };

  getShippers = (postmenKey): Promise<any> => {
    const route = getRoute("shippers", { postmenKey });
    return this.fetch(route);
  };

  createShipper = (postmenKey, shipper): Promise<any> => {
    const route = getRoute("shippers", { postmenKey });
    return this.postRequest(route, { ...shipper });
  };

  delteShipper = (postmenKey, id): Promise<any> => {
    const route = getRoute("deleteShipper", { postmenKey, id });
    return this.deleteRequest(route);
  };

  getLabels = (postmenKey, limit: number, next_token: string): Promise<any> => {
    const route = getRoute("getLabels", { postmenKey, limit, next_token });
    return this.fetch(route);
  };

  createLabels = (postmenKey, bolId, labels): Promise<any> => {
    const route = getRoute("createLabels", { postmenKey, bolId });
    return this.postRequest(route, { labels });
  };

  getCredentials = (): Promise<any> => {
    const route = getRoute("credentials");
    return this.fetch(route);
  };

  createCredential = (credential): Promise<any> => {
    const route = getRoute("credentials");
    return this.postRequest(route, { ...credential });
  };

  delteCredential = (id): Promise<any> => {
    const route = getRoute("deleteCredential", { id });
    return this.deleteRequest(route);
  };

  getPostmenKeys = (): Promise<any> => {
    const route = getRoute("postmenKeys");
    return this.fetch(route);
  };

  createPostmenKey = (key): Promise<any> => {
    const route = getRoute("postmenKeys");
    return this.postRequest(route, { ...key });
  };

  deltePostmenKey = (id): Promise<any> => {
    const route = getRoute("deletePostmenKey", { id });
    return this.deleteRequest(route);
  };
}

export default new AppApi();
