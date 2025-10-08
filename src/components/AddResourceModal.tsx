'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Select from '@/components/ui/Select';

interface AddResourceModalProps {
  onClose: () => void;
  onResourceAdded: () => void;
}

export default function AddResourceModal({ onClose, onResourceAdded }: AddResourceModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    type: 'note' as 'note' | 'assignment' | 'link' | 'file',
    description: '',
    url: '',
    tags: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      const token = localStorage.getItem('token');
      
      const response = await fetch('/api/resources', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          tags: tagsArray,
        }),
      });

      if (response.ok) {
        onResourceAdded();
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to create resource');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const resourceTypeOptions = [
    { value: 'note', label: '📝 Note' },
    { value: 'assignment', label: '📋 Assignment' },
    { value: 'link', label: '🔗 Link' },
    { value: 'file', label: '📄 File' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Add New Resource</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter resource title"
            />

            <Input
              label="Subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder="e.g., Mathematics, Physics, etc."
            />

            <Select
              label="Type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              options={resourceTypeOptions}
            />

            <Textarea
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Describe this resource..."
              rows={3}
            />

            {formData.type === 'link' && (
              <Input
                label="URL"
                name="url"
                type="url"
                value={formData.url}
                onChange={handleChange}
                required
                placeholder="https://example.com"
              />
            )}

            <Input
              label="Tags (comma-separated)"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="e.g., important, exam, homework"
            />

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1"
              >
                {loading ? 'Creating...' : 'Create Resource'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
