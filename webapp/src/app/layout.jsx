import './globals.scss';

export const metadata = {
  title: 'Investment Portfolio Dashboard',
  description: 'A dashboard designed to keep track of all your investments',
};

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
