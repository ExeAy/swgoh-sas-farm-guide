import type { Metadata } from "next"
import ThemeRegistry from "../src/components/theme-registry"
import "./globals.css"

export const metadata: Metadata = {
  title: "RoS Farm Guide",
  description: "Farm guide for members of SaS Revenge of the Schwartz",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry options={{ key: "mui" }}>
          <div className="flex justify-center w-fit mx-auto pb-10">
            <div className="px-2 flex flex-col items-center w-full gap-5 mt-20">
              {children}
            </div>
          </div>
        </ThemeRegistry>
      </body>
    </html>
  )
}
