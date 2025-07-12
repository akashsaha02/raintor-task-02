import Image from "next/image";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";

export default function Home() {
  return (
    <PageLayout>
      <div className="bg-gradient-to-b from-white to-gray-50">
        <div className="pt-12 pb-20 px-6">
          <main className="flex flex-col max-w-5xl mx-auto w-full">
            <section className="flex flex-col items-center mb-20 animate-fadeIn">
              <div className="relative w-full h-40 mb-8">
                <Image
                  className="object-contain dark:invert"
                  src="/next.svg"
                  alt="Next.js logo"
                  fill
                  priority
                />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Raintor Tech Test
              </h1>
              <p className="text-gray-600 text-center max-w-2xl text-lg">
                Demonstration of real-time location communication and infinite
                scroll implementation
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 p-4 rounded-lg mr-5">
                    <Image
                      src="/globe.svg"
                      alt="Globe icon"
                      width={32}
                      height={32}
                      className="text-blue-600"
                    />
                  </div>
                  <h2 className="text-2xl font-bold">
                    Real-Time Location Sharing
                  </h2>
                </div>
                <p className="text-gray-600 mb-8 text-lg">
                  Demonstrates real-time location communication between users
                  using SignalR WebSocket connection. Send your location and see
                  updates from other users on a map.
                </p>
                <Link
                  href="/location-sharing"
                  className="group inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors text-lg font-medium"
                >
                  Open Location Sharing
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center mb-6">
                  <div className="bg-green-100 p-4 rounded-lg mr-5">
                    <Image
                      src="/window.svg"
                      alt="User list icon"
                      width={32}
                      height={32}
                      className="text-green-600"
                    />
                  </div>
                  <h2 className="text-2xl font-bold">
                    Infinite Scroll User Feed
                  </h2>
                </div>
                <p className="text-gray-600 mb-8 text-lg">
                  An implementation of infinite scrolling for a user list with
                  SWR, featuring pagination, loading states, error handling, and
                  accessibility features.
                </p>
                <Link
                  href="/user-feed"
                  className="group inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg transition-colors text-lg font-medium"
                >
                  Open User Feed
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            <section className="mt-20">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  About This Project
                </h2>
                <p className="text-gray-600 mb-6 text-lg">
                  This technical test demonstrates two key capabilities:
                  real-time WebSocket communication and efficient infinite
                  scrolling. Both implementations showcase responsive design,
                  proper error handling, and modern React patterns.
                </p>
              </div>
            </section>
          </main>
        </div>
      </div>
    </PageLayout>
  );
}
