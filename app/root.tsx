import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { ClerkApp } from "@clerk/remix";
import { rootAuthLoader } from "@clerk/remix/ssr.server";
import { LazyMotion, domAnimation, m } from "framer-motion";
import MainNav from "~/components/Layout/MainNav";
import styles from "~/tailwind.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
];

export const loader = (args: Parameters<typeof rootAuthLoader>[0]) => rootAuthLoader(args);

export function ErrorBoundary() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <p className="text-gray-600">Please try again later</p>
    </div>
  );
}

function App() {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <LazyMotion features={domAnimation} strict>
          <MainNav />
          <Outlet />
        </LazyMotion>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// Use import.meta.env instead of process.env
export default ClerkApp(App, {
  publishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
});




