import { NextRequest, NextResponse } from "next/server";

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    timestamp: string;
    path: string;
  };
}

export class ApiError extends Error {
  constructor(
    public code: string,
    public message: string,
    public statusCode: number = 400,
    public details?: any,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export function successResponse<T>(
  data: T,
  statusCode: number = 200,
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      meta: {
        timestamp: new Date().toISOString(),
        path: "",
      },
    },
    { status: statusCode },
  );
}

export function errorResponse(
  error: ApiError | Error,
  statusCode: number = 500,
): NextResponse<ApiResponse> {
  if (error instanceof ApiError) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: error.code,
          message: error.message,
          details: error.details,
        },
        meta: {
          timestamp: new Date().toISOString(),
          path: "",
        },
      },
      { status: error.statusCode },
    );
  }

  return NextResponse.json(
    {
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      meta: {
        timestamp: new Date().toISOString(),
        path: "",
      },
    },
    { status: statusCode },
  );
}

export async function handleApiRequest(
  handler: (req: NextRequest) => Promise<NextResponse<ApiResponse>>,
) {
  return handler;
}
