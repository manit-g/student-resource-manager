import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth-middleware';
import connectDB from '@/lib/mongodb';
import Resource from '@/models/Resource';

// GET - Fetch all resources for the authenticated user
export async function GET(request: NextRequest) {
  try {
    const user = getAuthUser(request);
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const subject = searchParams.get('subject');
    const type = searchParams.get('type');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Build query
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: Record<string, any> = { userId: user.id };
    
    if (subject) {
      query.subject = new RegExp(subject, 'i');
    }
    
    if (type) {
      query.type = type;
    }
    
    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const resources = await Resource.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Resource.countDocuments(query);

    return NextResponse.json({
      resources,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching resources:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create a new resource
export async function POST(request: NextRequest) {
  try {
    const user = getAuthUser(request);
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, subject, type, description, url, fileUrl, fileName, tags, isPublic } = body;

    // Validation
    if (!title || !subject || !type || !description) {
      return NextResponse.json(
        { error: 'Title, subject, type, and description are required' },
        { status: 400 }
      );
    }

    if (type === 'link' && !url) {
      return NextResponse.json(
        { error: 'URL is required for link type resources' },
        { status: 400 }
      );
    }

    if (type === 'file' && !fileUrl) {
      return NextResponse.json(
        { error: 'File URL is required for file type resources' },
        { status: 400 }
      );
    }

    await connectDB();

    const resource = await Resource.create({
      title,
      subject,
      type,
      description,
      url,
      fileUrl,
      fileName,
      tags: tags || [],
      isPublic: isPublic || false,
      userId: user.id,
    });

    return NextResponse.json(resource, { status: 201 });
  } catch (error) {
    console.error('Error creating resource:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
