# Friendly Guacamole

A site for creating and answering polls.

# Setup Project Locally

## Client

**Pre-reqs**
1. Install Node.js (https://nodejs.org/en/)

**Setup**
1. Go to client folder
1. Run the command `npm install`
1. Run the command `npm start`

The client application will start on port 8080.
Navigate to `http://localhost:8080`.

## Server

**Pre-reqs**
1. Install Docker (https://docs.docker.com/engine/installation/)
1. Install Docker Compose (https://docs.docker.com/compose/install/)
1. Install JDK, and SBT
    1. http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html
    1. https://www.scala-lang.org/download/
  
**Setup**
1. Run command `docker-compose up` from the root repo folder
1. Run the `initialize-db.sql` script while connected to the database created in the previous step
1. Go to server/friendly-guacamole-server folder
1. Run the command `sbt run` (the first time may take a while)
