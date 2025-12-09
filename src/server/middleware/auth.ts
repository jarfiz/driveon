import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { ApiError } from "@/server/utils/response";

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export async function requireAuth(req: NextRequest) {
  const session = await auth();

  if (!session || !session.user) {
    throw new ApiError("UNAUTHORIZED", "Authentication required", 401);
  }

  return session.user;
}

export async function requireRole(req: NextRequest, allowedRoles: string[]) {
  const user = await requireAuth(req);

  if (!allowedRoles.includes(user.role)) {
    throw new ApiError("FORBIDDEN", "Insufficient permissions", 403);
  }

  return user;
}

export async function requireHost(req: NextRequest) {
  return requireRole(req, ["HOST", "ADMIN"]);
}

export async function requireAdmin(req: NextRequest) {
  return requireRole(req, ["ADMIN"]);
}
