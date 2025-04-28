import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-red-600 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-white">Highway Emergency Response System</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="text-white border-white hover:bg-red-700 hover:text-white">
            Help
          </Button>
          <Button variant="outline" className="text-white border-white hover:bg-red-700 hover:text-white">
            Login
          </Button>
        </div>
      </header>
      <main className="flex-1 p-6 bg-gray-100">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/dashboard/police" className="block">
              <Card className="h-full hover:shadow-lg transition-shadow border-l-4 border-l-blue-600">
                <CardHeader>
                  <CardTitle>Police Dashboard</CardTitle>
                  <CardDescription>Manage law enforcement responses and patrol units</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-40 bg-blue-50 rounded-md flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="64"
                      height="64"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-blue-600"
                    >
                      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"></path>
                      <path d="M12 8v8"></path>
                      <path d="M8 12h8"></path>
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/dashboard/ems" className="block">
              <Card className="h-full hover:shadow-lg transition-shadow border-l-4 border-l-green-600">
                <CardHeader>
                  <CardTitle>EMS Dashboard</CardTitle>
                  <CardDescription>Coordinate ambulance services and medical responses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-40 bg-green-50 rounded-md flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="64"
                      height="64"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-600"
                    >
                      <path d="M22 11h-4V7h-4v4H10V7H6v4H2v6h4v-2h12v2h4z"></path>
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/dashboard/fire" className="block">
              <Card className="h-full hover:shadow-lg transition-shadow border-l-4 border-l-red-600">
                <CardHeader>
                  <CardTitle>Fire Brigade Dashboard</CardTitle>
                  <CardDescription>Manage fire emergency responses and resources</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-40 bg-red-50 rounded-md flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="64"
                      height="64"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-red-600"
                    >
                      <path d="M12 2c.2 0 6.5 5 6.5 12a6.5 6.5 0 1 1-13 0C5.5 7 11.8 2 12 2z"></path>
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Emergency Activation</CardTitle>
              <CardDescription>Quickly activate emergency response for critical situations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button size="lg" className="h-16 bg-blue-600 hover:bg-blue-700">
                  <Link href="/emergency/police" className="flex items-center justify-center w-full h-full">
                    Activate Police Response
                  </Link>
                </Button>
                <Button size="lg" className="h-16 bg-green-600 hover:bg-green-700">
                  <Link href="/emergency/ems" className="flex items-center justify-center w-full h-full">
                    Activate Medical Response
                  </Link>
                </Button>
                <Button size="lg" className="h-16 bg-red-600 hover:bg-red-700">
                  <Link href="/emergency/fire" className="flex items-center justify-center w-full h-full">
                    Activate Fire Response
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Coordinated Response</CardTitle>
              <CardDescription>Activate multiple services for major incidents</CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="lg" className="w-full h-16 bg-purple-600 hover:bg-purple-700">
                <Link href="/emergency/coordinated" className="flex items-center justify-center w-full h-full">
                  Activate Coordinated Emergency Response
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>Highway Emergency Response System (HERS) - Coordinating emergency services efficiently</p>
      </footer>
    </div>
  )
}
