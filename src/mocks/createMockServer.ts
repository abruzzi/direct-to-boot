import {createServer, Response} from "miragejs";

let count:number = 0;
export function createMockServer() {
  return createServer({
    routes() {
      this.get("/api/orders/:id", (schema, request) => {
        if(['error-id'].includes(request.params.id)) {
          return new Response(500, {}, {error: "something went wrong"});
        }

        if(['long-order'].includes(request.params.id)) {
          if(count < 3) {
            count = count + 1;
            return {
              id: request.params.id,
              status: "initialised",
            };
          } else {
            count = 0;
            return {
              id: request.params.id,
              status: "ready",
            };
          }
        }


        return {
          id: request.params.id,
          status: "ready",
        };
      });

      this.post("/api/orders/:id", (schema, request) => {
        const id = request.params.id;

        if(['unreachable-order-id'].includes(id)) {
          return new Response(500, {}, {message: "the order id is not valid"})
        }

        return {
          id,
          status: "notified",
        };
      })
    },
  });
}