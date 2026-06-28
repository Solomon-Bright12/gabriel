import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// GET — fetch gallery from Cloudinary
export async function GET(req: NextRequest) {
  // Auth check
  const session = req.cookies.get('admin_session');
  if (session?.value !== 'authenticated') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const result = await cloudinary.search
      .expression('folder:gabriel-barclay')
      .sort_by('created_at', 'desc')
      .max_results(100)
      .execute();

    const images = result.resources.map((r: Record<string, unknown>) => ({
      public_id: r.public_id,
      secure_url: r.secure_url,
      width: r.width,
      height: r.height,
      created_at: r.created_at,
    }));

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Cloudinary gallery fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch gallery.' }, { status: 500 });
  }
}

// POST — upload a new image
export async function POST(req: NextRequest) {
  // Auth check
  const session = req.cookies.get('admin_session');
  if (session?.value !== 'authenticated') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const title = (formData.get('title') as string) || 'Untitled';

    if (!file) {
      return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise<Record<string, unknown>>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'gabriel-barclay',
          public_id: `art-${Date.now()}`,
          tags: ['portfolio', 'artwork'],
          context: `title=${title}`,
          quality: 'auto:best',
          fetch_format: 'auto',
        },
        (error, result) => {
          if (error || !result) reject(error ?? new Error('Upload failed'));
          else resolve(result as unknown as Record<string, unknown>);
        }
      );
      stream.end(buffer);
    });

    return NextResponse.json({
      success: true,
      image: {
        public_id: uploadResult.public_id,
        secure_url: uploadResult.secure_url,
        width: uploadResult.width,
        height: uploadResult.height,
      },
    });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return NextResponse.json({ error: 'Upload failed.' }, { status: 500 });
  }
}

// DELETE — remove an image
export async function DELETE(req: NextRequest) {
  // Auth check
  const session = req.cookies.get('admin_session');
  if (session?.value !== 'authenticated') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { public_id } = await req.json();
    if (!public_id) {
      return NextResponse.json({ error: 'Missing public_id.' }, { status: 400 });
    }

    await cloudinary.uploader.destroy(public_id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    return NextResponse.json({ error: 'Delete failed.' }, { status: 500 });
  }
}
