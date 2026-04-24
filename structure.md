src/
│
├── modules/
│   ├── technician/
│   │   ├── technician.model.ts
│   │   ├── technician.enums.ts
│   │   ├── technician.repository.ts
│   │   ├── technician.service.ts
│   │   ├── technician.controller.ts
│   │   ├── technician.routes.ts
│   │   └── technician.validator.ts
│   │
│   ├── serviceRequest/
│   │   ├── serviceRequest.model.ts
│   │   ├── serviceRequest.enums.ts
│   │   ├── serviceRequest.repository.ts
│   │   ├── serviceRequest.service.ts
│   │   ├── serviceRequest.controller.ts
│   │   ├── serviceRequest.routes.ts
│   │   └── serviceRequest.validator.ts
│   │
│   ├── assignment/
│   │   ├── assignment.service.ts
│   │   ├── assignment.controller.ts
│   │   └── assignment.routes.ts
│   │
│   └── partner/
│       ├── partner.controller.ts
│       ├── partner.routes.ts
│       └── partner.middleware.ts
│
├── shared/
│   ├── errors/
│   │   ├── AppError.ts
│   │   └── errorHandler.ts
│   │
│   ├── utils/
│   │   ├── generateReference.ts
│   │   ├── pagination.ts
│   │   └── response.ts
│   │
│   └── types/
│       └── common.types.ts
│
├── store/
│   ├── technician.store.ts
│   └── serviceRequest.store.ts
│
├── app.ts
└── server.ts