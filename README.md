
# Pokedex Problem

  

Created using Nextjs, Pokedex lets you search for Pokemons using specific TRPC routes. This is an assignment for Madverse Music

  

## Things Implemented

  

-  **DB Design**: A PostgreSql database with prisma ORM. The DB is hosted on Neon.

-  **Pagination**: Database level pagination using prisma ORM.

-  **Caching**: Caching using Redis cache.

-  **UI/UX**: Modern UI/UX using MaterialUI and a little bit of Tailwind.

# Pokedex Setup and Run Guide 

## Prerequisites 
- Node.js installed 
- PostgreSQL and Redis set up (or access to external services) 

## Steps to Run the App 

1. **Clone the Repository** 

	```
	git clone git@github.com:Soumyadas15/Pokedex.git
	cd Pokedex
	```
2. **Install the Packages** 

	```
	npm install
	```
3. **Setup Environment files** 

	In the root of the project create a .env file with the following details:

	```
	DATABASE_URL=
	REDIS_HOST=
	REDIS_PASSWORD=
	REDIS_PORT=
	```
4. **Run the App** 

	Finally run the app using.

	```
	npm run dev
	```
5. **Check browser** 

	Visit [http://localhost:3000/](http://localhost:3000/) to see the app running.