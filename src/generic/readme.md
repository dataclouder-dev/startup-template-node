### How to use the generic

Generic is just a scaffold to create a new entity in the database. Name Generic will be renamed to the name you want.

1. get a project that use nest and install the library @dataclouder/nest-mongo

2. copy folder and add to the modules

### Entity T Framework

Just a fancy name i use to create a standard way for CRUD operations. and little more.

### Endpoints Provided in Entity T Framework

- GET /api/generic
- GET /api/generic/:id
- POST /api/generic
- PUT /api/generic/:id
- PATCH /api/generic/:id

- POST /api/generic/query
- PUT /api/generic/:id
- DELETE /api/generic/:id

### Update Strategy

There are 3 ways to update a generic entity

#### POST /api/generic/:id - Full Update

- POST /api/generic/:id This is the only one with double functionality, if id is not present it will create a new entity if id is present it will update the existing entity with the new information.

Advantage: is the easiest to use, update what you send, but frontend should take care of sending all the values all the time. Disadvantage: if you made a mistake sending values, you object will override and you lost the old values.

#### PUT /api/generic/:id - Partial Update Root Level

- PUT /api/generic/:id This is the second way to update a generic entity, it will update the existing entity with the new information, but ignoring nulls.

example: { "name": "test", "description": null, "captions": { "captions": { text: "some text" } } }

name and captions are the one you want to update, either you dont send the rest of the properties or theay are null or undefined, only if they have a value valid will be updated. and will update all the root level. means caption will be completed updated/override with this new value.

Advantage: you can update only the fields you want to update. Disadvantage: you need to send all the values all the time.

#### PATCH /api/generic/:id - Partial Update Granular Level

- PATCH /api/generic/:id This is the third way to update a generic entity, and the most granular, every property will be flattened, backend will build mongo special structure so you have to build your object at this granular level. example { "video.captions.remotion.captions": captions.captions } = { video: { captions: { remotion: { captions: captions } } } }

Advantage: generally i recomend this to don't affect other values and have the most control. Disadvantage: you need to send all the values all the time.

Note is not a arrayLevel, so you have to update all the array in future may be it will can do this data.array_data[1].value = {hola:1}
