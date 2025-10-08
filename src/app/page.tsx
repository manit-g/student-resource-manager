import Link from 'next/link';
import Button from '@/components/ui/Button';

export default async function HomePage() {
  // For now, we'll handle authentication on the client side
  const session = null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">
                Student Resource Manager <span className="text-sm font-normal">by</span>{' '}
                <a 
                  href="https://portfoliobymg.netlify.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 font-bold"
                >
                  MG
                </a>
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              {session ? (
                <Link href="/dashboard">
                  <Button>Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link href="/auth/signin">
                    <Button variant="outline">Sign In</Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button>Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Organize Your
            <span className="text-blue-600"> Study Materials</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A comprehensive platform for students to store, organize, and manage their study materials 
            including notes, assignments, and useful links.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {session ? (
              <Link href="/dashboard">
                <Button size="lg">Go to Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link href="/auth/signup">
                  <Button size="lg">Get Started</Button>
                </Link>
                <Link href="/auth/signin">
                  <Button variant="outline" size="lg">Sign In</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Everything You Need to Stay Organized
          </h2>
          <p className="text-lg text-gray-600">
            Powerful features designed specifically for students
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">📝</div>
            <h3 className="text-xl font-semibold mb-2">Organize Notes</h3>
            <p className="text-gray-600">
              Store and categorize your study notes by subject for easy access.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">📋</div>
            <h3 className="text-xl font-semibold mb-2">Track Assignments</h3>
            <p className="text-gray-600">
              Keep track of your assignments and deadlines with detailed descriptions.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">🔗</div>
            <h3 className="text-xl font-semibold mb-2">Save Links</h3>
            <p className="text-gray-600">
              Store important study links and resources for quick access.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">📄</div>
            <h3 className="text-xl font-semibold mb-2">Upload Files</h3>
            <p className="text-gray-600">
              Upload and organize your study materials and documents.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">🏷️</div>
            <h3 className="text-xl font-semibold mb-2">Smart Tags</h3>
            <p className="text-gray-600">
              Organize resources with custom tags for easy searching and filtering.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
            <p className="text-gray-600">
              Your data is secure and private. Only you can access your resources.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Student Resource Manager</h3>
            <p className="text-gray-400 mb-6">
              Built with Next.js 15, TypeScript, MongoDB, and Tailwind CSS
            </p>
            <div className="flex justify-center space-x-6">
              <a 
                href="https://portfoliobymg.netlify.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                Portfolio
              </a>
              <a 
                href="https://github.com/manit-g" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                GitHub
              </a>
              <a 
                href="https://linkedin.com/in/manitgeraa" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                LinkedIn
              </a>
            </div>
            <p className="text-gray-500 mt-6">
              Built by Manit Gera
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}