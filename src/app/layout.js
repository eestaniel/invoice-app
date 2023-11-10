import './globals.css'


export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({children}) {
  return (
    <html lang="en">
    <head>

      <title>Title</title>
      <link rel="icon" href="favicon.ico"/>
      <link rel="shortcut icon" href="favicon.ico"/>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@500;700&display=swap" rel="stylesheet"/>
    </head>


    <body className={"w-fit h-fit"}>{children}</body>

    </html>
  )
}
