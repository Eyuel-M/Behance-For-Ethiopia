import Link from "next/link";
import Image from "next/image";
import type { Designer } from "@/lib/types";

// ─── Icons ────────────────────────────────────────────────────────────────────

function MapPinIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function CheckBadgeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" fill="currentColor" stroke="none" className="text-amber-500" />
      <polyline points="9 12 11 14 15 10" stroke="white" strokeWidth="2" fill="none" />
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function DesignerCard({ designer }: { designer: Designer }) {
  const {
    name,
    slug,
    category,
    skills,
    experience,
    location,
    rate,
    rating,
    reviewCount,
    available,
    photoUrl,
    avatarColor,
    avatarText,
  } = designer;

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Link
      href={`/designers/${slug}`}
      className="group flex flex-col rounded-2xl border border-stone-200 bg-white shadow-sm hover:shadow-md hover:border-stone-300 transition-all duration-200 cursor-pointer overflow-hidden"
      aria-label={`View ${name}'s profile`}
    >
      {/* Card header */}
      <div className="relative p-5 pb-4">
        {/* Availability indicator */}
        <div className="absolute top-4 right-4">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
              available
                ? "bg-emerald-50 text-emerald-700"
                : "bg-stone-100 text-stone-400"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                available ? "bg-emerald-500" : "bg-stone-400"
              }`}
            />
            {available ? "Available" : "Booked"}
          </span>
        </div>

        {/* Avatar */}
        <div className="flex items-start gap-4">
          <div className="shrink-0">
            {photoUrl ? (
              <Image
                src={photoUrl}
                alt={name}
                width={52}
                height={52}
                className="w-13 h-13 rounded-full object-cover"
              />
            ) : (
              <div
                className={`w-13 h-13 rounded-full flex items-center justify-center text-sm font-semibold ${avatarColor} ${avatarText}`}
                style={{ width: 52, height: 52 }}
              >
                {initials}
              </div>
            )}
          </div>

          {/* Name + meta */}
          <div className="min-w-0 flex-1 pr-16">
            <div className="flex items-center gap-1.5">
              <p className="font-semibold text-stone-900 text-sm truncate">
                {name}
              </p>
              {/* Vetted badge */}
              <span className="shrink-0 text-amber-500" title="Vetted designer">
                <CheckBadgeIcon />
              </span>
            </div>

            {/* Category */}
            <p className="text-xs text-stone-500 mt-0.5">{category}</p>

            {/* Location + experience */}
            <div className="flex items-center gap-3 mt-2 text-xs text-stone-400">
              <span className="flex items-center gap-1">
                <MapPinIcon />
                {location}
              </span>
              <span className="flex items-center gap-1">
                <BriefcaseIcon />
                {experience} yr{experience !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="px-5 pb-4 flex flex-wrap gap-1.5">
        {skills.slice(0, 3).map((skill) => (
          <span
            key={skill}
            className="px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600 text-xs font-medium"
          >
            {skill}
          </span>
        ))}
        {skills.length > 3 && (
          <span className="px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-400 text-xs">
            +{skills.length - 3}
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="mt-auto border-t border-stone-100 px-5 py-3.5 flex items-center justify-between">
        {/* Rating */}
        <div className="flex items-center gap-1.5 text-xs text-stone-500">
          <span className="text-amber-400">
            <StarIcon />
          </span>
          <span className="font-medium text-stone-900">{rating.toFixed(1)}</span>
          <span>({reviewCount})</span>
        </div>

        {/* Rate */}
        <div className="text-sm font-semibold text-stone-900">
          ${rate}
          <span className="text-xs font-normal text-stone-400"> / hr</span>
        </div>
      </div>
    </Link>
  );
}
