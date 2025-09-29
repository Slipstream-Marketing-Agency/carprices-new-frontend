// components/ShozonAdsList.jsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/* ------------------------------ constants ------------------------------ */
const EMIRATES = [
  { code: 1, name: "Abu Dhabi" },
  { code: 2, name: "Ajman" },
  { code: 3, name: "Al Ain" },
  { code: 4, name: "Dubai" },
  { code: 5, name: "Fujairah" },
  { code: 6, name: "Ras al Khaimah" },
  { code: 7, name: "Sharjah" },
  { code: 8, name: "Umm al Quwain" },
  { code: 9, name: "All Cities (UAE)" },
];

const SORT_TYPES = [
  "Newest to Oldest",
  "Oldest to Newest",
  "Price Highest to Lowest",
  "Price Lowest to Highest",
  "Kilometers Highest to Lowest",
  "Kilometers Lowest to Highest",
  "Year Highest to Lowest",
  "Year Lowest to Highest",
];

// Affiliate id (from env, fallback to "stream")
const AFFILIATE_ID =
  (typeof process !== "undefined" &&
    process.env?.NEXT_PUBLIC_SHOZON_AFF?.trim()) ||
  "stream";

// Ad assets + link
const SHOZON_LINK = "https://shozon.com/en/uae/motors/used-cars";
const ADS = {
  SKY_160x600: "/assets/shozon/160-600-Car.jpg",
  RECT_300x250: "/assets/shozon/300-250.jpg",
  BANNER_468x60: "/assets/shozon/468-60-Car-1.jpg",
};

/* ---------------------------- affiliate utils --------------------------- */
/**
 * Append ?aff=<id> to a URL if it's not already present.
 * Safely preserves existing query params and hash.
 */
function appendAffiliateParam(url, affiliate = AFFILIATE_ID) {
  try {
    // Provide a base for relative URLs to avoid URL constructor errors
    const base =
      typeof window !== "undefined" ? window.location.origin : "https://shozon.com";
    const u = new URL(url, base);
    if (affiliate && !u.searchParams.has("aff")) {
      u.searchParams.set("aff", affiliate);
    }
    return u.toString();
  } catch {
    if (!affiliate) return url;
    const join = url.includes("?") ? "&" : "?";
    // Very last-resort fallback if URL parsing failed
    if (/\baff=/.test(url)) return url;
    return `${url}${join}aff=${encodeURIComponent(affiliate)}`;
  }
}

/* --------------------------------- icons -------------------------------- */
const IconFilter = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={props.className}>
    <path
      d="M3 5h18M6 12h12M10 19h4"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);
const IconSearch = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={props.className}>
    <path
      d="M21 21l-4.35-4.35M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);
const IconX = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={props.className}>
    <path
      d="M18 6L6 18M6 6l12 12"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);
const IconChevronDown = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={props.className}>
    <path
      d="M6 9l6 6 6-6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

/* --------------------------------- ui ---------------------------------- */
function Chip({ children, onRemove }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/60 px-3 py-1 text-xs shadow-sm backdrop-blur">
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="rounded-full p-0.5 hover:bg-gray-100"
          aria-label="Remove filter"
        >
          <IconX className="h-3.5 w-3.5" />
        </button>
      )}
    </span>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl border overflow-hidden shadow-sm animate-pulse bg-white">
      <div className="aspect-[16/10] bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-3.5 w-3/4 bg-gray-200 rounded" />
        <div className="h-3 w-1/3 bg-gray-200 rounded" />
        <div className="h-3 w-2/5 bg-gray-200 rounded" />
        <div className="flex gap-2 pt-1">
          <div className="h-6 w-20 bg-gray-200 rounded-full" />
          <div className="h-6 w-16 bg-gray-200 rounded-full" />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- component ------------------------------ */
export default function ShozonAdsList() {
  // form state
  const [keyword, setKeyword] = useState("");
  const [cityCode, setCityCode] = useState(""); // store numeric code; UI shows names only
  const [yearMin, setYearMin] = useState("");
  const [yearMax, setYearMax] = useState("");
  const [kmMin, setKmMin] = useState("");
  const [kmMax, setKmMax] = useState("");
  const [approxPrice, setApproxPrice] = useState("");
  const [sort, setSort] = useState("");

  // ux state
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [debouncedKeyword, setDebouncedKeyword] = useState(keyword);

  // data state (infinite)
  const [items, setItems] = useState([]); // accumulated ads
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const sentinelRef = useRef(null);
  const observerRef = useRef(null);

  // Compute affiliate-decorated banner link once
  const shozonBannerHref = useMemo(
    () => appendAffiliateParam(SHOZON_LINK),
    []
  );

  // Debounce keyword
  useEffect(() => {
    const t = setTimeout(() => setDebouncedKeyword(keyword), 300);
    return () => clearTimeout(t);
  }, [keyword]);

  // Build filters for API
  const filters = useMemo(() => {
    const f = [];
    if (debouncedKeyword?.trim())
      f.push({ title: "Keyword", value: debouncedKeyword.trim() });
    if (cityCode) f.push({ title: "City", value: Number(cityCode) });

    const yMinNum = Number(yearMin);
    const yMaxNum = Number(yearMax);
    if (
      !Number.isNaN(yMinNum) &&
      !Number.isNaN(yMaxNum) &&
      yearMin &&
      yearMax
    ) {
      f.push({ title: "Year", value: [yMinNum, yMaxNum] });
    }

    const kMinNum = Number(kmMin);
    const kMaxNum = Number(kmMax);
    if (!Number.isNaN(kMinNum) && !Number.isNaN(kMaxNum) && kmMin && kmMax) {
      f.push({ title: "Kilometers", value: [kMinNum, kMaxNum] });
    }

    if (approxPrice) {
      const p = Number(approxPrice);
      if (!Number.isNaN(p))
        f.push({ title: "Approximate Price", value: String(p) });
    }

    if (sort) f.push({ title: "Sort", value: sort });
    return f;
  }, [
    debouncedKeyword,
    cityCode,
    yearMin,
    yearMax,
    kmMin,
    kmMax,
    approxPrice,
    sort,
  ]);

  async function fetchAds(p = 1, append = false) {
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch("/api/shozon/ads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ filters, page: p }),
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.message || "Failed to fetch");
      const payload = json.data || {};
      const newData = payload.data || [];
      const newMeta = payload.meta || {};

      setMeta(newMeta);
      setHasMore(
        Number(newMeta?.current_page || 1) < Number(newMeta?.last_page || 1)
      );
      setItems((prev) => (append ? [...prev, ...newData] : newData));
    } catch (e) {
      setErr(e?.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  }

  // Submit (reset & load first page)
  function onSubmit(e) {
    e?.preventDefault?.();
    setPage(1);
    setItems([]);
    setHasMore(true);
    fetchAds(1, false);
    setMobileFiltersOpen(false);
  }

  function clearAll() {
    setKeyword("");
    setCityCode("");
    setYearMin("");
    setYearMax("");
    setKmMin("");
    setKmMax("");
    setApproxPrice("");
    setSort("");
    setPage(1);
    setItems([]);
    setHasMore(true);
    fetchAds(1, false);
  }

  // initial load
  useEffect(() => {
    fetchAds(1, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Infinite observer
  useEffect(() => {
    if (!sentinelRef.current) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasMore && !loading) {
          const next = (Number(meta?.current_page || page) || 1) + 1;
          setPage(next);
          fetchAds(next, true);
        }
      },
      { rootMargin: "600px 0px" }
    );

    observerRef.current.observe(sentinelRef.current);
    return () => observerRef.current?.disconnect();
  }, [hasMore, loading, page, meta, filters]);

  const hasActiveFilters = filters.length > 0;

  /* -------------------------------- render ------------------------------- */
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Find Your Perfect Used Car
        </h1>

        {/* Sticky mobile bar */}
        <div className="md:hidden sticky top-0 z-30 -mx-4 px-4 py-2 backdrop-blur bg-white/75 border-b">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm shadow-sm bg-white w-full justify-center"
            >
              <IconFilter className="h-4 w-4" />
              Filters
            </button>
            <button
              type="button"
              onClick={() => onSubmit()}
              className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm shadow-sm bg-white w-full justify-center"
            >
              <IconSearch className="h-4 w-4" />
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Mobile top 468x60 ad */}
      <div className="md:hidden mb-4 flex justify-center">
        <a
          href={shozonBannerHref}
          target="_blank"
          rel="noreferrer"
          className="block"
        >
          {/* keep max-width responsive on small devices */}
          <img
            src={ADS.BANNER_468x60}
            alt="ShOZON - Buy & Sell Cars (468x60)"
            className="h-auto w-[468px] max-w-full object-contain"
            width={468}
            height={60}
            loading="lazy"
          />
        </a>
      </div>

      {/* Desktop Filters */}
      <form
        onSubmit={onSubmit}
        className="hidden md:grid grid-cols-12 gap-3 mb-6 rounded-2xl border bg-white/70 backdrop-blur p-4 shadow-sm"
      >
        {/* Keyword */}
        <div className="col-span-4 relative">
          <label className="sr-only">Keyword</label>
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            <IconSearch className="h-4 w-4" />
          </span>
          <input
            type="text"
            placeholder="Search keyword (e.g., Toyota, Land Cruiser)…"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full rounded-xl border pl-9 pr-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-black/10"
          />
        </div>

        {/* Emirates (names only) */}
        <div className="col-span-3">
          <div className="relative">
            <select
              value={cityCode}
              onChange={(e) => setCityCode(e.target.value)}
              className="w-full appearance-none rounded-xl border px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-black/10"
            >
              <option value="">Select Emirates</option>
              {EMIRATES.map((e) => (
                <option key={e.code} value={e.code}>
                  {e.name}
                </option>
              ))}
            </select>
            <IconChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          </div>
        </div>

        {/* Year / KM / Price / Sort */}
        <div className="col-span-2">
          <label className="sr-only">Year min</label>
          <input
            type="number"
            placeholder="Year min"
            value={yearMin}
            onChange={(e) => setYearMin(e.target.value)}
            className="w-full rounded-xl border px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-black/10"
          />
        </div>
        <div className="col-span-2">
          <label className="sr-only">Year max</label>
          <input
            type="number"
            placeholder="Year max"
            value={yearMax}
            onChange={(e) => setYearMax(e.target.value)}
            className="w-full rounded-xl border px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-black/10"
          />
        </div>

        <div className="col-span-2">
          <label className="sr-only">KM min</label>
          <input
            type="number"
            placeholder="KM min"
            value={kmMin}
            onChange={(e) => setKmMin(e.target.value)}
            className="w-full rounded-xl border px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-black/10"
          />
        </div>
        <div className="col-span-2">
          <label className="sr-only">KM max</label>
          <input
            type="number"
            placeholder="KM max"
            value={kmMax}
            onChange={(e) => setKmMax(e.target.value)}
            className="w-full rounded-xl border px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-black/10"
          />
        </div>

        <div className="col-span-3">
          <label className="sr-only">Approx Price (AED)</label>
          <input
            type="number"
            placeholder="Approx Price (AED)"
            value={approxPrice}
            onChange={(e) => setApproxPrice(e.target.value)}
            className="w-full rounded-xl border px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-black/10"
          />
        </div>

        <div className="col-span-3">
          <label className="sr-only">Sort</label>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full appearance-none rounded-xl border px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-black/10"
            >
              <option value="">Sort</option>
              {SORT_TYPES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <IconChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          </div>
        </div>

        <div className="col-span-6 flex items-center gap-3">
          <button
            type="submit"
            className="rounded-xl bg-black text-white px-5 py-2.5 hover:opacity-90 shadow-sm"
          >
            Search
          </button>
          <button
            type="button"
            onClick={clearAll}
            className="rounded-xl border px-5 py-2.5 hover:bg-gray-50"
          >
            Clear all
          </button>
        </div>
      </form>

      {/* Active filter chips */}
      {hasActiveFilters && (
        <div className="mb-6 flex flex-wrap gap-2">
          {filters.map((f, i) => {
            const remove = () => {
              switch (f.title) {
                case "Keyword":
                  setKeyword("");
                  break;
                case "City":
                  setCityCode("");
                  break;
                case "Year":
                  setYearMin("");
                  setYearMax("");
                  break;
                case "Kilometers":
                  setKmMin("");
                  setKmMax("");
                  break;
                case "Approximate Price":
                  setApproxPrice("");
                  break;
                case "Sort":
                  setSort("");
                  break;
                default:
                  break;
              }
              onSubmit();
            };
            const val = Array.isArray(f.value)
              ? `${f.value[0]} – ${f.value[1]}`
              : String(f.value);
            const prettyVal =
              f.title === "City"
                ? EMIRATES.find((e) => e.code === Number(val))?.name || val
                : val;
            return (
              <Chip key={`${f.title}-${i}`} onRemove={remove}>
                <span className="font-medium">{f.title}:</span> {prettyVal}
              </Chip>
            );
          })}
        </div>
      )}

      {/* Error */}
      {err && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {err}
        </div>
      )}

      {/* Content + Desktop right ad column */}
      <div className="md:grid md:grid-cols-12 md:gap-6">
        {/* Left: list */}
        <div className="md:col-span-9">
          {/* Results */}
          {!items.length && loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : !items.length ? (
            <div className="rounded-2xl border bg-white px-6 py-12 text-center">
              <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                <IconSearch className="h-5 w-5 text-gray-500" />
              </div>
              <h3 className="text-lg font-semibold">No ads found</h3>
              <p className="mt-1 text-sm text-gray-600">
                Try adjusting filters or clearing them to broaden your search.
              </p>
              <button
                type="button"
                onClick={clearAll}
                className="mt-4 rounded-xl border px-4 py-2 text-sm hover:bg-gray-50"
              >
                Clear all
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {items.map((ad, idx) => {
                  const adHref = ad?.url ? appendAffiliateParam(ad.url) : null;

                  return (
                    <div key={ad.id} className="contents">
                      <article
                        className="group rounded-2xl border overflow-hidden shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 bg-white cursor-pointer"
                        role={adHref ? "link" : undefined}
                        tabIndex={adHref ? 0 : -1}
                        aria-label={ad?.title ? `Open ${ad.title}` : "Open ad"}
                        onClick={() => {
                          if (adHref)
                            window.open(
                              adHref,
                              "_blank",
                              "noopener,noreferrer"
                            );
                        }}
                        onKeyDown={(e) => {
                          if (!adHref) return;
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            window.open(
                              adHref,
                              "_blank",
                              "noopener,noreferrer"
                            );
                          }
                        }}
                      >
                        {ad.primary_image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            alt={ad.title || "Vehicle"}
                            src={ad.primary_image}
                            className="aspect-[16/10] w-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="aspect-[16/10] w-full bg-gray-100" />
                        )}
                        <div className="p-4 space-y-2">
                          <div className="flex items-start justify-between gap-3">
                            <h3 className="font-semibold leading-snug line-clamp-2">
                              {ad.title || "Untitled"}
                            </h3>
                            <span className="shrink-0 text-xs text-gray-500">
                              {ad.time}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-lg font-semibold">
                              {ad.price}
                            </div>
                            {ad.emirate && (
                              <span className="text-xs rounded-full border px-2 py-1 bg-white">
                                {ad.emirate}
                              </span>
                            )}
                          </div>
                          {Array.isArray(ad.features) &&
                            ad.features.length > 0 && (
                              <div className="flex flex-wrap gap-2 pt-2">
                                {ad.features.slice(0, 4).map((f, i2) => (
                                  <span
                                    key={i2}
                                    className="text-xs rounded-full border px-2 py-1 bg-white"
                                    title={`${f.title}: ${f.value}`}
                                  >
                                    {f.title}: {f.value}
                                  </span>
                                ))}
                              </div>
                            )}
                          {Array.isArray(ad.tree) && ad.tree.length > 0 && (
                            <div className="text-xs text-gray-500 pt-2">
                              {ad.tree.map((t) => t.title).join(" › ")}
                            </div>
                          )}
                          {adHref && (
                            <a
                              className="inline-flex items-center gap-1 mt-2 text-sm underline underline-offset-2 decoration-gray-400 hover:opacity-80"
                              href={adHref}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                            >
                              View on Shozon
                              <svg
                                viewBox="0 0 24 24"
                                className="h-3.5 w-3.5"
                                aria-hidden="true"
                              >
                                <path
                                  d="M7 17L17 7M9 7h8v8"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </a>
                          )}
                        </div>
                      </article>

                      {/* Mobile-only 300x250 ad after every 5 cars */}
                      {(idx + 1) % 5 === 0 && (
                        <div
                          key={`ad-300x250-${idx}`}
                          className="md:hidden col-span-1 flex justify-center"
                        >
                          <a
                            href={shozonBannerHref}
                            target="_blank"
                            rel="noreferrer"
                            className="block"
                          >
                            <img
                              src={ADS.RECT_300x250}
                              alt="ShOZON - Buy & Sell Cars (300x250)"
                              className="w-[300px] h-[250px] object-contain"
                              width={300}
                              height={250}
                              loading="lazy"
                            />
                          </a>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Infinite sentinel */}
              <div
                ref={sentinelRef}
                className="h-12 flex items-center justify-center mt-6"
              >
                {loading ? (
                  <div className="text-sm text-gray-600">Loading more…</div>
                ) : hasMore ? (
                  <button
                    onClick={() => {
                      const next =
                        (Number(meta?.current_page || page) || 1) + 1;
                      setPage(next);
                      fetchAds(next, true);
                    }}
                    className="rounded-xl border px-4 py-2 text-sm bg-white hover:bg-gray-50"
                  >
                    Load more
                  </button>
                ) : (
                  <div className="text-sm text-gray-500">
                    You’ve reached the end.
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Right: desktop skyscraper ad */}
        <aside className="hidden md:block md:col-span-3">
          <div className="sticky top-24">
            <a
              href={shozonBannerHref}
              target="_blank"
              rel="noreferrer"
              className="block"
            >
              <img
                src={ADS.SKY_160x600}
                alt="ShOZON - Buy & Sell Cars (160x600)"
                className="mx-auto w-[160px] h-[600px] object-contain"
                width={160}
                height={600}
                loading="lazy"
              />
            </a>
          </div>
        </aside>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-40">
          <button
            aria-label="Close filters"
            onClick={() => setMobileFiltersOpen(false)}
            className="absolute inset-0 bg-black/40"
          />
          <div className="absolute inset-x-0 bottom-0 rounded-t-2xl bg-white shadow-2xl p-4 max-h-[80vh] overflow-auto">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-base font-semibold">Filters</h2>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="rounded-full p-2 hover:bg-gray-100"
                aria-label="Close"
              >
                <IconX className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={onSubmit} className="space-y-3">
              <div className="relative">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Keyword
                </label>
                <span className="pointer-events-none absolute left-3 top-[38px] text-gray-500">
                  <IconSearch className="h-4 w-4" />
                </span>
                <input
                  type="text"
                  placeholder="Search keyword…"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full rounded-xl border pl-9 pr-3 py-2.5 bg-white"
                />
              </div>

              {/* Emirates (names only) */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Emirates
                </label>
                <div className="relative">
                  <select
                    value={cityCode}
                    onChange={(e) => setCityCode(e.target.value)}
                    className="w-full appearance-none rounded-xl border px-3 py-2.5 bg-white"
                  >
                    <option value="">Select Emirates</option>
                    {EMIRATES.map((e) => (
                      <option key={e.code} value={e.code}>
                        {e.name}
                      </option>
                    ))}
                  </select>
                  <IconChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Year min
                  </label>
                  <input
                    type="number"
                    value={yearMin}
                    onChange={(e) => setYearMin(e.target.value)}
                    className="w-full rounded-xl border px-3 py-2.5 bg-white"
                    placeholder="Min"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Year max
                  </label>
                  <input
                    type="number"
                    value={yearMax}
                    onChange={(e) => setYearMax(e.target.value)}
                    className="w-full rounded-xl border px-3 py-2.5 bg-white"
                    placeholder="Max"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    KM min
                  </label>
                  <input
                    type="number"
                    value={kmMin}
                    onChange={(e) => setKmMin(e.target.value)}
                    className="w-full rounded-xl border px-3 py-2.5 bg-white"
                    placeholder="Min"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    KM max
                  </label>
                  <input
                    type="number"
                    value={kmMax}
                    onChange={(e) => setKmMax(e.target.value)}
                    className="w-full rounded-xl border px-3 py-2.5 bg-white"
                    placeholder="Max"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Approx Price (AED)
                </label>
                <input
                  type="number"
                  value={approxPrice}
                  onChange={(e) => setApproxPrice(e.target.value)}
                  className="w-full rounded-xl border px-3 py-2.5 bg-white"
                  placeholder="e.g. 120000"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Sort
                </label>
                <div className="relative">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="w-full appearance-none rounded-xl border px-3 py-2.5 bg-white"
                  >
                    <option value="">Sort</option>
                    {SORT_TYPES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <IconChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-black text-white px-5 py-2.5 shadow-sm"
                >
                  Apply
                </button>
                <button
                  type="button"
                  onClick={clearAll}
                  className="flex-1 rounded-xl border px-5 py-2.5"
                >
                  Clear
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
