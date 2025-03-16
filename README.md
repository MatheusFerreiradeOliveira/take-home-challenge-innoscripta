Take home challenge Innoscripta!

## Creating Docker Image

To create and run the docker image, just run a simple docker build:

```bash
docker build -t take-home-challenge .
```

then, get the image id using

```bash
docker images
```

Finally, run:

```bash
docker run -p <YOUR_PORT>:3000 <IMAGE_ID>
```

## Running code locally

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
