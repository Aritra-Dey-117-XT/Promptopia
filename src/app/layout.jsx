import "@/styles/globals.css"
import Nav from './../components/Nav';
import Provider from "../components/Provider";

export const metadata = {
    title: "Promptopia",
    description: "Discover & Share AI Prompts",
    icons: {
      icon: '/favicon.ico',
    },
}

function RootLayout({children}) {
  return (
    <html lang="en">
        <body className="scroll-container">
            <Provider>
                <div className="main">
                    <div className="gradient"/>
                </div>

                <main className="app">
                    <Nav />
                    {children}
                </main>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout