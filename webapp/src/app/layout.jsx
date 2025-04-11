import './globals.scss';

export const metadata = {
  title: 'Login Page',
  description: 'Generic login template',
};

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
