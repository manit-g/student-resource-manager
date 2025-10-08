'use client';

import { useState } from 'react';
import { formatDate, getResourceTypeColor, getResourceTypeIcon, truncateText } from '@/lib/utils';
import Button from '@/components/ui/Button';
import EditResourceModal from './EditResourceModal';

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

interface ResourceCardProps {
  resource: Resource;
  onDelete: () => void;
  onUpdate: () => void;
}

export default function ResourceCard({ resource, onDelete, onUpdate }: ResourceCardProps) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this resource?')) {
      return;
    }

    setDeleting(true);
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`/api/resources/${resource._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        onDelete();
      } else {
        alert('Failed to delete resource');
      }
    } catch {
      alert('An error occurred while deleting the resource');
    } finally {
      setDeleting(false);
    }
  };

  const handleResourceClick = () => {
    if (resource.type === 'link' && resource.url) {
      window.open(resource.url, '_blank');
    } else if (resource.type === 'file' && resource.fileUrl) {
      window.open(resource.fileUrl, '_blank');
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{getResourceTypeIcon(resource.type)}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getResourceTypeColor(resource.type)}`}>
                  {resource.type}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {resource.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2">{resource.subject}</p>
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowEditModal(true)}
              >
                Edit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? '...' : 'Delete'}
              </Button>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-700 mb-4">
            {truncateText(resource.description, 100)}
          </p>

          {/* Tags */}
          {resource.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {resource.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500">
              Created {formatDate(resource.createdAt)}
            </div>
            {(resource.type === 'link' && resource.url) || (resource.type === 'file' && resource.fileUrl) ? (
              <Button
                variant="outline"
                size="sm"
                onClick={handleResourceClick}
              >
                {resource.type === 'link' ? 'Open Link' : 'Download'}
              </Button>
            ) : null}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <EditResourceModal
          resource={resource}
          onClose={() => setShowEditModal(false)}
          onResourceUpdated={onUpdate}
        />
      )}
    </>
  );
}
