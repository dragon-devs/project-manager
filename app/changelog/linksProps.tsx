import {ComponentType, ReactNode} from 'react';

// Define a custom component props type
type CustomComponentProps = {
  children: ReactNode;
  href?: string;
};

export const CustomComponents: Partial<Record<string, ComponentType<CustomComponentProps>>> = {
  h1: ({ children }) => <h1 className="text-2xl my-4 font-bold">{children}</h1>,
  h2: ({ children }) => <h2 className="text-xl my-4 font-bold">{children}</h2>,
  h3: ({ children }) => <h3 className="text-lg my-4 font-bold">{children}</h3>,
  ul: ({ children }) => <ul className="ml-8">{children}</ul>,
  ol: ({ children }) => <ol className="ml-8">{children}</ol>,
  li: ({ children }) => <li className="list-disc text-sm my-1">{children}</li>,
  p: ({ children }) => <p className="my-5">{children}</p>,
  a: ({ children, href }) => (
    <a className="text-blue-500 hover:underline" href={href}>
      {children}
    </a>
  ),
};