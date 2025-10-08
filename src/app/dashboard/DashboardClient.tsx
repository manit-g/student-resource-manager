'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import ResourceCard from '@/components/ResourceCard';
import AddResourceModal from '@/components/AddResourceModal';
import { getResourceTypeIcon } from '@/lib/utils';

interface Resource {
  _id: string;
  title: string;
  subject: string;
  type: 'note' | 'assignment' | 'link' | 'file';
  description: string;
  url?: string;
  fileUrl?: string;
  fileName?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

interface DashboardClientProps {
  user: User | null;
}

export default function DashboardClient({ user }: DashboardClientProps) {
  const router = useRouter();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('');
  const [filterType, setFilterType] = useState('');

  const fetchResources = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/auth/signin');
        return;
      }

      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (filterSubject) params.append('subject', filterSubject);
      if (filterType) params.append('type', filterType);

      const response = await fetch(`/api/resources?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      
      if (response.ok) {
        setResources(data.resources);
      } else if (response.status === 401) {
        localStorage.removeItem('token');
        router.push('/auth/signin');
      }
    } catch (error) {
      console.error('Error fetching resources:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, [searchTerm, filterSubject, filterType]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleResourceAdded = () => {
    fetchResources();
    setShowAddModal(false);
  };

  const handleResourceDeleted = () => {
    fetchResources();
  };

  const handleResourceUpdated = () => {
    fetchResources();
  };

  const subjects = [...new Set(resources.map(r => r.subject))];
  const resourceTypes = ['note', 'assignment', 'link', 'file'];

  return (
    <div className="min-h-screen bg-gray-50">
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
              <span className="text-sm text-gray-600">Welcome, {user?.name || 'User'}</span>
              <Button variant="outline" onClick={() => {
                localStorage.removeItem('token');
                router.push('/auth/signin');
              }}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">My Resources</h2>
              <p className="text-gray-600">Organize and manage your study materials</p>
            </div>
            <Button onClick={() => setShowAddModal(true)}>
              Add Resource
            </Button>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <select
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Subjects</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Types</option>
                {resourceTypes.map(type => (
                  <option key={type} value={type}>
                    {getResourceTypeIcon(type)} {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-500">Loading resources...</div>
          </div>
        ) : resources.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || filterSubject || filterType 
                ? 'Try adjusting your search filters'
                : 'Get started by adding your first resource'
              }
            </p>
            <Button onClick={() => setShowAddModal(true)}>
              Add Your First Resource
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <ResourceCard
                key={resource._id}
                resource={resource}
                onDelete={handleResourceDeleted}
                onUpdate={handleResourceUpdated}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add Resource Modal */}
      {showAddModal && (
        <AddResourceModal
          onClose={() => setShowAddModal(false)}
          onResourceAdded={handleResourceAdded}
        />
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Student Resource Manager</h3>
            <p className="text-gray-400 mb-6">
              Built with Next.js 15, TypeScript, MongoDB, and Tailwind CSS
            </p>
            <div className="flex justify-center space-x-6 mb-4">
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
            <p className="text-gray-500">
              Built by Manit Gera
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
