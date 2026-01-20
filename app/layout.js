
import AuthProvider from "./components/AuthProvider";
import "./globals.css";
import "../src/lib/i18n"; 


export default function RootLayout({ children }) {
  // Get persisted language from localStorage
 
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
