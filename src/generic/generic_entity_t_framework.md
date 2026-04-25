### How to use the generic

Generic is just a scaffold to create a new entity in the database. Name Generic will be renamed to the name you want.

1. get a project that use nest and install the library @dataclouder/nest-mongo

2. copy folder and add to the modules

### Entity T Framework

Just a fancy name i use to create a standard way for CRUD operations. and little more.

### Endpoint Provided in Entity T Framework

The controller extends `EntityMongoController` from `@dataclouder/nest-mongo`, which exposes a **single endpoint**:

```
POST /api/generic/operation
```

This endpoint requires a valid JWT token (enforced by `AuthGuard`). The token is decoded server-side to extract the user's email, which is automatically stamped into `auditable.createdBy` and `auditable.updatedBy` on `create` and `update` operations.

The module must import `NestAuthModule` for the guard and token decoder to work.

### OperationDto — all operations through one endpoint

```json
{
  "action": "findOne | find | create | updateOne | updateMany | deleteOne | deleteMany | aggregate | clone",
  "query":      {},
  "payload":    {},
  "projection": {},
  "options":    {}
}
```

#### find / findOne

Use `query`, `projection`, and `options` (limit, sort, etc.).

```json
{ "action": "find", "query": { "status": "active" }, "options": { "limit": 10, "sort": { "createdAt": -1 } } }
```

#### create

Use `payload`. `auditable.createdBy` and `auditable.updatedBy` are set automatically from the token.

```json
{ "action": "create", "payload": { "name": "My Item", "description": "..." } }
```

#### updateOne / updateMany

Use `query` and `payload` (standard Mongo update operators). `auditable.updatedBy` is injected into `$set` automatically.

```json
{ "action": "updateOne", "query": { "_id": "abc123" }, "payload": { "$set": { "name": "New Name" } } }
```

#### deleteOne / deleteMany

Use `query` and optionally `options`.

#### aggregate

Use `payload` as the aggregation pipeline array.

```json
{ "action": "aggregate", "payload": [{ "$match": { "status": "active" } }, { "$count": "total" }] }
```
