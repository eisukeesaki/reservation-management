[#](#) hotel reservation management system

```text

hotel reservation management system
    reservation
        priviledge
            retention of room for future use
            properties
                reserved room
                    UID
                    number
                reservation period
                    from
                        date
                        time
                    to
                        date
                        time
                reserver info
                    UID
                    name
                        given
                        family
                    contact info
                        email
                        phone number
                payment
                    cost paid
    users
        hotel owner
            functions
                reservation
                    read
                        any
                            find by condition
                                one
                                multiple
                    write
                        create
                            any
                        update
                            any
                                find by condition
                                    one
                                    multiple
                    destroy                
                        any
                            find by condition
                                one
                                multiple
        hotel user
            functions
                reservation
                    read
                        own reservation
                            select from list of recent reservations
                                one
                            find by condition
                                one
                    write
                        create
                            own reservation
                                available room
                        update
                            own reservation
                                select from list of recent reservations
                                    find by condition
                                        one
                                find by condition
                                    one
                    destroy                
                        own reservation
                            select from list of recent reservations
                            find by condition
                                one
                                multiple
    application
        web API
            resources
                users
                    UID
                    email
                    password
                    name
                        given
                        family
                user authentication
                    OAuth 2.0
                        Google
                sessions
                    hotel users
                        create new
                        destroy
                hotels
                    UID
                    name
                rooms
                    UID
                    number
                    hourly cost
                        not required for minimum viable product
                    reserved
                    UID of relevant hotel
                reservations
                    UID
                    UID of relevant user
                    UID of relevant hotel
                        not required for minimum viable product
                    UID of relevant room
                    period from
                    period to
                    cost paid
                        not required for minimum viable product
                UI
                    views
                        signup
                        login
                        application
                            hotel owner
                            hotel user
                        
        UI

```

```text

in future versions do
    re-write in TypeScript
        write modules as ES Modules

```

