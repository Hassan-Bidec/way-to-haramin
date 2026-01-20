import AuthProvider from "./components/AuthProvider";
import "./globals.css";
import "../lib/i18n";

export default function RootLayout({ children }) {
  // Get persisted language
  let lang = "en";
  if (typeof window !== "undefined") {
    lang = localStorage.getItem("i18nextLng") || "en";
  }

  return (
    <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"}>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
