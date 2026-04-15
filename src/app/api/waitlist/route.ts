import { NextRequest, NextResponse } from "next/server";

// Supports multiple backends:
// 1. WAITLIST_WEBHOOK_URL - any webhook (Zapier, Make, Google Apps Script, etc.)
// 2. Falls back to in-memory storage (resets on cold start, but fine for MVP validation)

const inMemoryWaitlist: Array<{
  email: string;
  businessName: string;
  location: string;
  timestamp: string;
}> = [];

export async function POST(req: NextRequest) {
  try {
    const { email, businessName, location } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email required" },
        { status: 400 }
      );
    }

    const entry = {
      email,
      businessName: businessName || "",
      location: location || "unknown",
      timestamp: new Date().toISOString(),
    };

    // Try webhook first
    const webhookUrl = process.env.WAITLIST_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(entry),
        });
      } catch (e) {
        console.error("Webhook failed, using fallback:", e);
      }
    }

    // Always store in memory as fallback
    if (!inMemoryWaitlist.some((e) => e.email === email)) {
      inMemoryWaitlist.push(entry);
    }

    // Also log to console so we can see signups in Vercel logs
    console.log("NEW WAITLIST SIGNUP:", JSON.stringify(entry));

    return NextResponse.json({
      message: "Added to waitlist",
      count: inMemoryWaitlist.length,
    });
  } catch (error) {
    console.error("Waitlist error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ count: inMemoryWaitlist.length });
}
