import AuthProvider from "./components/AuthProvider";
import "./globals.css";



export default function RootLayout({ children }) {
 
      
  return (
     <html lang="en">
      <head>
        {/* Google Translate script */}
      </head>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>

        {/* Google Translate init function */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              function googleTranslateElementInit() {
                new google.translate.TranslateElement({
                  pageLanguage: 'en',
                  includedLanguages: 'en,ar',
                  layout: google.translate.TranslateElement.InlineLayout.SIMPLE
                }, 'google_translate_element');
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
