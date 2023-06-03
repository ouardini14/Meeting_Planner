
<h1 align="center">The Meeting Planner API</h1>

------

# Meeting Planner API

The Meeting Planner API for managing reservations, rooms, and meeting types. It provides an solution for scheduling and optimizing meetings .

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
- Jest & Supertest (For testing)
## Getting Started
```bash
git clone https://github.com/ouardini14/Meeting_Planner.git
cd meeting-planner
npm install
npm start
```
### For tests
```bash
npm test --  --testPathPattern=meetings.test.js
npm test --  --testPathPattern=rooms.test.js
npm test --  --testPathPattern=reservations.test.js
```
## API Endpoints

### Reservations

- **GET     /Reservations**: Retrieve all reservations.
- **GET     /Reservations/id/:id**: Retrieve a specific reservation by ID.
- **GET     /Reservations/ByDate/:date**: Retrieve all reservations of a specific Date .
- **GET     /Reservations/ByName/:name**: Retrieve a specific reservation by Name.
- **POST    /Reservations**: Create a new reservation.
- **POST    /Reservations/list**:  Create the optimal scheduling for a specific date (By a given list of reservations).
- **POST    /Reservations/Suggest-Reservations**: Generate the optimal scheduling for a specific date (By a given list of reservations) .
- **DELETE  /Reservations/ByDate/:date**: Delete all reservations by date.
- **DELETE  /Reservations/ByName/:name**: Delete a specific reservation by name.


### Rooms

- **GET    /Rooms**: Retrieve all rooms.
- **GET    /Rooms/id/:id**: Retrieve a specific room by ID.
- **GET    /Rooms/ByName/:name**: Retrieve a specific room by name.
- **GET    /Rooms/ByCapacity/:capacity**: Retrieve all rooms by capacity.
- **GET    /Rooms/ByTools**: Retrieve all rooms by resources.
- **POST   /Rooms**: Create a new room.
- **PUT    /Rooms/ByName/:name**: Update a specific room by name.
- **DELETE /Rooms/ByName/:name**: Delete a specific room by name.

### Meeting Types

- **GET    /Meetings**: Retrieve all meeting types.
- **GET    /Meetings/ByName/:name**: Retrieve a specific meeting type by name.
- **POST   /Meetings**: Create a new meeting type.
- **PUT    /Meetings/ByName/:name**: Update a specific meeting type by name.
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


## Example Usage 



### Meeting Type

#### GET Meetings (get only 5)
```javascript
fetch('https://meeting-planner-five.vercel.app/Meetings?start=0&qt=5')
            .then(res=>res.json())
            .then(json=>console.log(json))
```

#### GET Meeting Type by name
```javascript
fetch('https://meeting-planner-five.vercel.app/Meetings/ByName/RS')
            .then(res=>res.json())
            .then(json=>console.log(json))
```

#### Add Meeting Type 
```javascript
fetch('https://meeting-planner-five.vercel.app/Meetings',{
            method:"POST",
            body:JSON.stringify(
                {
                    Name: 'RS',
                    Capacity: 3,
                    Tools: ["Ecran","Webcam","Pieuvre"]
                }
            )
        })
            .then(res=>res.json())
            .then(json=>console.log(json))
```



### Rooms


#### get Rooms by tools
```javascript
fetch('https://meeting-planner-five.vercel.app/Rooms/ByTools',{
            method:"GET",
            body:JSON.stringify(
                {
                    Tools: ["Ecran","Tableau",]
                }
            )
        })
            .then(res=>res.json())
            .then(json=>console.log(json))
```

#### Add Room
```javascript
fetch('https://meeting-planner-five.vercel.app/Rooms',{
            method:"POST",
            body:JSON.stringify(
                {
                    Name: 'E1002',
                    Capacity: 24,
                    Tools: ["Ecran","Tableau",]
                }
            )
        })
            .then(res=>res.json())
            .then(json=>console.log(json))
```



### Reservation

#### Add a single Reservation
```javascript
fetch('https://meeting-planner-five.vercel.app/Reservations',{
            method:"POST",
            body:JSON.stringify(
                {
                    Name: "Reunion 1",
                    Nbr_participants: 5,
                    Date:"2023-06-01",
                    StartTime:8,
                    EndTime:9,
                    meeting_type:"RS"
                }
            )
        })
            .then(res=>res.json())
            .then(json=>console.log(json))
```

#### Add a list of Reservations
```javascript
fetch('https://meeting-planner-five.vercel.app/Reservations/list',{
            method:"POST",
            body:JSON.stringify(
                {
                    list: 
                    [
                        { Name: "Réunion 1", StartTime: 9, EndTime: 10, meeting_type: "VC", Nbr_participants: 8 },
                        { Name: "Réunion 2", StartTime: 9, EndTime: 10, meeting_type: "VC", Nbr_participants: 6 },
                        { Name: "Réunion 3", StartTime: 11, EndTime: 12, meeting_type: "RC", Nbr_participants: 4 },
                        { Name: "Réunion 4", StartTime: 11, EndTime: 12, meeting_type: "RS", Nbr_participants: 2 },
                        { Name: "Réunion 5", StartTime: 11, EndTime: 12, meeting_type: "SPEC", Nbr_participants: 9 },
                        { Name: "Réunion 6", StartTime: 9, EndTime: 10, meeting_type: "RC", Nbr_participants: 7 }
                    ]
                ,
                Date:2023-06-01

                }
            )
        })
            .then(res=>res.json())
            .then(json=>console.log(json))
```

#### Suggest best schedule based on a list of a requested Reservations 
```javascript
fetch('https://meeting-planner-five.vercel.app/Reservations/Suggest-Reservations',{
            method:"POST",
            body:JSON.stringify(
                {
                    list: 
                    [
                        { Name: "Réunion 1", StartTime: 9, EndTime: 10, meeting_type: "VC", Nbr_participants: 8 },
                        { Name: "Réunion 2", StartTime: 9, EndTime: 10, meeting_type: "VC", Nbr_participants: 6 },
                        { Name: "Réunion 3", StartTime: 11, EndTime: 12, meeting_type: "RC", Nbr_participants: 4 },
                        { Name: "Réunion 4", StartTime: 11, EndTime: 12, meeting_type: "RS", Nbr_participants: 2 },
                        { Name: "Réunion 5", StartTime: 11, EndTime: 12, meeting_type: "SPEC", Nbr_participants: 9 },
                        { Name: "Réunion 6", StartTime: 9, EndTime: 10, meeting_type: "RC", Nbr_participants: 7 }
                    ]
                ,
                Date:2023-06-01

                }
            )
        })
            .then(res=>res.json())
            .then(json=>console.log(json))
```


### Error Handling
When submitting a list of requested reservations for a specific date, the Meeting Planner API responds with a comprehensive result that includes both the accepted and declined reservations. This behavior is implemented to ensure optimal utilization of limited rooms and resources, taking into account various factors such as : 
- availability
- capacity
- conflicting schedules

However, it's important to note that certain reservations may not be valid due to the availability restrictions of specific rooms. For example, if a room is reserved by hour-long time slots and is already reserved from 8 a.m. to 8 p.m. every day except weekends, any requested reservations within that time frame will be automatically declined.
