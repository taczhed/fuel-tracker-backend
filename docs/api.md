# Fuel Tracker API

Base URL: `http://localhost:3000`

All requests require:
```
Authorization: Bearer <API_TOKEN>
```

---

## Users

### GET /users/:id
Get user by ID.

```
GET /users/000000000000000000000001
Authorization: Bearer <API_TOKEN>
```

**Response**
```json
{
  "_id": "000000000000000000000001",
  "username": "default"
}
```

---

### POST /users
Create a new user.

```
POST /users
Authorization: Bearer <API_TOKEN>
Content-Type: application/json
```

**Body**
```json
{
  "username": "john"
}
```

**Response**
```json
{
  "_id": "664f1e2b3c4d5e6f7a8b9c0d",
  "username": "john"
}
```

---

## Vehicles

### GET /vehicles?userId=:id
Get all vehicles for a user.

```
GET /vehicles?userId=000000000000000000000001
Authorization: Bearer <API_TOKEN>
```

**Response**
```json
[
  {
    "_id": "664f1e2b3c4d5e6f7a8b9c0d",
    "name": "Toyota Corolla",
    "fuelType": "gasoline",
    "userId": "000000000000000000000001"
  }
]
```

---

### POST /vehicles
Add a vehicle.

```
POST /vehicles
Authorization: Bearer <API_TOKEN>
Content-Type: application/json
```

**Body**
```json
{
  "name": "Toyota Corolla",
  "fuelType": "gasoline",
  "userId": "000000000000000000000001"
}
```

`fuelType` — required, one of: `gasoline`, `diesel`.

**Response**
```json
{
  "_id": "664f1e2b3c4d5e6f7a8b9c0d",
  "name": "Toyota Corolla",
  "fuelType": "gasoline",
  "userId": "000000000000000000000001"
}
```

---

## Refuels

### GET /refuels?userId=:id&vehicleId=:id
Get all refuels for a user and vehicle (sorted newest first).

```
GET /refuels?userId=000000000000000000000001&vehicleId=664f1e2b3c4d5e6f7a8b9c0d
Authorization: Bearer <API_TOKEN>
```

**Response**
```json
[
  {
    "_id": "664f1e2b3c4d5e6f7a8b9c0e",
    "mileage": 15230,
    "liters": 42.5,
    "cost": 68.00,
    "location": "52.2297,21.0122",
    "userId": "000000000000000000000001",
    "vehicleId": {
      "_id": "664f1e2b3c4d5e6f7a8b9c0d",
      "name": "Toyota Corolla",
      "fuelType": "gasoline"
    },
    "createdAt": "2026-03-25T10:00:00.000Z",
    "updatedAt": "2026-03-25T10:00:00.000Z"
  }
]
```

---

### POST /refuels
Add a refuel entry.

```
POST /refuels
Authorization: Bearer <API_TOKEN>
Content-Type: application/json
```

**Body**
```json
{
  "mileage": 15230,
  "liters": 42.5,
  "cost": 68.00,
  "location": "Shell Station",
  "userId": "000000000000000000000001",
  "vehicleId": "664f1e2b3c4d5e6f7a8b9c0d"
}
```

`location` is optional.

**Response**
```json
{
  "_id": "664f1e2b3c4d5e6f7a8b9c0e",
  "mileage": 15230,
  "liters": 42.5,
  "cost": 68.00,
  "location": "Shell Station",
  "userId": "000000000000000000000001",
  "vehicleId": "664f1e2b3c4d5e6f7a8b9c0d",
  "createdAt": "2026-03-25T10:00:00.000Z",
  "updatedAt": "2026-03-25T10:00:00.000Z"
}
```

---

### PATCH /refuels/:id
Update a refuel entry.

```
PATCH /refuels/664f1e2b3c4d5e6f7a8b9c0e
Authorization: Bearer <API_TOKEN>
Content-Type: application/json
```

**Body** (all fields optional)
```json
{
  "mileage": 15300,
  "liters": 44.0,
  "cost": 70.00,
  "location": "52.4064,16.9252"
}
```

**Response**
```json
{
  "_id": "664f1e2b3c4d5e6f7a8b9c0e",
  "mileage": 15300,
  "liters": 44.0,
  "cost": 70.00,
  "location": "52.4064,16.9252",
  "userId": "000000000000000000000001",
  "vehicleId": "664f1e2b3c4d5e6f7a8b9c0d",
  "createdAt": "2026-03-25T10:00:00.000Z",
  "updatedAt": "2026-05-05T12:00:00.000Z"
}
```

Returns `404` if the refuel is not found.

---

### DELETE /refuels/:id
Delete a refuel entry.

```
DELETE /refuels/664f1e2b3c4d5e6f7a8b9c0e
Authorization: Bearer <API_TOKEN>
```

**Response**
```
204 No Content
```

Returns `404` if the refuel is not found.

---

## Default seed

On startup, default data is created if none exists:

### User

| Field      | Value                      |
|------------|----------------------------|
| `_id`      | `000000000000000000000001` |
| `username` | `Jan Kowalski`             |

### Vehicle

| Field      | Value                      |
|------------|----------------------------|
| `_id`      | `000000000000000000000001` |
| `name`     | `Default Car`              |
| `fuelType` | `gasoline`                 |
| `userId`   | `000000000000000000000001` |

### Refuels

| `mileage` | `liters` | `cost`   | `location`        |
|------------|----------|----------|--------------------|
| 12000      | 42.5     | 265.30   | `52.2297,21.0122`  |
| 12450      | 40.1     | 252.80   | `50.0647,19.9450`  |
| 12900      | 43.7     | 274.15   | `54.3520,18.6466`  |

All refuels are linked to the default user and vehicle. The `location` field contains Google Maps coordinates.
