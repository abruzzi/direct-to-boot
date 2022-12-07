import {createServer} from "miragejs";

export function createOrderServer() {
  return createServer({
    routes: function () {
      let attempts = 0;
      this.get("/api/orders/:id", (schema, request) => {
        const orderId = request.params.id;
        console.log(orderId)
        if(['slow-id'].includes(orderId)) {
          if(attempts < 3) {
            attempts = attempts + 1;
            return {
              orderId: orderId,
              status: 'initialised'
            }
          }

          attempts = 0;
          return {
            orderId: orderId,
            status: 'ready'
          }
        }

        return {
          orderId: orderId,
          status: 'ready'
        }
      }, {
        timing: 100
      })
    },
  });
}