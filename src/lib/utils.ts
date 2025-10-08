import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatDateTime(date: string | Date) {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function getResourceTypeColor(type: string) {
  switch (type) {
    case 'note':
      return 'bg-blue-100 text-blue-800';
    case 'assignment':
      return 'bg-green-100 text-green-800';
    case 'link':
      return 'bg-purple-100 text-purple-800';
    case 'file':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export function getResourceTypeIcon(type: string) {
  switch (type) {
    case 'note':
      return '📝';
    case 'assignment':
      return '📋';
    case 'link':
      return '🔗';
    case 'file':
      return '📄';
    default:
      return '📁';
  }
}
