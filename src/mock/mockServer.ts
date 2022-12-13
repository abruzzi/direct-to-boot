import {createServer, Response} from 'miragejs';

let count = 0;

const createMockServer = () => {
  return createServer({
    routes() {
      this.post("/api/orders/:id", (scheme, request) => {
        const id = request.params.id;

        return {
          orderId: id,
          status: 'notified'
        }
      })

      this.get("/api/orders/:id", (scheme, request) => {
        const id = request.params.id;

        if(['error-id'].includes(id)) {
          return new Response(500, {}, { errors: ["The downstream is not responding"] })
        }

        if(['long-order'].includes(id)) {
          count = count + 1;
          if(count > 3) {
            count = 0;
            return {
              orderId: id,
              status: 'ready'
            }
          } else {
            return {
              orderId: id,
              status: 'initialised'
            }
          }
        }

        return {
          orderId: id,
          status: 'ready'
        }
      });
    },
  })
}

export default createMockServer;