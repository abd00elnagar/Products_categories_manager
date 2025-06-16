import HomeNavBar from "../components/HomeNavBar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Unateed | Company",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <HomeNavBar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
