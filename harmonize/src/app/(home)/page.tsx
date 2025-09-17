import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col justify-center text-center">
      <h1 className="mb-4 text-2xl font-bold">Welcome!</h1>
      <p>A new landing page is on the way.</p>
      <br />
      <p className="text-fd-muted-foreground">
        In the meantime, visit our documentation at {' '}
        <Link
          href="/docs"
          className="text-fd-foreground font-semibold underline"
        >
          /docs
        </Link>{' '}
        .
      </p>
    </main>
  );
}
