This is a [Whatsapp UI](https://www.penadigital.id/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) created with ❤️ by [Pena Digital](https://www.penadigital.id/).

## Using Docker

1. [Install Docker](https://docs.docker.com/get-docker/) on your machine.
2. Create .env file and fill required data `cp .env.local.example .env`.
3. Delete your existing container `docker-compose down`.
4. Build your container: `docker-compose up --build -d`.

You can view your images created with `docker images`.

This will build the project as a standalone app inside the Docker image.

## Development Server

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
