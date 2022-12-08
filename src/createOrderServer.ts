import {createServer} from "miragejs";

export function createOrderServer() {
  return createServer({
    routes: function () {
      let attempts = 0;

      this.post("/api/orders/:id", (schema, request) => {
        const orderId = request.params.id;

        if(['error-id'].includes(orderId)) {
          throw Error('error')
        }

        return {
          orderId: orderId,
          status: 'notified'
        }
      })

      this.get("/api/orders/:id", (schema, request) => {
        const orderId = request.params.id;

        if(['inaccessible'].includes(orderId)) {
          return {
            orderId: orderId,
            status: 'not-ready'
          }
        }

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