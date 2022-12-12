import {createServer, Response} from 'miragejs';

const createMockServer = () => {
  return createServer({
    routes() {
      this.get("/api/orders/:id", (scheme, request) => {
        const id = request.params.id;

        if(['error-id'].includes(id)) {
          return new Response(500, {}, { errors: ["The downstream is not responding"] })
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