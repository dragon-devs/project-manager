import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "@/components/ThemeProvider";
import NavBar from "@/app/NavBar";
import Container from "@/components/Container";
import {Toaster} from "@/components/ui/sonner";
import Footer from "@/app/Footer";
import AuthProvider from "@/app/auth/Provider";
import QueryClientProvider from "@/app/QueryClientProvider";
import {getServerSession} from "next-auth";
import authOptions from "@/app/auth/authOptions";
import {Knock} from "@knocklabs/node";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Project Manager",
    description: "Empower yourself with an application designed for efficient project management tailored to your unique requirements.",
};

export default async function RootLayout({children,}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getServerSession(authOptions);
    if (session) {
        const knockClient = new Knock(process.env.KNOCK_API_KEY);
        const knockUser = await knockClient.users.identify(session!.user!.id, {
            name: session!.user!.name!,
            email: session!.user!.email!,
            avatar: session!.user!.image!
        })
    }
    return (
        <html lang="en">
        <body className={inter.className}>
        <QueryClientProvider>
            <AuthProvider>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div className="flex flex-col min-h-screen">
                        <NavBar/>
                        <main className="flex-grow sm:p-5 p-3">
                            <Container>{children}</Container>
                        </main>
                        <Toaster position="top-center"/>
                        <Footer/>
                    </div>
                </ThemeProvider>
            </AuthProvider>
        </QueryClientProvider>

        </body>
        </html>
    );
}
