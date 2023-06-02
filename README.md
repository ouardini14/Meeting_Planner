# Meeting Planner API

The Meeting Planner API is a tool for managing reservations, rooms, and meeting types. It provides an solution for scheduling and optimizing meetings .

## Features

- Create, update, and delete reservations for various meeting types.
- Manage rooms, including adding, updating, and deleting room information.
- Define and customize meeting types to suit your organization's needs.
- Get Suggestions about planning  for optimal scheduling.

## Prerequisites

- Node.js 
- Express
- mongoose 
- nodemon

## Getting Started

```bash
git clone https://github.com/ouardini14/Meeting_Planner.git
cd meeting-planner
npm install
npm start
```
## API Endpoints

### Reservations

- **GET /Reservations**: Retrieve all reservations.
- **GET /Reservations/id/:id**: Retrieve a specific reservation by ID.
- **GET /Reservations/ByDate/:date**: Retrieve all reservations of a specific Date .
- **GET /Reservations/ByName/:name**: Retrieve a specific reservation by Name.
- **POST /Reservations**: Create a new reservation.
- **POST /Reservations/list**:  Create the optimal scheduling for a specific date (By a given list of reservations).
- **POST /Reservations/Suggest-Reservations**: Generate the optimal scheduling for a specific date (By a given list of reservations) .
- **DELETE /Reservations/ByDate/:date**: Delete all reservations by date.
- **DELETE /Reservations/ByName/:name**: Delete a specific reservation by name.


### Rooms

- **GET /Rooms**: Retrieve all rooms.
- **GET /Rooms/id/:id**: Retrieve a specific room by ID.
- **GET /Rooms/ByName/:name**: Retrieve a specific room by name.
- **GET /Rooms/ByCapacity/:capacity**: Retrieve all rooms by capacity.
- **GET /Rooms/ByTools**: Retrieve all rooms by resources.
- **POST /Rooms**: Create a new room.
- **PUT /Rooms/ByName/:name**: Update a specific room by name.
- **DELETE /Rooms/ByName/:name**: Delete a specific room by name.

### Meeting Types

- **GET /Meetings**: Retrieve all meeting types.
- **GET /Meetings/ByName/:name**: Retrieve a specific meeting type by name.
- **POST /Meetings**: Create a new meeting type.
- **PUT /Meetings/ByName/:name**: Update a specific meeting type by name.
- **DELETE /Meetings/ByName/:name**: Delete a specific meeting type by name.


## Model Schemas

### Meeting Type

```javascript
{
  Name:  String,
  Capacity:  Number,
  Tools: [String]
}
```

### Room

```javascript
{
  Name:  String,
  Capacity:  Number,
  Tools: [String]
}
```

### Reservation

```javascript
{
  Name: String,
  Nbr_participants: Number,
  Date: Date, //yyyy-mm-dd
  StartTime: Number,
  EndTime: Number,
  meeting_type: String,
  Room_name: String
}
```