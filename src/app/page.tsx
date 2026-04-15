"use client";

import { useState } from "react";
import {
  Star,
  Zap,
  Clock,
  TrendingUp,
  Shield,
  MessageSquare,
  CheckCircle,
  ArrowRight,
  BarChart3,
  Send,
  ChevronDown,
} from "lucide-react";
import toast from "react-hot-toast";

function WaitlistForm({ location }: { location: string }) {
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, businessName, location }),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
      toast.success("You're on the list! We'll email you soon.");
    } catch {
      toast.error("Something went wrong. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-brand-50 border border-brand-200 rounded-2xl p-6 text-center">
        <CheckCircle className="w-10 h-10 text-brand-600 mx-auto mb-3" />
        <p className="text-lg font-semibold text-brand-800">
          You&apos;re on the list!
        </p>
        <p className="text-brand-700 text-sm mt-1">
          We&apos;ll email you when we launch. You&apos;ll get early access +
          50% off for life.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="text"
        value={businessName}
        onChange={(e) => setBusinessName(e.target.value)}
        placeholder="Business name (optional)"
        className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email *"
        required
        className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
      />
      <button
        type="submit"
        disabled={submitting}
        className="bg-brand-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-brand-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 whitespace-nowrap"
      >
        {submitting ? "Joining..." : "Join Waitlist"}
        {!submitting && <ArrowRight className="w-4 h-4" />}
      </button>
    </form>
  );
}

function FakeReviewDemo() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 max-w-lg mx-auto">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-sm">
          JM
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm">Jessica M.</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
          </div>
          <p className="text-gray-600 text-sm mt-1">
            Amazing service! The team was professional and finished ahead of
            schedule. Highly recommend to anyone looking for quality work.
          </p>
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 bg-brand-100 rounded-full flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-brand-600" />
          </div>
          <span className="text-xs font-medium text-brand-700">
            AI reply generated in 3 seconds
          </span>
        </div>
        <div className="bg-brand-50 rounded-xl p-4 border border-brand-100">
          <p className="text-sm text-gray-700">
            Thank you so much, Jessica! We&apos;re thrilled to hear the team
            exceeded your expectations and delivered ahead of schedule. Quality
            and professionalism are at the heart of everything we do. We truly
            appreciate you taking the time to share your experience — it means
            the world to our team. Looking forward to working with you again!
          </p>
        </div>
      </div>
    </div>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const items = [
    {
      q: "How does it connect to my Google reviews?",
      a: "One-click Google OAuth. No passwords, no extensions, no apps to install. Takes 60 seconds. We use the official Google Business Profile API — fully compliant with Google's terms.",
    },
    {
      q: "Will it say something embarrassing?",
      a: "5-star reviews auto-post (low risk — it's just a thank you). Anything 4 stars or below gets drafted and sent to you for approval first. You can edit, approve, or skip. Every reply has an undo link.",
    },
    {
      q: "What about negative reviews?",
      a: "Negative reviews are NEVER auto-posted. You get an email with a suggested reply. You approve, edit, or write your own. The AI never admits fault, offers refunds, or makes promises on your behalf.",
    },
    {
      q: "How much does it cost?",
      a: "Starting at $29/month for one location with unlimited replies. No per-review charges, no credits, no surprises. Early waitlist members get 50% off for life.",
    },
    {
      q: "Can I cancel anytime?",
      a: "Yes. No contracts, no cancellation fees. Cancel from your dashboard or just email us. Your existing replies stay posted.",
    },
  ];

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="border border-gray-200 rounded-xl">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between p-4 text-left"
          >
            <span className="font-medium text-gray-900">{item.q}</span>
            <ChevronDown
              className={`w-5 h-5 text-gray-400 transition-transform ${
                open === i ? "rotate-180" : ""
              }`}
            />
          </button>
          {open === i && (
            <div className="px-4 pb-4 text-gray-600 text-sm">{item.a}</div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="border-b bg-white/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-7 h-7 text-brand-600" />
            <span className="text-xl font-bold">ReplyQuick</span>
          </div>
          <a
            href="#waitlist"
            className="bg-brand-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-brand-700 transition-colors"
          >
            Join Waitlist
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 pt-16 pb-12">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            AI-powered review replies
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
            Your Google reviews.
            <br />
            <span className="text-brand-600">Replied to automatically.</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            88% of customers choose businesses that reply to reviews. But who
            has time for that? ReplyQuick writes personalized replies and posts
            them for you. Set up in 60 seconds.
          </p>
        </div>

        <div id="waitlist" className="max-w-2xl mx-auto mb-12">
          <WaitlistForm location="hero" />
          <p className="text-center text-xs text-gray-500 mt-3">
            Join 0 businesses on the waitlist. Early members get 50% off for
            life.
          </p>
        </div>

        <FakeReviewDemo />
      </section>

      {/* Stats bar */}
      <section className="bg-gray-50 border-y py-8">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-3 gap-8 text-center">
          {[
            { stat: "88%", label: "of customers prefer businesses that reply to all reviews" },
            { stat: "49%", label: "more revenue for businesses that respond to reviews" },
            { stat: "3 sec", label: "average time for AI to craft a personalized reply" },
          ].map((item) => (
            <div key={item.stat}>
              <div className="text-2xl sm:text-3xl font-bold text-brand-700">
                {item.stat}
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          How it works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Shield,
              step: "1",
              title: "Connect Google",
              desc: "One-click OAuth. No passwords, no extensions. 60 seconds. Uses the official Google Business Profile API.",
            },
            {
              icon: Zap,
              step: "2",
              title: "AI replies instantly",
              desc: "New review comes in → AI writes a personalized reply matching your tone. 5-star reviews auto-post. Lower ratings need your approval.",
            },
            {
              icon: TrendingUp,
              step: "3",
              title: "Watch your rating climb",
              desc: "Customers see you care. Your response rate hits 100%. Google rewards active businesses with better local rankings.",
            },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-7 h-7 text-brand-600" />
              </div>
              <div className="text-xs font-bold text-brand-600 mb-1">
                STEP {item.step}
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 border-y py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Everything you need. Nothing you don&apos;t.
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-xl mx-auto">
            We&apos;re not a bloated reputation management platform. We do one
            thing and we do it really well.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: MessageSquare,
                title: "Unlimited AI replies",
                desc: "Every review gets a personalized, on-brand response. No credits, no limits.",
              },
              {
                icon: Shield,
                title: "Safe by default",
                desc: "5-star auto-posts. Negative reviews need your approval. Undo link on everything.",
              },
              {
                icon: BarChart3,
                title: "Sentiment dashboard",
                desc: "See rating trends, common themes, and what customers love (or hate) at a glance.",
              },
              {
                icon: Send,
                title: "Review request tool",
                desc: "Send SMS/email to happy customers asking for a review. More reviews = more trust.",
              },
              {
                icon: Clock,
                title: "Instant notifications",
                desc: "Get emailed the moment a new review drops. Never miss a negative review again.",
              },
              {
                icon: Star,
                title: "Multi-location",
                desc: "Manage all your locations from one dashboard. Perfect for franchises and agencies.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-xl p-6 border border-gray-100"
              >
                <item.icon className="w-8 h-8 text-brand-600 mb-3" />
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Built for local businesses
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            "Restaurants & Cafes",
            "Dentists & Doctors",
            "Plumbers & HVAC",
            "Auto Repair Shops",
            "Salons & Spas",
            "Law Firms",
            "Real Estate Agents",
            "Hotels & Airbnbs",
          ].map((biz) => (
            <div
              key={biz}
              className="flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-3"
            >
              <CheckCircle className="w-4 h-4 text-brand-500 shrink-0" />
              <span className="text-sm font-medium">{biz}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing preview */}
      <section className="bg-gray-50 border-y py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Simple pricing
          </h2>
          <p className="text-gray-600 text-center mb-12">
            No per-review charges. No credits. No surprises.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                name: "Solo",
                price: "$29",
                desc: "For single-location businesses",
                features: [
                  "1 location",
                  "Unlimited AI replies",
                  "Tone customization",
                  "Email notifications",
                  "Undo on every reply",
                ],
                highlight: false,
              },
              {
                name: "Growth",
                price: "$79",
                desc: "For growing businesses",
                features: [
                  "Up to 5 locations",
                  "Everything in Solo",
                  "Review request tool (SMS + email)",
                  "Sentiment analytics dashboard",
                  "Priority support",
                ],
                highlight: true,
              },
              {
                name: "Agency",
                price: "$199",
                desc: "For agencies & franchises",
                features: [
                  "Up to 25 locations",
                  "Everything in Growth",
                  "White-label reports",
                  "API access",
                  "Dedicated account manager",
                ],
                highlight: false,
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-6 border ${
                  plan.highlight
                    ? "border-brand-500 bg-white shadow-lg ring-2 ring-brand-100"
                    : "border-gray-200 bg-white"
                }`}
              >
                {plan.highlight && (
                  <div className="text-xs font-bold text-brand-600 mb-2">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-lg font-bold">{plan.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{plan.desc}</p>
                <div className="text-3xl font-bold mb-1">
                  {plan.price}
                  <span className="text-sm font-normal text-gray-500">
                    /mo
                  </span>
                </div>
                <ul className="mt-4 space-y-2 mb-6">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <CheckCircle className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#waitlist"
                  className={`block text-center py-2.5 rounded-lg font-medium text-sm transition-colors ${
                    plan.highlight
                      ? "bg-brand-600 text-white hover:bg-brand-700"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  Join Waitlist
                </a>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 mt-6">
            Early waitlist members get 50% off for life. Prices shown are
            launch pricing.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-2xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">
          Questions & answers
        </h2>
        <FAQ />
      </section>

      {/* Final CTA */}
      <section className="bg-brand-600 py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stop ignoring your reviews.
          </h2>
          <p className="text-brand-100 mb-8">
            Every unanswered review is a customer you might lose. Let AI handle
            it while you run your business.
          </p>
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
            <WaitlistForm location="footer" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="max-w-5xl mx-auto px-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} ReplyQuick. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
