/**
 * Revalidate API
 * 用于 CMS 触发缓存刷新
 */

import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

// 从环境变量获取 secret
const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET || 'your-secret-key';

interface RevalidateBody {
  type: 'article' | 'category' | 'tag' | 'all';
  slug?: string;
}

export async function POST(request: NextRequest) {
  try {
    // 验证 secret
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token || token !== REVALIDATE_SECRET) {
      return NextResponse.json(
        { error: 'Invalid secret' },
        { status: 401 }
      );
    }

    // 解析请求体
    const body: RevalidateBody = await request.json();

    if (!body.type) {
      return NextResponse.json(
        { error: 'Missing type parameter' },
        { status: 400 }
      );
    }

    // 根据类型刷新缓存
    switch (body.type) {
      case 'article':
        if (body.slug) {
          revalidatePath(`/articles/${body.slug}`);
        }
        revalidatePath('/articles');
        revalidatePath('/');
        break;

      case 'category':
        if (body.slug) {
          revalidatePath(`/categories/${body.slug}`);
        }
        revalidatePath('/categories');
        revalidatePath('/articles');
        break;

      case 'tag':
        if (body.slug) {
          revalidatePath(`/tags/${body.slug}`);
        }
        revalidatePath('/tags');
        revalidatePath('/articles');
        break;

      case 'all':
        revalidatePath('/', 'layout');
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid type parameter' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      revalidated: true,
      type: body.type,
      slug: body.slug,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
