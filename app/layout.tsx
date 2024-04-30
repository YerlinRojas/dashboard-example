import { montserrat } from './ui/fonts';
import './ui/global.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className= { `${montserrat.className} antialiased`}>
        {children}
        <footer>
          Este es el footer
        </footer>
        </body>
    </html>
  );
}
