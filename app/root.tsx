import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import LayoutContent from './components/layout';
import '@fontsource-variable/inter/index.css';
import "./tailwind.css";
import { Provider } from "jotai";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="dark min-h-screen bg-background antialiased">
        <Provider>
          <div className="flex flex-row">
            <LayoutContent>
              {children}
            </LayoutContent>
          </div>
          <ScrollRestoration />
          <Scripts />
        </Provider>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}