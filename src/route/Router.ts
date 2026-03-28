import http, { IncomingMessage, ServerResponse } from "http";

interface CustomRequest extends IncomingMessage {
  params: Record<string, string>;
}

type RouteHandler = (req: CustomRequest, res: ServerResponse) => void;

export class Router {
  routes: { method: string; path: string; handler: RouteHandler }[] = [];

  get(path: string, handler: RouteHandler) {
    this.routes.push({ method: "GET", path, handler });
  }

  post(path: string, handler: RouteHandler) {
    this.routes.push({ method: "POST", path, handler });
  }

  put(path: string, handler: RouteHandler) {
    this.routes.push({ method: "PUT", path, handler });
  }

  delete(path: string, handler: RouteHandler) {
    this.routes.push({ method: "DELETE", path, handler });
  }

  private matchRoute(reqUrl: string, routePath: string): Record<string, string> | null {
    const reqParts = reqUrl.split("/");
    const routeParts = routePath.split("/");

    if (reqParts.length !== routeParts.length) return null;

    const params: Record<string, string> = {};

    for (let i = 0; i < routeParts.length; i++) {
      if (routeParts[i].startsWith(":")) {
        // :id → extract the value
        const paramName = routeParts[i].slice(1); // remove ":"
        params[paramName] = reqParts[i];
      } else if (routeParts[i] !== reqParts[i]) {
        return null; // no match
      }
    }

    return params;
  }

  listen(port: number) {
    const server = http.createServer((req, res) => {
      for (const route of this.routes) {
        if (route.method !== req.method) continue;

        const params = this.matchRoute(req.url || "", route.path);
        if (params) {
          // (req as CustomRequest).params = params;
          route.handler(req as CustomRequest, res);
          return;
        }
      }

      // no route matched
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
    });

    server.listen(port, "localhost", () => {
      console.log(`Server is listening on port ${port}`);
    });
  }
}
